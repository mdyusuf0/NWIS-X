from src.nwisx.reasoning.base_agent import BaseAgent
from src.nwisx.storage.models import FormationTop

class GeologistAgent(BaseAgent):
    @property
    def name(self) -> str:
        return "GeologistAgent"
        
    def reason(self, context: dict) -> dict:
        session = context.get("session")
        well_id = context.get("well_id")
        depth = context.get("depth")
        
        formations = session.query(FormationTop).filter(
            FormationTop.well_id == well_id,
            FormationTop.top_depth <= depth,
            FormationTop.base_depth >= depth
        ).all()
        
        current_formation = formations[0].formation_name if formations else "Unknown"
        
        hazardous_formations = ["Tipam Sandstone", "Barail"]
        is_hazardous = current_formation in hazardous_formations
        
        return {
            "current_formation": current_formation,
            "geological_risk": "HIGH" if is_hazardous else "MODERATE",
            "notes": f"Drilling in {current_formation} which has a history of instability." if is_hazardous else f"Drilling in {current_formation}."
        }
