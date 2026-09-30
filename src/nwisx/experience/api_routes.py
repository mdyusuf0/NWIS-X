from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from src.nwisx.storage.database import get_db
from src.nwisx.storage.models import Well, DrillingEvent, HazardAlert, OffsetTwin
from src.nwisx.experience.schemas import (WellCreate, WellResponse, WellListResponse,
                                          DrillingEventCreate, DrillingEventResponse,
                                          AlertResponse, AlertListResponse,
                                          TwinListResponse, TwinResponse, HazardCorridorResponse,
                                          RiskAssessmentRequest, RiskAssessmentResponse)
from src.nwisx.intelligence.twin_selector import GeologyAwareTwinSelector
from src.nwisx.intelligence.risk_fusion import BayesianRiskFusion
from src.nwisx.reasoning.council import ReasoningCouncil
import json

router = APIRouter()

@router.get("/api/wells", response_model=WellListResponse)
def list_wells(db: Session = Depends(get_db)):
    wells = db.query(Well).all()
    return {"items": wells, "total": len(wells)}

@router.get("/api/wells/{well_id}", response_model=WellResponse)
def get_well(well_id: str, db: Session = Depends(get_db)):
    well = db.query(Well).filter(Well.id == well_id).first()
    if not well:
        raise HTTPException(404, "Well not found")
    return well

@router.post("/api/wells", response_model=WellResponse)
def create_well(well_in: WellCreate, db: Session = Depends(get_db)):
    well = Well(**well_in.model_dump())
    db.add(well)
    db.commit()
    db.refresh(well)
    return well

@router.get("/api/wells/{well_id}/events", response_model=List[DrillingEventResponse])
def get_well_events(well_id: str, db: Session = Depends(get_db)):
    return db.query(DrillingEvent).filter(DrillingEvent.well_id == well_id).all()

@router.post("/api/wells/{well_id}/events", response_model=DrillingEventResponse)
def add_event(well_id: str, event_in: DrillingEventCreate, db: Session = Depends(get_db)):
    event = DrillingEvent(well_id=well_id, **event_in.model_dump())
    db.add(event)
    db.commit()
    db.refresh(event)
    return event

@router.get("/api/wells/{well_id}/twins", response_model=TwinListResponse)
def get_twins(well_id: str, db: Session = Depends(get_db)):
    selector = GeologyAwareTwinSelector()
    results = selector.select_twins(well_id, db)
    items = []
    for score, w, bdown, expl in results:
        items.append({"offset_well": w, "similarity_score": score, "explanation": expl})
    return {"items": items}

@router.post("/api/wells/{well_id}/assess-risk", response_model=RiskAssessmentResponse)
def assess_risk(well_id: str, req: RiskAssessmentRequest, db: Session = Depends(get_db)):
    fusion = BayesianRiskFusion()
    summary = fusion.generate_risk_summary(well_id, req.depth, db)
    
    council = ReasoningCouncil()
    ctx = council._build_context(well_id, req.depth, db)
    ctx["hazard_type"] = "stuck_pipe"
    ctx["probability"] = summary.get("stuck_pipe", {}).get("probability", 0.0)
    ctx["lookahead"] = req.lookahead_m
    
    dossier = council.deliberate(ctx)
    return {"risk_summary": summary, "dossier": dossier.model_dump()}

@router.get("/api/alerts", response_model=AlertListResponse)
def list_alerts(db: Session = Depends(get_db)):
    alerts = db.query(HazardAlert).all()
    return {"items": alerts, "total": len(alerts)}

@router.get("/api/alerts/{alert_id}/dossier")
def get_dossier(alert_id: int, db: Session = Depends(get_db)):
    alert = db.query(HazardAlert).filter(HazardAlert.id == alert_id).first()
    if not alert:
        raise HTTPException(404)
    return {"evidence": alert.evidence_summary, "counter_evidence": alert.counter_evidence}

@router.patch("/api/alerts/{alert_id}")
def update_alert(alert_id: int, status: str, db: Session = Depends(get_db)):
    alert = db.query(HazardAlert).filter(HazardAlert.id == alert_id).first()
    if alert:
        alert.status = status
        db.commit()
    return {"status": "success"}

@router.get("/api/hazard-corridor/{well_id}", response_model=HazardCorridorResponse)
def get_corridor(well_id: str, db: Session = Depends(get_db)):
    return {
        "well_id": well_id,
        "start_depth": 1000,
        "end_depth": 1500,
        "hazards": {"stuck_pipe": 0.45, "gas_kick": 0.12}
    }

@router.get("/api/stats/dashboard")
def get_stats(db: Session = Depends(get_db)):
    wells = db.query(Well).count()
    alerts = db.query(HazardAlert).filter(HazardAlert.status == "active").count()
    events = db.query(DrillingEvent).count()
    return {
        "total_wells": wells,
        "active_alerts": alerts,
        "avg_risk": 0.45,
        "recent_events": events
    }
