from deck import deck
from player import player
from error_check import error_check  ## this is how you do it From FILE import CLASS

class app():
 
    def __init__(self):
        self.deck = deck()
        self.player = player(100)
        self.dealer = player(1000)
        #self.error_check = error_check()

    def new_hand(self):
        #Reset score if not first game
        self.player.set_score(0)
        self.dealer.set_score(0)
        self.stays = 0

        # Greeting
        print("Let's play Blackjack...")
        player_balance = self.player.get_balance()
        print("Your starting balance is {} dollars.".format(player_balance))
        self.get_wager()

    def get_wager(self):
        wager = input("How much would you like to bet? ")
        print("Ok, you bet: {}.  I will wager the same amount.".format(wager))
        

        self.wager = int(wager) # breaks if it gets a string
        error_check.check_wager(self.wager)
        self.player.set_wager(self.wager)
        self.dealer.set_wager(self.wager)
        if not self.player.broke():
            self.dealer_hit()
            print('\n Now I will draw a card for you.')
            self.lets_deal()
        else:
            print("Wait a minute... You're Broke! You can't play anymore")
            quit()

    def lets_deal(self):
        # Deal a card and adjust total score
        card_value = self.deck.get_hand()
        self.player.adjust_score(card_value)

        # Check for over 21 point limit 
        self.over = self.player.check_score()
        if not self.over:
            print("You currently have {} points. \n".format(self.player.get_score()))
            self.check_hit()
        if self.over:
            self.game_over = True
        else:
            pass

    def check_hit(self):  
        if self.deck.get_next_move():
            self.lets_deal() 
        else:
            self.stay()

    def hitme(self):
        self.stays = 0
        self.lets_deal() 

    def dealer_hit(self):
        self.game_over = False
        #Dealer draws a card
        print("I will now draw my card.\n")
        card_value = self.deck.get_hand()
        self.dealer.adjust_score(card_value)

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

    def stay(self):
        if self.stays < 2:
            pbalance = self.player.get_score()
            print("You will stay at {} points. ".format(pbalance))
            self.stays += 1
            #Dealer should hit
            self.dealer_hit()
            while self.game_over == False:
                self.check_hit()
        else:
            print("You have stayed too many times.  I will draw a card for you.\n")
            self.stays = 0
            self.lets_deal()