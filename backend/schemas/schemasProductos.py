from pydantic import BaseModel, Field
from typing import Optional

class ProductoBase(BaseModel):
    src: str = Field(..., min_length=1)
    name: str = Field(..., min_length=1, max_length=100)
    description: str = Field(..., min_length=1)
    price: float = Field(..., ge=0)
    forr: str = Field(..., min_length=1)
    quantity: int = Field(..., ge=0)

class ProductoCreate(ProductoBase):
    pass

class ProductoUpdate(BaseModel):
    src: Optional[str] = Field(default=None, min_length=1)
    name: Optional[str] = Field(default=None, min_length=1, max_length=100)
    description: Optional[str] = Field(default=None, min_length=1)
    price: Optional[float] = Field(default=None, ge=0)
    forr: Optional[str] = Field(default=None, min_length=1)
    quantity: Optional[int] = Field(default=None, ge=0)

class ProductoResponse(ProductoBase):
    id: int = Field(..., ge=1)
    
    class Config:
        orm_mode = True