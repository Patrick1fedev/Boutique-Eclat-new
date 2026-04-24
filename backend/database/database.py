import sqlite3
from pathlib import Path
from contextlib import contextmanager


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