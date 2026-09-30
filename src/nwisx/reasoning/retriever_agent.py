from src.nwisx.reasoning.base_agent import BaseAgent
from src.nwisx.storage.models import DrillingEvent, OffsetTwin

class RetrieverAgent(BaseAgent):
    @property
    def name(self) -> str:
        return "RetrieverAgent"
        
    def reason(self, context: dict) -> dict:
        session = context.get("session")
        well_id = context.get("well_id")
        depth = context.get("depth")
        
        twins = session.query(OffsetTwin).filter(OffsetTwin.target_well_id == well_id).all()
        twin_ids = [t.offset_well_id for t in twins]
        
        events = session.query(DrillingEvent).filter(
            DrillingEvent.well_id.in_(twin_ids),
            DrillingEvent.depth >= depth - 100,
            DrillingEvent.depth <= depth + 100
        ).all()
        
        evidence = []
        for e in events:
            evidence.append({
                "source_well": e.well_id,
                "depth": e.depth,
                "event_description": f"{e.event_type} - {e.description}",
                "date": str(e.date_occurred)
            })
            
        return {"retrieved_evidence": evidence}
