from src.deck import Deck as Deck

class Player():

    def __init__(self, balance):
        self.deck = Deck()
        self.balance = balance
        self.score = 0
        self.hand = []
        self.card_img_list = []
        self.card_values = []
    
    # Clear everything
    def reset_players(self):
        self.wager = 0
        self.score = 0
        self.hand = []
        self.card_img_list = []
        self.card_values = []

# Scores 

    def _set_score(self, score):
        self.score = int(score)

    def get_score(self):
        return self.score

    # Need to recount each time we add a card since Ace can be 1 or 11
    def calc_score(self):
        self.score = sum(i for i in self.card_values)
        while any (i == 1 for i in self.card_values) and self.score <= 11: # Ace Handling - 1 or 11
            self.score += 10

    def clear_card_values(self):
        self.card_values.clear()
                
# Finances

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

    def check_if_broke(self, wager):
        if self.balance <= 0 or self.balance < wager:
            return True
        else:
            return False

 # Hand 
    
    def get_hand(self):
        return self.hand  # need to also reset this at the end of the game

    def clear_hand(self):
        self.hand.clear()

    # Assess first deal for Blackjack 
    def check_blackjack(self):
        if "Ace" in self.hand[0:2] and self.score == 21: 
            return True
        else:
            return False

    # Check if player busts
    def check_bust(self):
        if self.score >= 22:
            return True
        else:
            return False

# Manage player card images 

    def set_card_img_list(self,img):
        self.card_img_list.append(img)

    def get_card_img_list(self):
        return self.card_img_list

    def clear_card_img_list(self):
        self.card_img_list.clear()

# Actions 

    def hit(self):
        # Deal a card and adjust total score
        card, card_value, card_img = self.deck.get_card()  # Get card value and image file
        self.set_card_img_list(card_img)        # Add image to list
        self.hand.append(card)                  # List of card values
        self.card_values.append(card_value)     # Add card value to list
        self.calc_score()
        
        

        

