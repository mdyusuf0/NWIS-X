from .base_agent import BaseAgent

class AuditorAgent(BaseAgent):
    """Agent that verifies every claim has source citation."""
    def reason(self, context: dict) -> dict:
        # TODO: Implement citation checking
        return {"verified": True}
