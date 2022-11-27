from src.deck import deck as deck
from src.player import player as player
from src.error_check import error_check  as error_check## this is how you do it From FILE import CLASS

class dealer():
 
    def __init__(self):
        self.deck = deck()
        self.player = player(100)
        self.dealer = player(1000)
        #self.error_check = error_check()

    def new_hand(self):  #Reset score if not first game
        self.player.set_score(0)
        self.dealer.set_score(0)
        self.stays = 0

        # Greeting
        print("Let's play Blackjack...")
        player_balance = self.player.get_balance()
        #print("Your starting balance is {} dollars.".format(player_balance))
        data = "Your starting balance is {} dollars. How much would you like to bet?".format(player_balance)
        return data
        #self.get_wager()

    def handler(self):
            dealer_score = self.dealer_score
            player_score = self.player_score
            player_card = self.player_card 
            dealer_card = self.dealer_card
            over = self.over
            dealer_img = self.dealer_card_img
            player_img = self.player_card_img
            print(type(dealer_score))
            print(type(player_score))
            print(type(dealer_card))
            print(type(player_card))
            print(type(dealer_img))
            print(type(player_img))
            return dealer_score, player_score, dealer_card, player_card, dealer_img, player_img 

    def get_wager(self,wager):
        self.wager = int(wager) # breaks if it gets a string, needs error handling
        error_check.check_wager(self.wager)
        self.player.set_wager(self.wager)
        self.dealer.set_wager(self.wager)
        if self.player.not_broke():
            return self.lets_deal() 
        else:
            print("Wait a minute... You don't have enough money! Get out!!!\n")
            quit()

    def lets_deal(self):
        # Deal a card and adjust total score
        card_value, self.player_card, self.player_card_img = self.deck.get_hand()
        print(type(card_value))
        self.player.adjust_score(card_value)
        self.player_score = self.player.get_score()
        # Check for over 21 point limit 
        self.over = self.player.check_score()  #returns True is over limit
        self.dealer_hit()
        return self.handler()

    def hitme(self):
        self.stays = 0
        return self.lets_deal() 

    def dealer_hit(self):
        #self.game_over = False
        #Dealer draws a card
        print("I will now draw my card.\n")
        card_value, self.dealer_card, self.dealer_card_img = self.deck.get_hand()
        print(type(card_value))
        self.dealer.adjust_score(card_value)
        self.dealer_score = self.dealer.get_score()

        # Check for limit 
        self.over = self.dealer.check_dealer_score()
        if not self.over:
            print("I currently have {} points. ".format(self.dealer.get_score()))
        if self.over:
            self.player.add_balance(self.wager)
            print("Your balance is now {} dollars.\n".format(self.player.get_balance()))
            self.game_over = True
        else:
            pass

    def stand(self):
        if self.stays < 2:
            pbalance = self.player.get_score()
            print("You will stay at {} points. ".format(pbalance))
            self.stays += 1
            #Dealer should hit
            self.dealer_hit()
            return self.handler()
            while self.game_over == False:
                self.check_hit()
        else:
            print("You have stayed too many times.  I will draw a card for you.\n")
            self.stays = 0
            self.lets_deal()