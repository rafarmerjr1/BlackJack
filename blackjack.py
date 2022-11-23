import app


game = app.app()

def play_game():

    game.new_hand()

    stop = False
    while stop == False:
        play_again = input("Want to try again? ")
        play_again = play_again.lower()
        if play_again != 'y' and play_again != 'yes':
            stop = True
        else:
            game.new_hand()  
    else:
        exit

play_game()