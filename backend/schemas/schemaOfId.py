from pydantic import BaseModel, Field, field_validator
import re

class Id(BaseModel):
    id: int = Field(..., ge=0)

class Email(BaseModel):
    email: str = Field(..., max_length=20)
    @field_validator("email")
    @classmethod
    def validateEmail(cls, value):
        if value is not None:
            value = value.lower().strip()
            pattern = r'^[a-zA-Z0-9._%+-]+@gmail\.com$'
            if not re.match(pattern, value):
                raise ValueError('Email debe ser usuario@gmail.com')
        return value    
