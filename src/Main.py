from src.player import Player as Player
from src.state import State as State
import re

class Main():
 
    def __init__(self):
        self.player = Player(100)
        self.dealer = Player(10000)
        self.state = State() # Can be win, loss, continue, BlackJack, tie, etc.
        self.wager = 0

##########################
#     Start a Game       #
##########################

    # Reset dollar balances for new games or else this will persist
    # Balances should persist for new hand but not new games
    def reset_balances(self):
        self.player._set_balance(100)
        self.dealer._set_balance(10000)

    def reset_all(self):
        self.player._set_balance(100)
        self.dealer._set_balance(10000)
        self.wager = 0
        self.player.reset_players()
        self.dealer.reset_players()
        self.state._set_state("")

    def get_balance(self):
        return self.player.get_balance()

    #Reset values
    def new_hand(self):  
        self.player.reset_players()
        self.dealer.reset_players()
        self.state._set_state("continue")
        self.dealer.set_card_img_list("images/PaperCards/CardBack2.png")
        

    def deal_first_hand(self):
        self.player.hit() 
        self.player.hit()
        self.dealer.hit()
        self.dealer.hit()
        # Check if either hand has blackjack
        self.player_blackjack = self.player.check_blackjack()
        self.dealer_blackjack = self.dealer.check_blackjack()
        self.blackjack_state_check()
        return self.return_to_API()

    def set_wager(self, wager):
        if self.player.check_if_broke(wager):
            self.state._set_state("broke")
        else:
            self.state._set_state("continue") #Need this for the "continue with same wager" functionality
            self.player.set_wager(wager)
            self.dealer.set_wager(wager)
            self.wager = wager
        return self.state.get_state()

    def check_wager(self, wager):
        print(type(wager))
        if wager == 0:
            self.state._set_state("broke")
            return self.state.get_state()
        if bool(re.match('^[0-9]{1,100000}$', wager)):
            wager = int(wager)
            if isinstance(wager, int) and wager >= 1:
                return self.set_wager(wager)
        else:
            self.player.set_wager(0)
            self.state._set_state("invalid")
            return self.state.get_state()
  
#     hit and stand       

    def hitme(self):
        self.player.hit() 
        if self.player.check_bust():
            self.state._set_state("loss")
            self.adjust_balances()
        return self.return_to_API()

    def stand(self):
        self.player_score = self.player.get_score()
        self.dealer_score = self.dealer.get_score()
        while self.dealer_score <= 17 or self.dealer_score < self.player_score:
            self.dealer.hit()
            self.dealer_score = self.dealer.get_score()
        self.state_check()
        self.adjust_balances()
        return self.return_to_API()


# Handle State and Comms 

    def state_check(self): # check for hand results by comparing scores
        self.results = self.state.compare_scores(self.dealer_score, self.player_score)

    def blackjack_state_check(self): # check if blackjack was hit on first hand
        self.results = self.state.handle_blackjack(self.dealer_blackjack, self.player_blackjack)
        if self.results != "continue" and self.results != "tie":
            self.adjust_balances()
        else:
            pass

    def clear_blackjack_lists(self):
        # These lists can be cleared now, as we already used them to set our blackjack booleans.
        self.player.clear_hand()
        self.dealer.clear_hand()

    # Modify dollar balances based on outcome
    def adjust_balances(self):
        self.results = self.state.get_state()
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
        
    # pull the most up to date information on the game and send it API
    def return_to_API(self):
        dealer_score = self.dealer.get_score()
        player_score = self.player.get_score()
        results = self.state.get_state()
        balance = self.player.get_balance()
        dealer_img = self.dealer.get_card_img_list()
        player_img = self.player.get_card_img_list()

        if results in ["invalid", "broke"]:
            return dealer_score, player_score, dealer_img, player_img, balance, results
        elif results in ["win", "loss", "tie", "blackjack"]: 
            # "flip" dealer  hidden card
            del dealer_img[0]
            dealer_img[0], dealer_img[1] = dealer_img[1], dealer_img[0]
            return dealer_score, player_score, dealer_img, player_img, balance, results
        else:
            # keep dealer's card hidden
            dealer_img = dealer_img[:-1]
            return dealer_score, player_score, dealer_img, player_img, balance, results 
        
        
        