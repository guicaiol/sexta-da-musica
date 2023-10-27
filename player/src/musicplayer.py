from enum import IntEnum
import requests
from time import sleep
import json
import os

# API = "http://sextadamusica.local/api/"
API = "/api/"


class MusicPlayer:

    _state:int = 0

    class State(IntEnum):
        STATE_FETCH_MUSIC = 0,
        STATE_DOWNLOAD_MUSIC = 1,
        STATE_PLAY_MUSIC = 2

    def __init__(self) -> None:
        self._state: int = 0
        pass

    def run(self) -> None:
        url: str = ""

        while True:
            if self._state == MusicPlayer.State.STATE_FETCH_MUSIC:
                print("- Requesting next music to backend...")
                resp = requests.get(API + "player/next-music")
                content = json.loads(resp.content)
                print(f"Response: {resp.status_code}\n{content}")
                print("OK!")

                try:
                    error = content["error"]
                except:
                    error = None
                    url = content["music"]["url"]
                
                if(error == "music-not-ready"):
                    print("Music not ready, running again in 1s...")
                    sleep(1)
                else:
                    print("Music READY, starting download...")
                    self._state = MusicPlayer.State.STATE_DOWNLOAD_MUSIC

            elif self._state == MusicPlayer.State.STATE_DOWNLOAD_MUSIC:
                print(f"Downloading music: {url}")
                os.system(f"yt-dlp -f 140 -o - \"{url}\" > music.mp4")
                print("OK!")
                self._state = MusicPlayer.State.STATE_PLAY_MUSIC

            elif self._state == MusicPlayer.State.STATE_PLAY_MUSIC:
                print(f"Playing music: {url}")
                os.system(f"cvlc music.mp4 vlc://quit")
                print("OK!")
                self._state = MusicPlayer.State.STATE_FETCH_MUSIC
