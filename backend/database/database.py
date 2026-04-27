import sqlite3
from pathlib import Path
from contextlib import contextmanager
from ..schemas.schemasProductos import ProductoCreate, ProductoUpdate
from ..schemas.schemaOfId import Id

class DbManager:
    def __init__(self, db_path = None):
        if db_path is None:
            db_path = self._obtainDbRoute()
        self.db_path = str(db_path)
        self.initDatabase()
    
    def _obtainDbRoute(self):
        BASE_DIR = Path(__file__).resolve().parent
        DATABASE_PATH = BASE_DIR/ "boutique_elat.db"
        return DATABASE_PATH

    @contextmanager
    def getConnection(self):
        conn = sqlite3.connect(self.db_path)
        conn.execute("PRAGMA foreign_keys = ON;")
        conn.row_factory = sqlite3.Row
        try:
            yield conn
        finally:
            conn.close()
        
    def initDatabase(self):
        with self.getConnection() as conn:
            cursor = conn.cursor()
            
            cursor.execute("""
                           create table if not exists productos (
                               id integer primary key autoincrement,
                               src text unique not null,
                               name text not null,
                               description text not null,
                               price real not null check (price > 0),
                               forr text not null,
                               quantity integer not null,
                           )
                           """)
            cursor.execute("""
                           create table if not exists usuarios (
                               id integer primary key autoincrement,
                               name text not null,
                               email text unique not null,
                               password text unique not null,
                           )
                           """)
            cursor.execute("""
                           create table if not exists carritos (
                               id_usuario integer not null references usuarios(id),
                               id_producto integer not null references productos(id),
                               quantity integer not null,
                               primary key (id_usuario, id_producto)
                           )
                           """)
            cursor.execute("""
                           create table if not exists favoritos(
                               id_usuario integer not null references usuarios(id),
                               id_producto integer not null references productos(id),
                               primary key (id_usuario, id_producto)
                           )
                           """)
            conn.commit()


#CRUD

#productos

    def createProduct(self, producto: ProductoCreate):
        with self.getConnection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "insert into productos (src, name, description, price, forr, quantity) values(?,?,?,?,?,?)" (producto)
                )
            conn.commit()
            return cursor.lastrowid

    def getSampleProducts(self):
        with self.getConnection() as conn:
            cursor = conn.cursor()
            
            cursor.execute(
                "select * from productos order by id limit 12"
            )
            return [dict(row) for row in cursor.fetchall()]

    def getAllProducts(self):
        with self.getConnection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "select * from productos"
            )
            return [dict(row) for row in cursor.fetchall()]

    def getAviableProducts(self):
        with self.getConnection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "select * from productos where quantity > 0"
            )
            return [dict(row) for row in cursor.fetchall()]

    def updateProductQuantity(self, updateOfProducto: ProductoUpdate, idProducto: Id):
        with self.getConnection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "update productos set quantity = ? where id = ?" (updateOfProducto, idProducto)
            )
            conn.commit()
            return cursor.rowcount > 0

    def updateProductPrice(self, updateOfProducto: ProductoUpdate, idProducto: Id):
        with self.getConnection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "update productos set price = ? where id = ?"(updateOfProducto, idProducto)
                )
            conn.commit()
            return cursor.rowcount > 0

    def deleteProduct(self, idProducto: Id):
        with self.getConnection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "delete from productos where id = ?"(idProducto)
            )
            conn.commit()
            
            return cursor.rowcount > 0