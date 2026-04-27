from pydantic import BaseModel, Field
from typing import Optional

class CarritoBase(BaseModel):
    idUsuario: int = Field(..., ge=1)
    idProducto: int = Field(..., ge=1)
    quantity: int = Field(..., ge=0)
    
class CarritoCreate(CarritoBase):
    pass

class CarritoResponse(CarritoBase):
    pass

class CarritoUpdate(BaseModel):
    idUsuario: Optional[int] = Field(default=None, ge=1)
    idProducto: Optional[int] = Field(default=None, ge=1)
    quantity: Optional[int] = Field(default=None, ge=0)