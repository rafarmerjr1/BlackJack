#!/usr/bin/env python3

from flask import Flask, jsonify, render_template,request, redirect, url_for
from flask_restful import Api, Resource
import src.Main 

##########################
#    Initialize Game     #
##########################

game = src.Main.Main()

app = Flask(__name__)
api = Api(app)

##########################
# APIs #
##########################
class Clear_it(Resource):
    def get(self):
        game.reset_balances()
        game.reset_all()
        return 200


class New_game(Resource):
    def get(self):
        print("newGame API hit")
        game.reset_balances()
        balance = game.new_hand()
        dealer_score, player_score, dealer_card_img, player_card_img, balance, results = game.deal_first_hand()
        data = { 
            "dealer_score":dealer_score, 
            "player_score":player_score, 
            "dealer_imgs":dealer_card_img, 
            "player_imgs":player_card_img,
            "results":results,
            "balance":balance,
            "startGame": False
        }
        return data

class Continue_game(Resource):
    def get(self):
        print("ContinueGame API hit")
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

class Hitme(Resource):
    def post(self):
        dealer_score, player_score, dealer_card_img, player_card_img, balance, results = game.hitme()
        data = {
            "dealer_score":dealer_score, 
            "player_score":player_score, 
            "dealer_imgs":dealer_card_img, 
            "player_imgs":player_card_img, 
            "results":results,
            "balance":balance  
        }
        return data

class Stand(Resource):
    def get(self):
        
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

class Wager(Resource):
    def post(self):
        req = request.json
        wager = req['wager'] 
        print(wager) 
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

class Get_state(Resource):
    def get(self):
        dealer_score, player_score, dealer_card_img, player_card_img, balance, results = game.return_to_API()
        data = {
            "dealer_score":dealer_score, 
            "player_score":player_score, 
            "dealer_imgs":dealer_card_img, 
            "player_imgs":player_card_img, 
            "results":results,
            "balance":balance
            }
        return data


api.add_resource(New_game, '/newGame')
api.add_resource(Hitme, '/Hitme')
api.add_resource(Stand, '/stand')
api.add_resource(Wager, '/wager')
api.add_resource(Continue_game, '/continueGame')
api.add_resource(Clear_it, '/clearIt')
api.add_resource(Get_state, '/getState')


if __name__ == "__main__":
    app.run(debug=True)