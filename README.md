# BlackJack

Next items to do:
- implement error handling logic
- add Ace handling logic
- check player balance at each wager
- input checking

After application is done, create two ways of hosting - docker and AWS:
- Write terraform or Python IaC
- Set up Dockerfiles

Gameplay:
- Player has two cards, both visible.
- Dealer has two cards, one visible, on hidden
- Player makes a bet.
- Both hands are checked for "blackjack" (an Ace with any 10 point card) - if present, hand is over
- Player can hit (as many times as they want until bust)or stay
    if bust, player loses.  
- if Stay, the dealer can hit or stay
    - if hand >= 17 stay, else hit
    - if bust, player wins
- after dealer stays, totals are compared
- if tie, game restarts
- 
