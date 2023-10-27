from flask import Blueprint, request, Response
from models.user import User
from models.music import Music
from app.app import musicApp
import json

# Create blueprint
api_users = Blueprint('api_users', __name__, template_folder='templates')

@api_users.route('/api/users', methods=["GET", "POST"])
def api_users_route():
    if request.method == 'GET':
        return [user.toJson() for user in musicApp.users()], 200
    
    elif request.method == 'POST':
        # Parse data
        data = request.json
        user_id:str = data['id']
        user_name:str = data['name']

        # Check if user already exists
        if(musicApp.userExists(user_id)):
            return Response(json.dumps({"error": "user-already-exists", "message": f"Usuário '{user_id}' já existe."}), mimetype='application/json'), 422
        
        # Add new user
        musicApp.addUser(User(user_id, user_name))
        return Response(json.dumps({"message": "Usuário criado."}), mimetype='application/json'), 200
    else:
        return "Not found", 404

@api_users.route('/api/users/<user_id>', methods=["GET", "DELETE"])
def api_users_userid(user_id: str):
    if request.method == 'GET':
        # Check if user already exists
        user = musicApp.getUser(user_id)
        if(user is not None):
            return user.toJson(), 200
        
        # Not found
        return f"User '{user_id}' does not exists.", 422
    
    elif request.method == 'DELETE':
        # Check if user already exists
        if(musicApp.deleteUser(user_id)):
            return f"User '{user_id}' deleted.", 200
        else:
            return f"User '{user_id}' does not exists.", 422

@api_users.route('/api/users/<user_id>/musics', methods=["GET", "POST"])
def api_users_userid_musics(user_id: str):
    if request.method == 'GET':
        # Check if user already exists
        user = musicApp.getUser(user_id)
        if(user is not None):
            return [music.toJson() for music in user.musics()], 200
        
        # Not found
        return f"User '{user_id}' does not exists.", 422
    
    elif request.method == 'POST':
        # Parse data
        data = request.json
        music_url:str = data['url']

        # Check if user already exists
        user = musicApp.getUser(user_id)
        if(user is not None):
            user.addMusic(Music(music_url))
            return {"message":f"Música URL '{music_url}' adicionada para '{user_id}'."}, 200
        
        # Not found
        return {"error":f"User '{user_id}' does not exists."}, 422

@api_users.route('/api/users/<user_id>/musics/<int:music_index>', methods=["DELETE"])
def api_users_userid_musics_musicindex(user_id: str, music_index: int):
    if request.method == 'DELETE':
        # Check if user already exists
        user = musicApp.getUser(user_id)
        if(user is not None):
            if(user.deleteMusic(music_index)):
                return f"Music index {music_index} deleted for user '{user_id}'.", 200
            else:
                return f"Music index {music_index} does not exists for user '{user_id}'.", 422
        
        # Not found
        return f"User '{user_id}' does not exists.", 422
