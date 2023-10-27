from flask import Blueprint, request
from app.app import musicApp
import json

# Create blueprint
api_player = Blueprint('api_player', __name__, template_folder='templates')

@api_player.route('/api/player/status', methods=["GET"])
def api_player_status():
    result = {"playing": musicApp.playing()}
    if(musicApp.playing()):
        result["current-music"] = musicApp.currentMusic().toJson()
        result["current-user"] = musicApp.currentUser().toJson()
    return result, 200

@api_player.route('/api/player/next-music', methods=["GET"])
def api_player_next_music():
    if(musicApp.nextMusic()):
        return {"user": musicApp.currentUser().toJson(), "music": musicApp.currentMusic().toJson()}, 200
    else:
        # No music available yet (all users has empty queues)
        return {"error": "music-not-ready", "reason": "All users queues are empty."}, 200
