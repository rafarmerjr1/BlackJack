from flask import Flask, render_template,request
import src.dealer 

game = src.dealer.dealer()

dealer_card_image_list = []
player_card_image_list = []

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html') 

@app.route('/hit', methods=['GET'])
def login():
    return None

@app.route('/stand', methods=['GET'])
def login1():
    return None

@app.route('/newGame', methods=['POST'])
def new_game():
    dealer_card_image_list.clear()
    player_card_image_list.clear()
    global balance
    balance = game.new_hand()
    return render_template('game.html', balance=balance, place_bet=True)

@app.route('/wager', methods=['POST'])
def wager():
    wager = request.form['bet']
    dealer_score, player_score, dealer_card, player_card, dealer_card_img, player_card_img = game.get_wager(wager)
    dealer_card_image_list.append(dealer_card_img)
    player_card_image_list.append(player_card_img)
    return render_template('game.html', dealer_score=dealer_score, player_score=player_score, dealer_card=dealer_card, player_card=player_card, dealer_imgs=dealer_card_image_list, player_imgs=player_card_image_list)

if __name__ == "__main__":
    app.run(debug=True)