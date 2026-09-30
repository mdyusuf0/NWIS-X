from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import date, datetime

class WellCreate(BaseModel):
    id: str
    name: str
    field_name: str
    latitude: float
    longitude: float
    spud_date: date
    total_depth: float
    status: str
    well_type: str
    mud_system: str

class WellResponse(WellCreate):
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class WellListResponse(BaseModel):
    items: List[WellResponse]
    total: int

class DrillingEventCreate(BaseModel):
    event_type: str
    depth: float
    duration_hours: float
    severity: str
    description: str
    date_occurred: date
    mitigation_applied: str

class DrillingEventResponse(DrillingEventCreate):
    id: int
    well_id: str
    model_config = ConfigDict(from_attributes=True)

class AlertResponse(BaseModel):
    id: int
    well_id: str
    hazard_type: str
    probability: float
    depth_ahead_m: float
    time_ahead_hrs: float
    status: str
    model_config = ConfigDict(from_attributes=True)

class AlertListResponse(BaseModel):
    items: List[AlertResponse]
    total: int

class TwinResponse(BaseModel):
    offset_well: WellResponse
    similarity_score: float
    explanation: str

class TwinListResponse(BaseModel):
    items: List[TwinResponse]

class HazardCorridorResponse(BaseModel):
    well_id: str
    start_depth: float
    end_depth: float
    hazards: dict

class RiskAssessmentRequest(BaseModel):
    depth: float
    lookahead_m: float

class RiskAssessmentResponse(BaseModel):
    risk_summary: dict
    dossier: dict
