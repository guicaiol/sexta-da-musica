from __future__ import print_function # In python 2.7
from models.user import User
from models.music import Music
import copy

class MusicApp:

    _users: list[User] = []
    _currentUser: int = 0
    _playing: bool = False
    _currentMusic: Music = None
    _queue: list[dict] = []

    def __init__(self) -> None:
        pass

    # User management
    def users(self) -> list[User]:
        return self._users

    def addUser(self, user: User) -> None:
        if(not self.userExists(user)):
            self._users.append(user) # TODO: add user before current user playing (FIFO)

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
                self._recalculateQueue()
                return True
            index += 1
        return False
    
    def addMusicToUser(self, user_id: str, music: Music) -> None:
        user: User = self.getUser(user_id)
        user.addMusic(music)
        self._recalculateQueue()
    
    def deleteMusicFromUser(self, user_id: str, music_index: int) -> bool:
        user: User = self.getUser(user_id)
        if(user.deleteMusic(music_index)):
            self._recalculateQueue()
            return True
        else:
            return False

    # Queue management
    def _recalculateQueue(self) -> None:
        queue: list[dict] = []
        currentUser = self._currentUser
        users: list[User] = copy.deepcopy(self._users)

        maxIterations: int = len(self._users)
        emptyQueues = 0
        while(emptyQueues < maxIterations):               
            # Rotate to next user
            currentUser += 1
            if(currentUser >= len(users)):
                currentUser = 0

            # Get next music from user
            user = users[currentUser]
            musics = user.musics()
            numMusics = len(musics)
            if(numMusics > 0):
                # Get first music from list, deleting from user list
                music = musics[0]
                queue.append({"username": user.name(), "music": music.toJson()})
                users[currentUser].deleteMusic(0)
                emptyQueues = 0
            else:
                emptyQueues += 1

        # Set new queue
        self._queue = queue

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
            #print(f"checking musics for user '{user.id()}', it has {numMusics} musics...")
            if(numMusics > 0):
                # Get first music from list, deleting from user list
                self._currentMusic = musics[0]
                self._users[self._currentUser].deleteMusic(0)
                self._playing = True
                self._recalculateQueue()
                return True
            else:
                # User does not have a music ready, continue search
                pass
        
        # No music available yet (all users has empty queues)
        #print("all users with empty queues! ")
        self._playing = False
        return False

    def getQueue(self) -> list[dict]:
        return self._queue
