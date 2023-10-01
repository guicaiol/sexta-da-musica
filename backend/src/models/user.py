from models.music import Music

class User:
    _id: str = ""
    _name: str = ""
    _musics: list[Music] = []

    # Constructor
    def __init__(self, id:str, name:str):
        self._id = id
        self._name = name
        self._musics = []

    # JSON serializer
    def toJson(self) -> dict:
        return {"id": self._id, "name": self._name, "musics": [music.toJson() for music in self._musics]}

    # Setters
    def addMusic(self, music: Music) -> None:
        self._musics.append(music)

    def deleteMusic(self, index: int) -> bool:
        if(index < len(self._musics)):
            self._musics.pop(index)
            return True
        else:
            return False

    # Getters
    def id(self) -> str:
        return self._id
    
    def name(self) -> str:
        return self._name
    
    def musics(self) -> list[Music]:
        return self._musics
    