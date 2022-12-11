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
        game.reset_all()
        return 200

# Deal hand
class Continue_game(Resource):
    def get(self):
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

# Accept Hit or Stand
class Action(Resource):
    def post(self):
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

# Accept Wager from player
class Wager(Resource):
    def post(self):
        req = request.json
        wager = req['wager'] 
        dealer_score, player_score, dealer_card_img, player_card_img, balance, results = game.check_wager(wager)
        if results != "broke" and results != "invalid":
            return {"results": results}
        else:
            data = { 
                "dealer_score":dealer_score, 
                "player_score":player_score, 
                "dealer_imgs":dealer_card_img, 
                "player_imgs":player_card_img, 
                "results":results,
                "balance":balance
                }
            return data

# Return player balance
class Get_balance(Resource):
    def get(self):
        balance = game.get_balance()
        return { "balance": balance }

# Routes    

api.add_resource(Action, '/action')
api.add_resource(Wager, '/wager')
api.add_resource(Continue_game, '/continueGame')
api.add_resource(Clear_it, '/clearIt')
api.add_resource(Get_balance, '/getBalance')


if __name__ == "__main__":
    app.run(debug=True)