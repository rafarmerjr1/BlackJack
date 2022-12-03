#!/usr/bin/env python3

from flask import Flask, jsonify, render_template,request, redirect, url_for
from flask_restful import Api, Resource
import src.dealer 

game = src.dealer.dealer()

dealer_card_image_list = []
player_card_image_list = []

app = Flask(__name__)
api = Api(app)

##########################
#         ROUTING           #
##########################

@app.route("/")
def home():
    return render_template('index.html') 

@app.route('/cheat', methods=['GET'])
def cheat():
    return render_template('cheat.html')

# Play game again - keeping balance instact
@app.route('/playagain', methods=['GET'])
def play_again():
    dealer_card_image_list.clear()
    player_card_image_list.clear()
    balance = game.player.get_balance()
    if balance == 0:
        return redirect(url_for('cheat'))
    else:
        return render_template('wager.html', balance=balance)

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
        game.new_game()
        balance = game.new_hand()
        dealer_score, player_score, dealer_card_img, player_card_img, balance, over, win, tie = game.get_wager()
        data = {
            "dealer_score":dealer_score, 
            "player_score":player_score, 
            "dealer_imgs":dealer_card_img, 
            "player_imgs":player_card_img, 
            "tie":tie,
            "over":over,
            "win":win,
            "balance":balance,
            "startGame": False
        }
        #data = {
        #    "balance": balance,
        #    "startGame": False
        #}
        return data

class Continue_game(Resource):
    def get(self):
        print("ContinueGame API hit")
        game.new_hand()
        dealer_score, player_score, dealer_card_img, player_card_img, balance, over, win, tie = game.get_wager()
        data = {
            "dealer_score":dealer_score, 
            "player_score":player_score, 
            "dealer_imgs":dealer_card_img, 
            "player_imgs":player_card_img, 
            "tie":tie,
            "over":over,
            "win":win,
            "balance":balance
        }
        return data

class Hitme(Resource):
    def post(self):
        dealer_score, player_score, dealer_card_img, player_card_img, balance, over, win, tie = game.hitme()

        data = {
            "dealer_score":dealer_score, 
            "player_score":player_score, 
            "dealer_imgs":dealer_card_img, 
            "player_imgs":player_card_img, 
            "tie":tie,
            "over":over,
            "win":win,
            "balance":balance  
        }
        return data

class Stand(Resource):
    def get(self):
        
        dealer_score, player_score, dealer_card_img, player_card_img, balance, over, win, tie = game.stand()
        #print(type(dealer_score))
        #print(type(player_score))
        #print(type(over))
        #print(type(win))
        #print(type(tie))
        #print(type(player_card_img))
        #print(type(dealer_card_img))
        data = {
           "dealer_score":dealer_score, 
           "player_score":player_score,  
           "dealer_imgs":dealer_card_img, 
           "player_imgs":player_card_img, 
           "tie":tie,
           "over":over,
           "win":win,
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
        dealer_score, player_score, dealer_card_img, player_card_img, balance, over, win, tie = game.set_wager(wager)
        #if over:
        #    return redirect(url_for('cheat'))
        #else:
        data = {
            "dealer_score":dealer_score, 
            "player_score":player_score, 
            "dealer_imgs":dealer_card_img, 
            "player_imgs":player_card_img, 
            "tie":tie,
            "over":over,
            "win":win,
            "balance":balance
            }
        return data
        #except:
        #    return redirect(url_for('cheat'))

class Get_balance(Resource): # This calls the wrong function.
    def get(self):
        balance = game.player.get_balance()
        dealer_score, player_score, dealer_card_img, player_card_img, balance, over, win, tie = game.get_wager()
        data = {
            "dealer_score":dealer_score, 
            "player_score":player_score, 
            "dealer_imgs":dealer_card_img, 
            "player_imgs":player_card_img, 
            "tie":tie,
            "over":over,
            "win":win,
            "balance":balance
        }
        return data

api.add_resource(New_game, '/newGame')
api.add_resource(Get_balance, '/Get_balance')
api.add_resource(Hitme, '/Hitme')
api.add_resource(Stand, '/stand')
api.add_resource(Wager, '/wager')
api.add_resource(Continue_game, '/continueGame')


if __name__ == "__main__":
    app.run(debug=True)