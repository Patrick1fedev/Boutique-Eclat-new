from fastapi import FastAPI
from fastapi.responses import JSONResponse
import uvicorn

app = FastAPI(title="Booutique_eclat_API", version="1.0.0")

@app.get("/")
def getHome():
    return {"Status_code": "200", "response": "Welcome to Boutique Eclat server!"}

@app.get("/products")
def getAllProducts():
    return [{ "id": 1, "src": '../assets/Images/df4629d5a458e3c6c456a49cb707f671.jpg', "description": "Producto 1", "price": 53.45, "for":'woman'},
        { "id": 2, "src":'../assets/Images/IMG_0237.jpg', "description": "Producto 2", "price": 82.77, "for":'man'},
        { "id": 3, "src":'../assets/Images/IMG_0251.jpg', "description": "Producto 3", "price": 79.39, "for":'man'},
        { "id": 4, "src":'../assets/Images/IMG_0443.jpg', "description": "Producto 4", "price": 45.49, "for":'accesories'},
        { "id": 5, "src":'../assets/Images/IMG_0415.jpg', "description": "Producto 5", "price": 65.79, "for":'man'},
        { "id": 6, "src":'../assets/Images/IMG_0445.jpg', "description": "Producto 6", "price": 88.98, "for":'woman'},
        { "id": 7, "src":'../assets/Images/IMG_0447.jpg', "description": "Producto 7", "price": 55.49, "for":'man'},
        { "id": 8, "src":'../assets/Images/IMG_0241.jpg', "description": "Producto 8", "price": 88.40, "for":'man'},
        { "id": 9, "src":'../assets/Images/IMG_0446.jpg', "description": "Producto 9", "price": 67.99, "for":'woman'},
        { "id": 10, "src":'../assets/Images/IMG_0244.jpg', "description": "Producto 10", "price": 39.59, "for":'man'},
        { "id": 11, "src":'../assets/Images/IMG_0442.jpg', "description": "Producto 11", "price": 49.95, "for":'accesories'},
        { "id": 12, "src":'../assets/Images/IMG_0237.jpg', "description": "Producto 12", "price": 49.99, "for":'man'},]
    
@app.get("/popular_comments")
def getPopularoments():
    return[{
            "name": "John Doe",
            "coment": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, dolores, illum?",
            "rate": "4.5",
            "profile": "#",
            "alt": "john-01",
        },
        {
            "name": "Mark Anthony",
            "coment": "Lorem ipsum dolor sit amet, consectetur.",
            "rate": "4.7",
            "profile": "#",
            "alt": "marco-an"
        },
        {
            "name": "Anthony Mark",
            "coment": "Lorem ipsum dolor sit amet",
            "rate": "4.0",
            "profile": "#",
            "alt": "antonio-mc"
        },
        {
            "name": "Elon Musk",
            "coment": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem?",
            "rate": "3.8",
            "profile": "#",
            "alt": "Emusk99"
        },
        {
            "name": "Old Lesbian",
            "coment": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, consequatur labore.",
            "rate": "4.8",
            "profile": "#",
            "alt": "marika223"
        },
        {
            "name": "Pope Francis",
            "coment": "Lorem ipsum dolor sit amet, consectetur adipisicing.",
            "rate": "2.3",
            "profile": "#",
            "alt": "Franc3rd"
        }]

if __name__ == "__main__":
    host= "127.0.0.1"
    port = 8089
    print(f"http://{host}:{port}")
    uvicorn.run("main:app", host=host, port=port, reload=True)