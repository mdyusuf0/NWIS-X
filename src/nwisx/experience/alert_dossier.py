from dataclasses import dataclass

@dataclass
class AlertDossier:
    """Structured container for multi-agent reasoning output."""
    evidence: list
    counter_evidence: list
    mitigations: list
    confidence: float
