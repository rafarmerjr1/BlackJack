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

    

    #def get_image2(self):
    #    filename = self.key + '_of_' + self.suit +'.png'
    #    filename = filename.lower()
    #    print(filename)
    #    full_path = "images/PNG-cards-1.3/"+filename
    #    return full_path

    #def get_image3(self):
    #    # for f in $(find ./ -iname "*-1.png*"); do mv "$f" "$(echo "$f" | sed s/-1.png/-ace.png/)"; done
    #    filename = "card-" + self.suit + "-" + self.key + ".png"
    #    filename = filename.lower()
    #    print(filename)
    #    full_path = "images/PixelCards/"+filename
    #    return full_path
