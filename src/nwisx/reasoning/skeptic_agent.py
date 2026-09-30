from .base_agent import BaseAgent

class SkepticAgent(BaseAgent):
    """Agent that challenges alerts with counter-evidence."""
    def reason(self, context: dict) -> dict:
        # TODO: Implement counter-evidence retrieval
        return {"challenges": []}
