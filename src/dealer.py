from src.deck import deck as deck
from src.player import player as player

class dealer():
 
    def __init__(self):
        self.deck = deck()
        self.player = player(100)
        self.dealer = player(1000)
        self.over = False
        self.win = False
        self.next = True
        self.player._set_score(0)
        self.dealer._set_score(0)

##########################
#     Start a Game       #
##########################

    def new_hand(self):  
        #Reset values if not first game
        self.player._set_balance(100)
        self.dealer._set_balance(1000)
        self.player.set_wager(0)
        self.player.set_wager(0)
        
        # Start Game
        print("Let's play Blackjack...")
        player_balance = self.player.get_balance()
        return player_balance

    def get_wager(self):
        self.player._set_score(0)
        self.dealer._set_score(0)
        self.next = True
        #self.wager = int(wager) # breaks if it gets a string, needs error handling
        #self.player.set_wager(self.wager)
        #self.dealer.set_wager(self.wager)
        
        if self.player.not_broke():
            return self.lets_deal() 
        else:
            self.over = True
            return self.state()

    def set_wager(self, wager):
        self.wager = int(wager) # breaks if it gets a string, needs error handling
        self.player.set_wager(self.wager)
        self.dealer.set_wager(self.wager)
        
    def lets_deal(self):
        # Deal a card and adjust total score
        card_value, self.player_card, self.player_card_img = self.deck.get_hand()
        self.player._adjust_score(card_value)
        self.player_score = self.player.get_score()
        self.over, self.win = self.player.check_score()
        if self.win == True:
            self.player._add_balance(self.wager)
            self.dealer.subtract_balance(self.wager)
            return self.state()
        if self.player_score > 21 or self.player_score == 21:
            return self.state()  
        else:
            return self.dealer_hit()

##########################
#     hit or stand       #
##########################

    def hitme(self):
        self.stays = 0
        return self.lets_deal() 

    def dealer_hit(self):
        #Dealer draws a card
        card_value, self.dealer_card, self.dealer_card_img = self.deck.get_hand()
        self.dealer._adjust_score(card_value)
        self.dealer_score = self.dealer.get_score()
        self.over, self.win = self.dealer.check_dealer_score()
        if self.win == True:
            self.player._add_balance(self.wager)
            self.dealer.subtract_balance(self.wager)
            return self.state()
        else:
            return self.handler()

    def stand(self):
        # Can only stand once per game, then final scores are compared
        self.dealer_hit()
        self.over = True
        if self.dealer_score > self.player_score and self.dealer_score <= 21:
            self.win = False
            self.dealer._add_balance(self.wager)
            self.player.subtract_balance(self.wager)
        if self.dealer_score <= self.player_score:
            self.win = True
            self.player._add_balance(self.wager)
            self.dealer.subtract_balance(self.wager)
        return self.state()

##########################
# Handle State and Comms #
##########################

    def state(self):
        self.player.get_balance()
        if self.over == True or self.win == True:
            self.next = False
            return self.handler()
        else:
            self.next = True
            pass

    def handler(self):
           dealer_score = self.dealer_score
           player_score = self.player_score
           player_card = self.player_card 
           dealer_card = self.dealer_card
           over = self.over
           win = self.win
           next = self.next
           dealer_img = self.dealer_card_img
           player_img = self.player_card_img
           balance = self.player.get_balance()
           return dealer_score, player_score, dealer_card, player_card, dealer_img, player_img, balance, over, win, next 