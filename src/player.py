
class player():

    def __init__(self,balance):
        self.balance = balance
        self.score = 0

    def set_wager(self,wager):
        self.wager = wager

    def set_score(self, score):
        self.score = int(score)

    def get_score(self):
        return self.score

    def adjust_score(self, cardVal):
        cardVal =int(cardVal)
        new_score = cardVal + self.score
        self.set_score(new_score)

    # Finances
    def set_balance(self, new_balance):
        self.balance = new_balance

    def get_balance(self):
        return self.balance

    def subtract_balance(self, wager):
        adjusted_balance = self.balance - wager
        self.set_balance(adjusted_balance)
        return adjusted_balance

    def add_balance(self,wager):
        adjusted_balance = self.balance + wager
        self.set_balance(adjusted_balance)
        return adjusted_balance


    # Check Scores and Balance
    def check_score(self):
        if self.score == 21:
            print("21 Points! You win!")
            self.add_balance(self.wager)
            adjusted_balance = self.get_balance()
            print("Your balance is now {} dollars".format(adjusted_balance))
            over = True
        elif self.score >= 22:
            print("\nSorry - you lose. You were over 21 points.")
            print("You had {} points.".format(self.score))
            self.subtract_balance(self.wager)
            adjusted_balance = self.get_balance()
            print("Your balance is now {} dollars".format(adjusted_balance))
            over = True
        else:
            over = False
        return over

    def check_dealer_score(self):
        if self.score >= 22:
            print("I currently have {} points. ".format(self.get_score()))
            print("\nYou won! I lost. Adding your winnings to your balance.")
            self.subtract_balance(self.wager)
            adjusted_balance = self.get_balance()
            print("My balance is now {} dollars".format(adjusted_balance))
            over = True
        else:
            over = False
        return over

    def not_broke(self):
        if self.balance <= 0 or self.wager > self.balance or self.wager < 0:
            return False
        else:
            return True
