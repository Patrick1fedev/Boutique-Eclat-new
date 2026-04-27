from pydantic import BaseModel, Field

class Id(BaseModel):
    id: int = Field(..., ge=0)