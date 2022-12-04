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
#         ROUTING        #
##########################

#@app.route("/")
#def home():
#    return render_template('index.html') 
#
#@app.route('/cheat', methods=['GET'])
#def cheat():
#    return render_template('cheat.html')
#@app.route('/newGame', methods=['GET', 'POST'])
#def new_game():
#    dealer_card_image_list.clear()
#    player_card_image_list.clear()
#    balance = game.new_hand()
#    return render_template('wager.html', balance=balance, place_bet=True)

##########################
# APIs #
##########################
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
        print(type(dealer_score))
        print(type(player_score))
        print(type(results))
        print(type(player_card_img))
        print(type(dealer_card_img))
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
        print(type(req))
        print(req["wager"])
        wager = req['wager']
        wager = int(wager)
        #game.set_wager(wager)
        #try:
            #if isinstance(wager, int):
        dealer_score, player_score, dealer_card_img, player_card_img, balance, results = game.set_wager(wager)
        #if over:
        #    return redirect(url_for('cheat'))
        #else:
        data = {
            "dealer_score":dealer_score, 
            "player_score":player_score, 
            "dealer_imgs":dealer_card_img, 
            "player_imgs":player_card_img, 
            "results":results,
            "balance":balance,
            "wager_set":True
            }
        return data
        #except:
        #    return redirect(url_for('cheat'))


api.add_resource(New_game, '/newGame')
api.add_resource(Hitme, '/Hitme')
api.add_resource(Stand, '/stand')
api.add_resource(Wager, '/wager')
api.add_resource(Continue_game, '/continueGame')


if __name__ == "__main__":
    app.run(debug=True)