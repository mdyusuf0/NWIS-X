class ExposureNormalisedHazardPrior:
    def __init__(self):
        pass
        
    def compute_rate(self, events_count, metres_drilled):
        return (events_count + 1) / (metres_drilled + 1000)
        
    def get_corridor_risk(self, well_id, current_depth, lookahead_m, session):
        from src.nwisx.storage.models import DrillingEvent, OffsetTwin
        
        twins = session.query(OffsetTwin).filter(OffsetTwin.target_well_id == well_id).all()
        twin_ids = [t.offset_well_id for t in twins]
        
        events = session.query(DrillingEvent).filter(
            DrillingEvent.well_id.in_(twin_ids),
            DrillingEvent.depth >= current_depth,
            DrillingEvent.depth <= current_depth + lookahead_m
        ).all()
        
        hazard_counts = {}
        for e in events:
            hazard_counts[e.event_type] = hazard_counts.get(e.event_type, 0) + 1
            
        metres_drilled = lookahead_m * max(1, len(twin_ids))
        
        hazard_probs = {}
        for h_type in ["stuck_pipe", "lost_circulation", "gas_kick", "tight_hole", "washout"]:
            count = hazard_counts.get(h_type, 0)
            rate = self.compute_rate(count, metres_drilled)
            prob = 1 - (2.718 ** (-rate * lookahead_m))
            hazard_probs[h_type] = min(0.99, max(0.01, prob))
            
        return hazard_probs
        
    def estimate_time_to_hazard(self, depth_ahead, rop_m_hr):
        return depth_ahead / rop_m_hr if rop_m_hr > 0 else 999.0
