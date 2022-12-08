import random
#from src.card import Card as Card
import src.card as Card
class Deck():
    
    def __init__(self):
        self.Suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds']
        #self.Value_dict = {'Ace':11, '2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'Jack':10, 'Queen':10, 'King':10}
        
        self.Value_dict = {'Ace':11, '9':9, 'King':10}

        # Need to add Ace Handling later - 1 or 11
        
        self.starting_deck = []
        self.playing_deck = []

        for suit in self.Suits:
            for key, value in self.Value_dict.items():
                thisCard = Card.Card(key, suit, value)
                self.starting_deck.append(thisCard)

    def shuffle_deck(self):
        self.playing_deck = self.starting_deck.copy()
        random.shuffle(self.playing_deck)

    def deal_card(self):
        self.yourCard = self.playing_deck.pop()
        return self.yourCard, self.yourCard.get_image()

    def calc_card(self, yourcard):
        card_value = yourcard.value
        return card_value

    def get_card(self):
        #yourCard = ""
        self.shuffle_deck()
        yourCard, card_img = self.deal_card()
        return yourCard.key, self.calc_card(yourCard), card_img