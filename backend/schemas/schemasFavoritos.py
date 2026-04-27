from pydantic import BaseModel, Field
from typing import Optional

class FavoritoBase(BaseModel):
    idUsuario: int = Field(..., ge=1)
    idProducto: int = Field(..., ge=1)
    
class FavoritoCreate(FavoritoBase):
    pass

class FavoritoResponse(FavoritoBase):
    pass

class FavoritoUpdate(BaseModel):
    idUsuario: Optional[int] = Field(default=None, ge=1)
    idProducto: Optional[int] = Field(default=None, ge=1)