
class error_check():

    def check_wager(wager):  #is it okay to leave out self? Static Method?
        if type(wager) == int:
            if wager <= 0:
                print("Wait... \nWhat kind of tricks are you trying to pull?? Get out!")
                quit()
        else:
            print("wait... \nWhat kind of tricks are you trying to pull?? Get out!")
            quit()

    
