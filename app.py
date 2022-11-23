import deck
import player
import error_check

class app():
 
    def __init__(self):
        self.deck = deck.deck()
        #self.dealer = dealer.dealer(1000)
        self.player = player.player(100)
        self.dealer = player.player(1000)

    def new_hand(self):
        #Reset score if not first game
        self.player.set_score(0)
        self.dealer.set_score(0)
        # Greeting
        print("Let's play Blackjack...")
        player_balance = self.player.get_balance()
        print("Your starting balance is {} dollars.".format(player_balance))
        self.get_wager()

    def get_wager(self):
        wager = input("How much would you like to bet? ")
        print("Ok, you bet: {}.  I will wager the same amount.".format(wager))
        self.wager = int(wager)
        self.player.set_wager(self.wager)
        self.dealer.set_wager(self.wager)
        if not self.player.broke():
            self.dealer_hit()
            print('\n Now I will draw a card for you.')
            self.lets_deal()
        else:
            print("Wait a minute... You're Broke! You can't play anymore")
            exit

    def lets_deal(self):
        # Deal a card and adjust total score
        card_value = self.deck.get_hand()
        self.player.adjust_score(card_value)

        # Check for limit 
        self.over = self.player.check_score()
        if not self.over:
            print("You currently have {} points. ".format(self.player.get_score()))
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
        self.lets_deal() 

    def dealer_hit(self):
        self.game_over = False
        #Dealer draws a card
        print("I will now draw my card.")
        card_value = self.deck.get_hand()
        self.dealer.adjust_score(card_value)

        # Check for limit 
        self.over = self.dealer.check_dealer_score()
        if not self.over:
            print("I currently have {} points. ".format(self.dealer.get_score()))
        if self.over:
            self.player.add_balance(self.wager)
            print("Your balance is now {} dollars.".format(self.player.get_balance()))
            self.game_over = True
        else:
            pass

    def stay(self):
        pbalance = self.player.get_score()
        print("You will stay at {} points. ".format(pbalance))

        #Dealer should hit
        self.dealer_hit()
        while self.game_over == False:
            self.check_hit()
