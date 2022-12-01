from flask import Flask, render_template,request, redirect, url_for
import src.dealer 

game = src.dealer.dealer()

dealer_card_image_list = []
player_card_image_list = []

app = Flask(__name__)

##########################
#         home           #
##########################

@app.route("/")
def home():
    return render_template('index.html') 

##########################
# hit, stand, start over #
##########################

@app.route('/nextMove', methods=['POST'])
def next():
    if request.form['Next'] == 'Hit':
        dealer_score, player_score, dealer_card, player_card, dealer_card_img, player_card_img, balance, over, win, next = game.hitme()
        dealer_card_image_list.append(dealer_card_img)
        player_card_image_list.append(player_card_img)
 
        #return {
        #    "dealer_score":dealer_score, 
        #    "player_score":player_score, 
        #    "dealer_card":dealer_card, 
        #    "player_card":player_card, 
        #    "dealer_imgs":dealer_card_image_list, 
        #    "player_imgs":player_card_image_list, 
        #    "next":next,
        #    "over":over,
        #    "win":win,
        #    "balance":balance  
        #}
        return render_template('game.html', 
        dealer_score=dealer_score, 
        player_score=player_score, 
        dealer_card=dealer_card, 
        player_card=player_card, 
        dealer_imgs=dealer_card_image_list, 
        player_imgs=player_card_image_list, 
        next=next,
        over=over,
        win=win,
        balance=balance
        )
    elif request.form['Next'] == 'Stand':
        over=True
        dealer_score, player_score, dealer_card, player_card, dealer_card_img, player_card_img, balance, over, win, next = game.stand()
        dealer_card_image_list.append(dealer_card_img)

        return render_template('game.html', 
        dealer_score=dealer_score, 
        player_score=player_score, 
        dealer_card=dealer_card, 
        player_card=player_card, 
        dealer_imgs=dealer_card_image_list, 
        player_imgs=player_card_image_list, 
        next=next,
        over=over,
        win=win,
        balance=balance
        )
    elif request.form['Next'] == 'New Game':
        return redirect(url_for('home'))
    else:
        return redirect(url_for('cheat'))

##########################
#     Start a game       #
##########################

# Initialize New Game
@app.route('/newGame', methods=['POST'])
def new_game():
    dealer_card_image_list.clear()
    player_card_image_list.clear()
    balance = game.new_hand()
    return render_template('wager.html', balance=balance, place_bet=True)

# Player sets wager and begins game
@app.route('/wager', methods=['GET','POST'])
def wager():
    dealer_card_image_list.clear()
    player_card_image_list.clear()
    wager = request.form['bet']
    try:
        wager = int(wager)
        if isinstance(wager, int):
            dealer_score, player_score, dealer_card, player_card, dealer_card_img, player_card_img, balance, over, win, next = game.get_wager(wager)
            dealer_card_image_list.append(dealer_card_img)
            player_card_image_list.append(player_card_img)
            if over:
                return redirect(url_for('cheat'))
            else:
                return render_template('game.html', 
                dealer_score=dealer_score, 
                player_score=player_score, 
                dealer_card=dealer_card, 
                player_card=player_card, 
                dealer_imgs=dealer_card_image_list, 
                player_imgs=player_card_image_list, 
                next=next
                )
    except:
        return redirect(url_for('cheat'))

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
        
if __name__ == "__main__":
    app.run(debug=True)