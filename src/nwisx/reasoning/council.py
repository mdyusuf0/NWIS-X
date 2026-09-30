from .retriever_agent import RetrieverAgent
from .geologist_agent import GeologistAgent
from .engineer_agent import DrillingEngineerAgent
from .skeptic_agent import SkepticAgent
from .auditor_agent import AuditorAgent

class ReasoningCouncil:
    """Orchestrates all 5 agents and produces verified AlertDossier."""
    def __init__(self):
        self.agents = [
            RetrieverAgent(), GeologistAgent(), DrillingEngineerAgent(),
            SkepticAgent(), AuditorAgent()
        ]

    def orchestrate(self, case_data: dict) -> dict:
        """Run multi-agent reasoning process sequentially."""
        # TODO: Coordinate agents and build AlertDossier
        return {}
