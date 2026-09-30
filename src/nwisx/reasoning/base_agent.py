from abc import ABC, abstractmethod

class BaseAgent(ABC):
    @property
    @abstractmethod
    def name(self) -> str:
        pass
        
    @abstractmethod
    def reason(self, context: dict) -> dict:
        pass
