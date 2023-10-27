from __future__ import print_function # In python 2.7
from models.user import User
from models.music import Music

class MusicApp:

    _users: list[User] = []
    _currentUser: int = 0
    _playing: bool = False
    _currentMusic: Music = None

    def __init__(self) -> None:
        pass

    # User management
    def users(self) -> list[User]:
        return self._users

    def addUser(self, user: User) -> None:
        if(not self.userExists(user)):
            self._users.append(user)

    def userExists(self, user: User) -> bool:
        for user_i in self._users:
            if(user_i.id() == user.id()):
                return True
        return False
    
    def userExists(self, user_id: str) -> bool:
        for user_i in self._users:
            if(user_i.id() == user_id):
                return True
        return False

    def getUser(self, user_id: str) -> User:
        for user_i in self._users:
            if(user_i.id() == user_id):
                return user_i
        return None

    def deleteUser(self, user_id: str) -> bool:
        index:int = 0
        for user in self._users:
            if(user.id() == user_id):
                self._users.pop(index)
                return True
            index += 1
        return False

    # Player management
    def playing(self) -> bool:
        return self._playing
    
    def currentMusic(self) -> Music:
        return self._currentMusic
    
    def currentUser(self) -> User:
        return self._users[self._currentUser] if self._playing else None

    def nextMusic(self) -> False:
        maxIterations: int = len(self._users)
        for i in range(0, maxIterations):
            # Rotate to next user
            self._currentUser += 1
            if(self._currentUser >= len(self._users)):
                self._currentUser = 0

            # Get next music from user
            user = self._users[self._currentUser]
            musics = user.musics()
            numMusics = len(musics)
            print(f"checking musics for user '{user.id()}', it has {numMusics} musics...")
            if(numMusics > 0):
                # Get first music from list, deleting from user list
                self._currentMusic = musics[0]
                self._users[self._currentUser].deleteMusic(0)
                self._playing = True
                return True
            else:
                # User does not have a music ready, continue search
                pass
        
        # No music available yet (all users has empty queues)
        print("all users with empty queues! ")
        self._playing = False
        return False
