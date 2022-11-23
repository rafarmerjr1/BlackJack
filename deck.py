#from card import *
import random

class card():
    
    def __init__(self, key, suit, value):
        self.key = key
        self.value = value 
        self.suit = suit

class deck():
    
    def __init__(self):
        self.Suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds']
        self.Value_dict = {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'Jack':10, 'Queen':10, 'King':10}
        # Need to add Aces later - 1 or 11
        #score = 0
        self.starting_deck = []
        self.playing_deck = []

        self.dealer_starting_balance = 1000
        for suit in self.Suits:
            for key, value in self.Value_dict.items():
                thisCard = card(key, suit, value)
                self.starting_deck.append(thisCard)

    def shuffle_deck(self):
        self.playing_deck = self.starting_deck.copy()
        random.shuffle(self.playing_deck)

    def deal_card(self):
        self.yourCard = self.playing_deck.pop()
        print(f"This card is {self.yourCard.key} of {self.yourCard.suit}.")
        return self.yourCard

    def calc_card(self, yourcard):
        card_value = yourcard.value
        return card_value

    def get_next_move(self):
        next_move = input("Do you want to hit or stay? ")
        next_move = next_move.lower()
        if next_move == 'hit':
            return True
        elif next_move == 'stay':
            return False
        else:
            print("Error. Exiting")
            exit
        

    def get_hand(self):
        self.shuffle_deck()
        yourCard = self.deal_card()        
        return self.calc_card(yourCard)