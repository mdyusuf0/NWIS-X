from .base_agent import BaseAgent

class RetrieverAgent(BaseAgent):
    """Agent responsible for retrieving offset evidence."""
    def reason(self, context: dict) -> dict:
        # TODO: Implement offset data retrieval
        return {"evidence": []}
