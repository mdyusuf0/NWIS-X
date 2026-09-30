from src.nwisx.reasoning.retriever_agent import RetrieverAgent
from src.nwisx.reasoning.geologist_agent import GeologistAgent
from src.nwisx.reasoning.engineer_agent import DrillingEngineerAgent
from src.nwisx.reasoning.skeptic_agent import SkepticAgent
from src.nwisx.reasoning.auditor_agent import AuditorAgent
from src.nwisx.experience.alert_dossier import AlertDossier, EvidenceItem, CounterEvidenceItem

class ReasoningCouncil:
    def __init__(self):
        self.retriever = RetrieverAgent()
        self.geologist = GeologistAgent()
        self.engineer = DrillingEngineerAgent()
        self.skeptic = SkepticAgent()
        self.auditor = AuditorAgent()
        
    def deliberate(self, context: dict) -> AlertDossier:
        trail = {}
        
        ret_out = self.retriever.reason(context)
        trail[self.retriever.name] = ret_out
        context["retriever_output"] = ret_out
        
        geo_out = self.geologist.reason(context)
        trail[self.geologist.name] = geo_out
        context["geologist_output"] = geo_out
        
        eng_out = self.engineer.reason(context)
        trail[self.engineer.name] = eng_out
        
        skep_out = self.skeptic.reason(context)
        trail[self.skeptic.name] = skep_out
        
        aud_out = self.auditor.reason(context)
        trail[self.auditor.name] = aud_out
        
        evidence = [EvidenceItem(**e) for e in aud_out.get("verified_evidence", [])]
        counter = [CounterEvidenceItem(**c) for c in skep_out.get("counter_evidence", [])]
        
        dossier = AlertDossier(
            alert_id="N/A",
            well_id=context.get("well_id"),
            hazard_type=context.get("hazard_type", "unknown"),
            probability=context.get("probability", 0.0),
            confidence_interval=(0.0, 0.0),
            depth_ahead_m=context.get("lookahead", 100),
            time_ahead_hrs=24.0,
            evidence=evidence,
            counter_evidence=counter,
            recommended_mitigations=eng_out.get("recommended_mitigations", []),
            reasoning_trail=trail,
            status="active",
            created_at="now"
        )
        return dossier
        
    def _build_context(self, well_id, depth, session):
        return {
            "well_id": well_id,
            "depth": depth,
            "session": session
        }
