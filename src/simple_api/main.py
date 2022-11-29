from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import atexit


class Database:
    def __init__(self):
        if not os.path.exists('database.json'):
            self.db = dict()
        else:
            with open('database.json', 'r') as f:
                self.db = json.load(f) # problemid : 1, 0
                f.close()
    
    def search(self, problemId):
        problemId = str(problemId)
        if not problemId.isdecimal(): return 0
        return self.db[problemId] if problemId in self.db else 0
    
    def add_problem(self, problemId):
        problemId = str(problemId)
        if not problemId.isdecimal(): return 0
        self.db[problemId] = 1
        return 1
    
    def remove_problem(self, problemId):
        problemId = str(problemId)
        if not problemId.isdecimal(): return 0
        if problemId in self.db:
            self.db[problemId] = 0
        return 1
    
    def save(self):
        with open('database.json', 'w') as f:
            json.dump(self.db, f, indent=4)
            f.close()


class BaekjoonProblem(FastAPI):
    def __init__(self, title: str = "Baekjoon Problem"):
        super().__init__(title=title)
        self.database = Database()
        atexit.register(self.database.save)

        @self.get("/problem/{problemId}")
        async def info_problem(problemId):
            return {'data': self.database.search(problemId)}

        @self.get("/add_problem/{problemId}")
        async def add_problem(problemId):
            return {'data': self.database.add_problem(problemId)}

        @self.get("/remove_problem/{problemId}")
        async def remove_problem(problemId):
            return {'data': self.database.remove_problem(problemId)}


app = BaekjoonProblem()
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
# uvicorn main:app --reload --host=0.0.0.0 --port=8989 --ssl-keyfile='./key.pem' --ssl-certfile='./cert.pem'