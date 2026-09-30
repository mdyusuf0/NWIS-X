from pydantic import BaseModel

class WellSchema(BaseModel):
    id: int
    name: str
