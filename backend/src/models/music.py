
class Music:
    _url: str = ""
    
    # Constructor
    def __init__(self, url: str):
        self._url = url

    # JSON serializer
    def toJson(self) -> str:
        return {"url": self._url}

    # Getters
    def url(self):
        return self._url
