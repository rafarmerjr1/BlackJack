class player():

    def __init__(self, balance):
        self.balance = balance
        self.score = 0
    
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

 # Check Scores and Balance ------------------------------------------------------

    def check_score(self):
        if self.score == 21:
            self._add_balance(self.wager)
            over = True
            win = True
        elif self.score >= 22:
            self.subtract_balance(self.wager)
            over = True
            win = False
        else: 
            over = False
            win = False
        return over, win

    def check_dealer_score(self):
        if self.score == 21:
            self._add_balance(self.wager)
            over = True
            win = False
        elif self.score >= 22:
            self.subtract_balance(self.wager)
            over = True
            win = True
        else: 
            over = False
            win = False
        return over, win



    
        