from src.nwisx.reasoning.base_agent import BaseAgent

class AuditorAgent(BaseAgent):
    @property
    def name(self) -> str:
        return "AuditorAgent"
        
    def reason(self, context: dict) -> dict:
        retrieved = context.get("retriever_output", {}).get("retrieved_evidence", [])
        
        valid_evidence = []
        for item in retrieved:
            if "source_well" in item and "depth" in item:
                valid_evidence.append(item)
                
        return {
            "verified_evidence": valid_evidence,
            "rejected_count": len(retrieved) - len(valid_evidence)
        }
