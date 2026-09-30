from datetime import date
from src.nwisx.storage.models import Well, FormationTop, DrillingEvent, OffsetTwin

def seed_sample_data(session):
    wells_data = [
        {"id": "NH-12", "name": "Naharkatiya-12", "field_name": "Naharkatiya", "latitude": 27.28, "longitude": 95.33, "spud_date": date(2020, 1, 15), "total_depth": 3500, "status": "completed", "well_type": "development", "mud_system": "WBM"},
        {"id": "DBR-05", "name": "Digboi-05", "field_name": "Digboi", "latitude": 27.38, "longitude": 95.63, "spud_date": date(2019, 5, 20), "total_depth": 2800, "status": "completed", "well_type": "exploration", "mud_system": "WBM"},
        {"id": "MKS-22", "name": "Makum-22", "field_name": "Makum", "latitude": 27.25, "longitude": 95.55, "spud_date": date(2021, 3, 10), "total_depth": 4000, "status": "active", "well_type": "development", "mud_system": "OBM"},
        {"id": "BGL-01", "name": "Baghjan-01", "field_name": "Baghjan", "latitude": 27.58, "longitude": 95.38, "spud_date": date(2018, 11, 5), "total_depth": 3800, "status": "completed", "well_type": "exploration", "mud_system": "WBM"},
        {"id": "KTL-14", "name": "Kathaloni-14", "field_name": "Kathaloni", "latitude": 27.30, "longitude": 95.40, "spud_date": date(2022, 2, 18), "total_depth": 3200, "status": "completed", "well_type": "development", "mud_system": "SBM"},
        {"id": "TNG-08", "name": "Tingkhong-08", "field_name": "Tingkhong", "latitude": 27.20, "longitude": 95.25, "spud_date": date(2021, 9, 30), "total_depth": 3400, "status": "completed", "well_type": "development", "mud_system": "WBM"},
        {"id": "RJ-01", "name": "Rajasthan-01", "field_name": "Barmer", "latitude": 25.75, "longitude": 71.40, "spud_date": date(2017, 4, 12), "total_depth": 2500, "status": "completed", "well_type": "exploration", "mud_system": "OBM"},
        {"id": "RJ-02", "name": "Rajasthan-02", "field_name": "Barmer", "latitude": 25.78, "longitude": 71.42, "spud_date": date(2019, 8, 25), "total_depth": 2600, "status": "completed", "well_type": "development", "mud_system": "OBM"},
    ]
    
    for wd in wells_data:
        w = Well(**wd)
        session.add(w)
    session.commit()
    
    formations = [
        {"well_id": "NH-12", "formation_name": "Tipam Sandstone", "top_depth": 1000, "base_depth": 1500, "lithology": "Sandstone"},
        {"well_id": "NH-12", "formation_name": "Barail", "top_depth": 1500, "base_depth": 2200, "lithology": "Shale"},
        {"well_id": "DBR-05", "formation_name": "Girujan Clay", "top_depth": 500, "base_depth": 1200, "lithology": "Clay"},
        {"well_id": "DBR-05", "formation_name": "Tipam Sandstone", "top_depth": 1200, "base_depth": 1800, "lithology": "Sandstone"},
        {"well_id": "MKS-22", "formation_name": "Barail", "top_depth": 2000, "base_depth": 2800, "lithology": "Shale"},
        {"well_id": "MKS-22", "formation_name": "Sylhet Limestone", "top_depth": 2800, "base_depth": 3500, "lithology": "Limestone"},
        {"well_id": "RJ-01", "formation_name": "Fatehgarh", "top_depth": 800, "base_depth": 1400, "lithology": "Sandstone"},
    ]
    for fd in formations:
        f = FormationTop(**fd)
        session.add(f)
    
    events = [
        {"well_id": "NH-12", "event_type": "stuck_pipe", "depth": 1600, "duration_hours": 12.5, "severity": "high", "description": "Differential sticking in Barail", "date_occurred": date(2020, 2, 10), "mitigation_applied": "Spotted acid"},
        {"well_id": "DBR-05", "event_type": "lost_circulation", "depth": 1300, "duration_hours": 8.0, "severity": "medium", "description": "Partial losses in Tipam", "date_occurred": date(2019, 6, 15), "mitigation_applied": "LCM pills"},
        {"well_id": "MKS-22", "event_type": "gas_kick", "depth": 2900, "duration_hours": 24.0, "severity": "critical", "description": "High pressure kick in Sylhet", "date_occurred": date(2021, 5, 5), "mitigation_applied": "Circulated out with heavy mud"},
        {"well_id": "RJ-01", "event_type": "tight_hole", "depth": 1200, "duration_hours": 4.0, "severity": "low", "description": "Overpull observed", "date_occurred": date(2017, 4, 25), "mitigation_applied": "Reamed section"},
    ]
    for ed in events:
        e = DrillingEvent(**ed)
        session.add(e)
        
    twins = [
        {"target_well_id": "NH-12", "offset_well_id": "DBR-05", "similarity_score": 0.85, "formation_match": 0.9, "structural_match": 0.8, "mud_match": 1.0, "era_match": 0.9, "explanation": "High match in Tipam formation"},
        {"target_well_id": "RJ-02", "offset_well_id": "RJ-01", "similarity_score": 0.95, "formation_match": 1.0, "structural_match": 0.95, "mud_match": 1.0, "era_match": 0.9, "explanation": "Same field, close proximity"}
    ]
    for td in twins:
        t = OffsetTwin(**td)
        session.add(t)
        
    session.commit()
