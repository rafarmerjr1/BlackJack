#from src.player import player as player

class State():

    def __init__(self):
        self.game_state = "continue"
        # Compare scores and return win, loss, continue

        # Handle revealing dealer card from list

    def compare_scores(self, dealer_score, player_score):
        self.dealer_score = dealer_score
        self.player_score = player_score
        if self.dealer_score >= 22:
            self.game_state = "win"
        elif self.dealer_score > self.player_score and self.dealer_score <= 21:
            self.game_state = "loss"
        elif self.dealer_score < self.player_score:
            self.game_state = "win" 
        elif self.dealer_score == self.player_score:
            self.game_state = "tie"
        return self.game_state   

    def handle_blackjack(self, dealer_blackjack, player_blackjack):
        if dealer_blackjack == False and player_blackjack == False:
            self._set_state("continue")
            return self.game_state
        elif dealer_blackjack == True and player_blackjack == True:
            self._set_state("tie")
            return self.game_state
        elif player_blackjack == True and dealer_blackjack == False:
            self._set_state("blackjack")
            return self.game_state
        elif dealer_blackjack == True and player_blackjack == False:
            self._set_state("loss")
            return self.game_state
        

    def get_state(self):
        return self.game_state

    def _set_state(self,state):
        self.game_state = state

        