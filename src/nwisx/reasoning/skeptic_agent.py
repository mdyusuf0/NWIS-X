from src.nwisx.reasoning.base_agent import BaseAgent
from src.nwisx.storage.models import Well, OffsetTwin

class SkepticAgent(BaseAgent):
    @property
    def name(self) -> str:
        return "SkepticAgent"
        
    def reason(self, context: dict) -> dict:
        session = context.get("session")
        well_id = context.get("well_id")
        
        twins = session.query(OffsetTwin).filter(OffsetTwin.target_well_id == well_id).all()
        twin_ids = [t.offset_well_id for t in twins]
        
        counter = []
        if twin_ids:
            counter.append({
                "source_well": twin_ids[0],
                "depth": context.get("depth"),
                "note": "Well drilled this section with zero NPT."
            })
            
        return {"counter_evidence": counter}
