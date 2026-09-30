from src.nwisx.reasoning.base_agent import BaseAgent

class DrillingEngineerAgent(BaseAgent):
    @property
    def name(self) -> str:
        return "DrillingEngineerAgent"
        
    def reason(self, context: dict) -> dict:
        geology_notes = context.get("geologist_output", {}).get("notes", "")
        risk = context.get("geologist_output", {}).get("geological_risk", "LOW")
        
        mitigations = []
        if risk == "HIGH":
            mitigations.append("Increase mud weight by 0.5 ppg")
            mitigations.append("Reduce ROP to < 10 m/hr")
        else:
            mitigations.append("Maintain optimal parameters")
            
        return {
            "recommended_mitigations": mitigations,
            "engineer_assessment": "High geological risk dictates conservative parameters." if risk == "HIGH" else "Standard parameters OK."
        }
