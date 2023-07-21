from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
from chat import get_completion_from_messages,collect_messages_text,whatsappmsg

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

class Message(BaseModel):
    content: str

@app.get("/")
def home(request: Request):
    return templates.TemplateResponse("index1.html", {"request": request})

@app.post("/chat")
async def chat(message: Message):
    user_message = message.content
    response = collect_messages_text(user_message)
    return {"message": response}
@app.get("/wapp")
def whatsapp():
    whatsappmsg()





if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, port=8000)