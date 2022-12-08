from src.deck import Deck as Deck
#from src.Main import Main as Main

class Player():

    def __init__(self, balance):
        self.deck = Deck()
        self.balance = balance
        self.score = 0
        self.hand = []
        self.card_img_list = []
    
# Scores ---------------------------------------------------------

    def _set_score(self, score):
        self.score = int(score)

    def get_score(self):
        return self.score

    def _adjust_score(self, cardVal):
        cardVal =int(cardVal)
        new_score = cardVal + self.score
        self._set_score(new_score)

# Finances----------------------------------------------------------

    def set_wager(self,wager):
        self.wager = wager

    def _set_balance(self, new_balance):
        self.balance = new_balance

    def get_balance(self):
        return self.balance

    def subtract_balance(self, wager):
        adjusted_balance = self.balance - wager
        self._set_balance(adjusted_balance)
        return adjusted_balance

    def _add_balance(self,wager):
        adjusted_balance = self.balance + wager
        self._set_balance(adjusted_balance)
        return adjusted_balance

    def not_broke(self):
        if self.balance <= 0 or self.wager > self.balance or self.wager < 0:
            return False
        else:
            return True

 # Hand --------------------------------------------------------------------
    # Only used for first hand, as both players need to be assessed for a Blackjack 
    # (A combination of an Ace and another other 10 point card)

    def get_hand(self):
        return self.hand  # need to also reset this at the end of the game

    def clear_hand(self):
        self.hand.clear()

    def check_blackjack(self):
        #for i in self.hand:
         #   print(i)
        if "Ace" in self.hand and self.score == "11":  # change this to 21 later once Ace handling is done
            self.clear_hand()
            return True
        else:
            self.clear_hand()
            return False

# Manage player card images --------------------------------------------------

    def set_card_img_list(self,img):
        self.card_img_list.append(img)

    def get_card_img_list(self):
        return self.card_img_list

    def clear_card_img_list(self):
        self.card_img_list.clear()

# Actions ----------------------------------------------------------------------

    def hit(self):
        # Deal a card and adjust total score
        card, card_value, card_img = self.deck.get_card()  # Get card value and image file
        self.set_card_img_list(card_img)        # Add image to list
        self._adjust_score(card_value)               # Add card value to store
        self.hand.append(card)                       # List of card values

        
# Check for bust, return true if >=21 else false:
    def check_bust(self):
        if self.score >= 22:
            return True
        else:
            return False

    def check_if_broke(self):
        print("check_if_broke")
        if self.balance <= 0 or self.balance < self.wager:
            return True
        else:
            return False