from flask import Flask

# Import APIs
from api.users import api_users
from api.player import api_player

# Create Flask backend app
webapp = Flask(__name__)
webapp.register_blueprint(api_users)
webapp.register_blueprint(api_player)

@webapp.route('/')
def index():
    return "Bem-vindo ao Sexta da Música!", 200
