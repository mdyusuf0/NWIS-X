from fastapi import APIRouter

router = APIRouter()

@router.get("/wells")
def list_wells():
    """List all active and offset wells."""
    return []

@router.get("/alerts")
def get_alerts():
    """Retrieve active hazard alerts."""
    return []

@router.get("/dossier/{id}")
def get_dossier(id: str):
    """Retrieve detailed alert dossier for a specific case."""
    return {}

@router.get("/twins/{well_id}")
def get_twins(well_id: str):
    """Retrieve offset twins for a specific well."""
    return []

@router.get("/hazard-corridor")
def hazard_corridor():
    """Get risk assessment for depth corridor."""
    return {}

@router.post("/backtest")
def run_backtest():
    """Trigger leave-one-well-out backtesting."""
    return {"status": "started"}
