from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, Float, ForeignKey

Base = declarative_base()

class Well(Base):
    __tablename__ = "wells"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    # TODO: Add PostGIS geometry column for location

class WellLog(Base):
    __tablename__ = "well_logs"
    id = Column(Integer, primary_key=True)
    well_id = Column(Integer, ForeignKey("wells.id"))

class DrillingEvent(Base):
    __tablename__ = "drilling_events"
    id = Column(Integer, primary_key=True)

class HazardRecord(Base):
    __tablename__ = "hazard_records"
    id = Column(Integer, primary_key=True)

class FormationTop(Base):
    __tablename__ = "formation_tops"
    id = Column(Integer, primary_key=True)
