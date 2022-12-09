class Card():
    
    def __init__(self, key, suit, value):
        self.key = key
        self.value = value 
        self.suit = suit

    def get_image(self):
        # for f in $(find ./ -iname "*Dmnds*"); do mv "$f" "$(echo "$f" | sed s/Dmnds/Diamonds/)"; done
        if len(self.key) <=2:
            filename = self.suit + "/" + self.key + "of" + self.suit + ".png"
        else:
            filename = self.suit + "/" + self.key[0] + "of" + self.suit + ".png"
        full_path = "images/PaperCards/"+filename
        return full_path

