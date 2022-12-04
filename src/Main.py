from src.player import Player as Player
from src.state import State as State

class Main():
 
    def __init__(self):
        self.player = Player(100)
        self.dealer = Player(10000)
        self.state = State() # Can be win, loss, continue, BlackJack, tie
        self.wager = 0

##########################
#     Start a Game       #
##########################

    # Reset dollar balances for new games or else this will persist
    # We want dollars balances to persist for new HANDS but not new GAMES
    def reset_balances(self):
        self.player._set_balance(100)
        self.dealer._set_balance(10000)
        
    #Reset Class values in case this is not the first hand, otherwise values will carry into next hand
    # Returns balance so player can place bet
    def new_hand(self):  
        self.player.set_wager(0)
        self.dealer.set_wager(0)
        self.state._set_state("continue")
        self.player._set_score(0)
        self.dealer._set_score(0)
        self.player.clear_card_img_list()
        self.dealer.clear_card_img_list()
        self.dealer.set_card_img_list("images/PNG-cards-1.3/card_back.png")
        self.player_balance = self.player.get_balance()
        return self.player_balance

    def deal_first_hand(self):
        if self.player.not_broke():
            self.player.hit() 
            self.player.hit()
            self.player_blackjack = self.player.check_blackjack()
            self.dealer.hit()
            self.dealer.hit()
            self.dealer_blackjack = self.dealer.check_blackjack()

            # These lists can be cleared now, as we already used them to set our blackjack booleans.
            self.player.clear_hand()
            self.dealer.clear_hand()
            self.blackjack_state_check()
            return self.return_to_API()
        else:
            return self.return_to_API()

    def set_wager(self, wager):
        print("hi")
        wager = int(wager) # breaks if it gets a string, needs error handling
        self.player.set_wager(wager)
        self.dealer.set_wager(wager)
        self.wager = wager
        return self.return_to_API()
        
    
##########################
#     hit and stand       #
##########################

    #def player_hit(self):
    #    # Deal a card and adjust total score
    #    card, card_value, player_card_img = self.deck.get_card()  # Get card value and image file
    #    self.player_card_img.append(player_card_img)        # Add image to list
    #    self.player._adjust_score(card_value)               # Add card value to store
    #    self.player.hand.append(card)                       # List of card values
    #    self.player_score = self.player.get_score()         # get new player score
#
    #def dealer_hit(self):
    #    #Dealer draws a card
    #    card, card_value, dealer_card_img = self.deck.get_card()
    #    self.dealer_card_img.append(dealer_card_img)
    #    self.dealer._adjust_score(card_value)
    #    self.dealer.hand.append(card)
    #    self.dealer_score = self.dealer.get_score()

    def hitme(self):
        self.player.hit() 
        if self.player.check_bust():
            self.results = "loss"
            self.adjust_balances()
            #return self.return_to_API()
        return self.return_to_API()

    def stand(self):
        self.player_score = self.player.get_score()
        self.dealer_score = self.dealer.get_score()
        while self.dealer_score <= 17 and self.dealer_score < self.player_score:
            self.dealer.hit()
            self.dealer_score = self.dealer.get_score()
        self.state_check()
        self.adjust_balances()
        return self.return_to_API()

##########################
# Handle State and Comms #
##########################

    def state_check(self): # checks for end of game
        self.results = self.state.compare_scores(self.dealer_score, self.player_score)

    def blackjack_state_check(self):
        self.results = self.state.handle_blackjack(self.dealer_blackjack, self.player_blackjack)
        if self.results != "continue" and self.results != "tie":
            self.adjust_balances()
            return self.return_to_API()
        else:
            pass

    def adjust_balances(self):
        if self.results == "win":
            self.player._add_balance(self.wager)
            self.dealer.subtract_balance(self.wager)
        elif self.results == "loss":
            self.dealer._add_balance(self.wager)
            self.player.subtract_balance(self.wager)
        elif self.results == "blackjack":
            wager = (self.wager * 2)
            self.player._add_balance(wager)
            self.dealer.subtract_balance(wager)
        elif self.results == "continue" or self.results == "tie":
            pass
        

    def return_to_API(self):
        dealer_score = self.dealer.get_score()
        player_score = self.player.get_score()
        player_img = self.player.get_card_img_list()
        dealer_img = self.dealer.get_card_img_list()
        results = self.state.get_state()
        balance = self.player.get_balance()
        dealer_img = self.dealer.get_card_img_list()
        player_img = self.player.get_card_img_list()
        if self.results != "continue":
            dealer_img = dealer_img[1:]
            print(type(dealer_score))
            print(type(player_score))
            print(type(results))
            print(type(player_img))
            print(type(dealer_img))
            return dealer_score, player_score, dealer_img, player_img, balance, results 
        else:
            print("api")
            dealer_img = dealer_img[:-1]
            print(type(dealer_score))
            print(type(player_score))
            print((results))
            print(type(player_img))
            print(type(dealer_img))
            return dealer_score, player_score, dealer_img, player_img, balance, results 