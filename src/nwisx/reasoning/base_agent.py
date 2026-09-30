from abc import ABC, abstractmethod

class BaseAgent(ABC):
    """Abstract base class for all reasoning agents."""
    @abstractmethod
    def reason(self, context: dict) -> dict:
        """Perform agent-specific reasoning."""
        pass
