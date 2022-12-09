from src.player import Player as Player
from src.state import State as State
import re

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

    def reset_all(self):
        self.player._set_balance(100)
        self.dealer._set_balance(10000)
        self.wager = 0
        self.player.reset_players()
        self.dealer.reset_players()
        self.state._set_state("")

    def get_balance(self):
        return self.player.get_balance()

    #Reset Class values in case this is not the first hand, otherwise values will carry into next hand
    # Returns balance so player can place bet
    def new_hand(self):  
        self.player.reset_players()
        self.dealer.reset_players()
        self.state._set_state("continue")
        self.dealer.set_card_img_list("images/PaperCards/CardBack2.png")
        #self.player_balance = self.player.get_balance()
        #return self.player_balance

    def deal_first_hand(self):

        if self.player.not_broke():
            self.player.hit() 
            self.player.hit()
            self.dealer.hit()
            self.dealer.hit()

            # Check if either hand has blackjack
            self.player_blackjack = self.player.check_blackjack()
            self.dealer_blackjack = self.dealer.check_blackjack()
            self.blackjack_state_check()
            return self.return_to_API()
        else:
            return self.return_to_API()

    def set_wager(self, wager):
        if self.player.check_if_broke(wager):
            self.state._set_state("broke")
            return self.return_to_API()
        else:
            self.state._set_state("continue") #Need this for the "continue with same wager" functionality
            self.player.set_wager(wager)
            self.dealer.set_wager(wager)
            self.wager = wager
            return self.return_to_API()

    def check_wager(self, wager):
    #    # check if negative, float, or string
        if bool(re.match('^[0-9]{1,100000}$', wager)):
            wager = int(wager)
            if isinstance(wager, int) and wager > 0:
                return self.set_wager(wager)
        else:
            self.player.set_wager(0)
            self.state._set_state("invalid")
            return self.return_to_API()
  
    
##########################
#     hit and stand       #
##########################

    def hitme(self):
        self.player.hit() 
        if self.player.check_bust():
            self.state._set_state("loss")
            #self.state_check()
            self.adjust_balances()
            #return self.return_to_API()
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

    # Maybe break the stand function up so that it returns one card at a time, and will return a status that tells React to request another card? If the request is received after the results are in, a new status is sent that indicates to react that it is time to load results.  Need to find some way to keep loading the cards on at a time even when the user has won or lost.  Otherwise its way too jarring when the application transitions.  

    # Or maybe just a way that react only loads the last image in the list with the animation.  Can an if loop be placed in the map?
    
    # Could try setting a counter that increases the delay time for CSS animation, and then just have a single element render that says "you win" or "you lose" in place of some element in the GameUI.  

##########################
# Handle State and Comms #
##########################

    def state_check(self): # checks for end of game
        self.results = self.state.compare_scores(self.dealer_score, self.player_score)

    def blackjack_state_check(self): # check if blackjack was hit on first hand
        self.results = self.state.handle_blackjack(self.dealer_blackjack, self.player_blackjack)
        if self.results != "continue" and self.results != "tie":
            self.adjust_balances()
            #return self.return_to_API()
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

        
    
        # Decide to show dealer's hidden card or not
        if results == "blackjack":
            del dealer_img[0]
            dealer_img[0], dealer_img[1] = dealer_img[1], dealer_img[0]
            return dealer_score, player_score, dealer_img, player_img, balance, results
        elif results == "invalid":
             return dealer_score, player_score, dealer_img, player_img, balance, results
        elif results == "broke":
             return dealer_score, player_score, dealer_img, player_img, balance, results
        elif results == "win" or results == "loss":
            del dealer_img[0]
            dealer_img[0], dealer_img[1] = dealer_img[1], dealer_img[0]
            return dealer_score, player_score, dealer_img, player_img, balance, results
        else:
            dealer_img = dealer_img[:-1]
            return dealer_score, player_score, dealer_img, player_img, balance, results 
        
        
        