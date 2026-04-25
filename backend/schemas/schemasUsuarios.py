from pydantic import BaseModel, Field, field_validator, ValidationInfo
from typing import Optional
import re

class UsuarioBase(BaseModel):
    name: str = Field(..., min_length=5, max_length=20) 
    email: str = Field(..., max_length=30)
    password: str = Field(..., min_length=8)
    
    @field_validator("name")
    @classmethod
    def validateStringFields(cls, value):
        value = value.strip()
        if not value:
            raise ValueError('Este campo no puede estar vacío')
        return value

    @field_validator("email")
    @classmethod
    def validateEmail(cls, value):
        if value is not None:
            value = value.lower().strip()
            pattern = r'^[a-zA-Z0-9._%+-]+@gmail\.com$'
            if not re.match(pattern, value):
                raise ValueError('Email debe ser usuario@gmail.com')
        return value    

class UsuarioCreate(UsuarioBase):
    pass

class UsuarioUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=5, max_length=20)
    email: Optional[str] = Field(default=None, max_length=30)
    password: Optional[str] = Field(default=None, min_length=8, max_length=20)
    
    @field_validator("name", "email")
    @classmethod
    def validateOptionalFields(cls, value: Optional[str], info: ValidationInfo) -> Optional[str]:
        if value is None:
            return None
        
        fieldName = info.field_name
        
        if fieldName == "email":
            return UsuarioBase.validateEmail(value)
        elif fieldName == "name":
            return UsuarioBase.validateStringFields(value)
        return value
    
class UsuarioResponse(UsuarioBase):
    id: int = Field(..., ge=1)
    
    class Config:
        orm_mode = True