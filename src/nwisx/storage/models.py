from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, DateTime, Boolean, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from src.nwisx.storage.database import Base

class Well(Base):
    __tablename__ = "wells"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    field_name = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    spud_date = Column(Date)
    total_depth = Column(Float)
    status = Column(String)
    well_type = Column(String)
    mud_system = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    formations = relationship("FormationTop", back_populates="well", cascade="all, delete-orphan")
    events = relationship("DrillingEvent", back_populates="well", cascade="all, delete-orphan")
    alerts = relationship("HazardAlert", back_populates="well", cascade="all, delete-orphan")

class FormationTop(Base):
    __tablename__ = "formation_tops"
    
    id = Column(Integer, primary_key=True, index=True)
    well_id = Column(String, ForeignKey("wells.id"))
    formation_name = Column(String)
    top_depth = Column(Float)
    base_depth = Column(Float)
    lithology = Column(String)
    
    well = relationship("Well", back_populates="formations")

class DrillingEvent(Base):
    __tablename__ = "drilling_events"
    
    id = Column(Integer, primary_key=True, index=True)
    well_id = Column(String, ForeignKey("wells.id"))
    event_type = Column(String)
    depth = Column(Float)
    duration_hours = Column(Float)
    severity = Column(String)
    description = Column(Text)
    date_occurred = Column(Date)
    mitigation_applied = Column(Text)
    
    well = relationship("Well", back_populates="events")

class HazardAlert(Base):
    __tablename__ = "hazard_alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    well_id = Column(String, ForeignKey("wells.id"))
    hazard_type = Column(String)
    probability = Column(Float)
    depth_ahead_m = Column(Float)
    time_ahead_hrs = Column(Float)
    status = Column(String)
    evidence_summary = Column(Text)
    counter_evidence = Column(Text)
    recommended_mitigation = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    well = relationship("Well", back_populates="alerts")

class OffsetTwin(Base):
    __tablename__ = "offset_twins"
    
    id = Column(Integer, primary_key=True, index=True)
    target_well_id = Column(String, ForeignKey("wells.id"))
    offset_well_id = Column(String, ForeignKey("wells.id"))
    similarity_score = Column(Float)
    formation_match = Column(Float)
    structural_match = Column(Float)
    mud_match = Column(Float)
    era_match = Column(Float)
    explanation = Column(Text)
    
    target_well = relationship("Well", foreign_keys=[target_well_id])
    offset_well = relationship("Well", foreign_keys=[offset_well_id])
