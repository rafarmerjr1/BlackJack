#!/usr/bin/env python3

from flask import Flask, jsonify, render_template,request, redirect, url_for
from flask_restful import Api, Resource
import src.Main 

#    Initialize Game     
game = src.Main.Main()

app = Flask(__name__)
api = Api(app)

# Clear all player and game information
class Clear_it(Resource):
    def get(self):
        try:
            game.reset_all()
            return 200
        except:
            raise APIError

# Deal hand
class Continue_game(Resource):
    def get(self):
        try:
            game.new_hand()
            dealer_score, player_score, dealer_card_img, player_card_img, balance, results = game.deal_first_hand()
            data = {
                "dealer_score":dealer_score, 
                "player_score":player_score, 
                "dealer_imgs":dealer_card_img, 
                "player_imgs":player_card_img, 
                "results":results,
                "balance":balance
            }
            return data
        except:
            raise APIError

# Accept Hit or Stand
class Action(Resource):
    def post(self):
        try:
            req = request.json
            action = req['action'] 
            if action == "hit":
                dealer_score, player_score, dealer_card_img, player_card_img, balance, results = game.hitme()
            elif action == "stand":
                dealer_score, player_score, dealer_card_img, player_card_img, balance, results = game.stand()
            data = {
                "dealer_score":dealer_score, 
                "player_score":player_score, 
                "dealer_imgs":dealer_card_img, 
                "player_imgs":player_card_img, 
                "results":results,
                "balance":balance  
            }
            return data
        except:
            raise APIError

# Accept Wager from player
class Wager(Resource):
    def post(self):
        try:
            req = request.json
            wager = req['wager'] 
            results = game.check_wager(wager)
            return {"results": results}
        except:
            raise APIError  

# Return player balance
class Get_balance(Resource):
    def get(self):
        try: 
            balance = game.get_balance()
            return { "balance": balance }
        except:
            raise APIError

class APIError(Exception):
    code = 500

@app.errorhandler(APIError)
def handle_exception(err):
    '''Return Error Page to react'''
    return {"results": "Error"}

# Routes    
api.add_resource(Action, '/action')
api.add_resource(Wager, '/wager')
api.add_resource(Continue_game, '/continueGame')
api.add_resource(Clear_it, '/clearIt')
api.add_resource(Get_balance, '/getBalance')


if __name__ == "__main__":
    app.run(debug=True)