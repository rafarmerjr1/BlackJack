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
        dealer_card_image_list.clear()
        player_card_image_list.clear()
        balance = game.new_hand()
        #return render_template('wager.html', balance=balance, place_bet=True)
        data = {
            "balance":balance
        }
        return data

class Hitme(Resource):
    def post(self):
        dealer_score, player_score, dealer_card, player_card, dealer_card_img, player_card_img, balance, over, win, next = game.hitme()
        dealer_card_image_list.append(dealer_card_img)
        player_card_image_list.append(player_card_img)

        data = {
            "dealer_score":dealer_score, 
            "player_score":player_score, 
            "dealer_card":dealer_card, 
            "player_card":player_card, 
            "dealer_imgs":dealer_card_image_list, 
            "player_imgs":player_card_image_list, 
            "next":next,
            "over":over,
            "win":win,
            "balance":balance  
        }
        return data

class Stand(Resource):
    def post(self):
        over=True
        dealer_score, player_score, dealer_card, player_card, dealer_card_img, player_card_img, balance, over, win, next = game.stand()
        dealer_card_image_list.append(dealer_card_img)

        data = {
           "dealer_score":dealer_score, 
           "player_score":player_score, 
           "dealer_card":dealer_card, 
           "player_card":player_card, 
           "dealer_imgs":dealer_card_image_list, 
           "player_imgs":player_card_image_list, 
           "next":next,
           "over":over,
           "win":win,
           "balance":balance  
        }
        return data

class Wager(Resource):
    def post(self):
        dealer_card_image_list.clear()
        player_card_image_list.clear()
        req = request.json
        print(req['bet'])
        wager = req['bet']
        try:
            wager = int(wager)
            if isinstance(wager, int):
                dealer_score, player_score, dealer_card, player_card, dealer_card_img, player_card_img, balance, over, win, next = game.get_wager(wager)
                dealer_card_image_list.append(dealer_card_img)
                player_card_image_list.append(player_card_img)
                if over:
                    return redirect(url_for('cheat'))
                else:
                    data = {
                        "dealer_score":dealer_score, 
                        "player_score":player_score, 
                        "dealer_card":dealer_card, 
                        "player_card":player_card, 
                        "dealer_imgs":dealer_card_image_list, 
                        "player_imgs":player_card_image_list, 
                        "next":next,
                        "over":over,
                        "win":win,
                        "balance":balance  
                        }
                    return data
        except:
            return redirect(url_for('cheat'))

class Get_balance(Resource):
    def get(self):
        balance = game.player.get_balance()
        data = {
            "balance": balance
        }
        return data

api.add_resource(New_game, '/newGame')
api.add_resource(Get_balance, '/Get_balance')
api.add_resource(Hitme, '/Hitme')
api.add_resource(Stand, '/stand')
api.add_resource(Wager, '/wager')


if __name__ == "__main__":
    app.run(debug=True)