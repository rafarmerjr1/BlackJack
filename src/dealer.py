from src.deck import deck as deck
from src.player import player as player

class dealer():
 
    def __init__(self):
        self.deck = deck()
        self.player = player(100)
        self.dealer = player(10000)
        self.over = False
        self.win = False
        self.tie = False
        self.player._set_score(0)
        self.dealer._set_score(0)

##########################
#     Start a Game       #
##########################

    def new_game(self):
        # Reset balances for new games
        self.player._set_balance(100)
        self.dealer._set_balance(10000)

    def new_hand(self):  
        #Reset values if not first game
        self.over = False
        self.win = False
        self.tie = False
        self.player.set_wager(0)
        self.player.set_wager(0)
        self.dealer_card_img = ["images/PNG-cards-1.3/card_back.png"]
        self.player_card_img = []
        self.player_balance = self.player.get_balance()
        return self.player_balance

    def get_wager(self):
        self.player._set_score(0)
        self.dealer._set_score(0)
        if self.player.not_broke():
            self.lets_deal() 
            self.lets_deal()
            self.dealer_hit()
            self.check_deal_values()
            return self.handler()
        else:
            self.over = True
            return self.state()

    def set_wager(self, wager):
        self.wager = int(wager) # breaks if it gets a string, needs error handling
        self.player.set_wager(self.wager)
        self.dealer.set_wager(self.wager)
        return self.handler()
        
    def lets_deal(self):
        # Deal a card and adjust total score
        card_value, player_card_img = self.deck.get_hand()
        self.player_card_img.append(player_card_img)
        self.player._adjust_score(card_value)
        self.player_score = self.player.get_score()
        self.over, self.win = self.player.check_score()

    def check_deal_values(self):
        if self.win == True:
            self.player._add_balance(self.wager)
            self.dealer.subtract_balance(self.wager)
            return self.state()
        if self.player_score > 21 or self.player_score == 21:
            return self.state()  
        else:
            self.dealer_hit()
            return self.check_dealer_hit_values()

##########################
#     hit and stand       #
##########################

    def hitme(self):
        self.stays = 0
        self.lets_deal() 
        return self.check_deal_values()

    def dealer_hit(self):
        #Dealer draws a card
        card_value, dealer_card_img = self.deck.get_hand()
        self.dealer_card_img.append(dealer_card_img)
        self.dealer._adjust_score(card_value)
        self.dealer_score = self.dealer.get_score()
        self.over, self.win = self.dealer.check_dealer_score()
        print("DH1")

    def check_dealer_hit_values(self):
        if self.win == True:
            self.player._add_balance(self.wager)
            self.dealer.subtract_balance(self.wager)
            return self.state()
        else:
            #return self.handler()
            pass

    def stand(self):
        #self.dealer_score = self.dealer.get_score()
        #self.player_score = self.player.get_score()
        print("stand")
        while self.dealer_score <= 17:
            self.dealer_hit()
            print("DH1")
            self.check_dealer_hit_values()
            print("DH1")
            print(self.dealer_score)
        if self.dealer_score > 17:
            if self.dealer_score > self.player_score and self.dealer_score <= 21:
                self.win = False
                self.over = True
                self.dealer._add_balance(self.wager)
                self.player.subtract_balance(self.wager)
                return self.state()
            elif self.dealer_score <= self.player_score:
                self.win = True
                self.over = True
                self.player._add_balance(self.wager)
                self.dealer.subtract_balance(self.wager)
                return self.state()
            elif self.dealer_score == self.player_score:
                self.win = False
                self.tie = True
                self.over = True
                return self.state()

##########################
# Handle State and Comms #
##########################

    def state(self): # checks for end of game
        self.player.get_balance()
        if self.over == True or self.win == True:
            return self.handler()
        else:
            pass

    def handler(self):
        print(type(self.dealer_score))
        print(type(self.player_score))
        print(type(self.over))
        print(type(self.win))
        print(type(self.tie))
        print(type(self.player_card_img))
        print(type(self.dealer_card_img))
        dealer_score = self.dealer_score
        player_score = self.player_score
        over = self.over
        win = self.win
        tie = self.tie
        player_img = self.player_card_img
        balance = self.player.get_balance()
        if self.over == True or self.win == True:
            dealer_img = self.dealer_card_img[1:]
            return dealer_score, player_score, dealer_img, player_img, balance, over, win, tie 
        else:
            dealer_img = self.dealer_card_img[:-1]
            return dealer_score, player_score, dealer_img, player_img, balance, over, win, tie 