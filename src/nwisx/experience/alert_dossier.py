from pydantic import BaseModel
from typing import List, Dict, Any, Tuple

class EvidenceItem(BaseModel):
    source_well: str
    depth: float
    event_description: str
    date: str

class CounterEvidenceItem(BaseModel):
    source_well: str
    depth: float
    note: str

class AlertDossier(BaseModel):
    alert_id: str
    well_id: str
    hazard_type: str
    probability: float
    confidence_interval: Tuple[float, float]
    depth_ahead_m: float
    time_ahead_hrs: float
    evidence: List[EvidenceItem]
    counter_evidence: List[CounterEvidenceItem]
    recommended_mitigations: List[str]
    reasoning_trail: Dict[str, Any]
    status: str
    created_at: str
