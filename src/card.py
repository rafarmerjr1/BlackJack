class Card():
    
    def __init__(self, key, suit, value):
        self.key = key
        self.value = value 
        self.suit = suit

    def get_image(self):
        filename = self.key + '_of_' + self.suit +'.png'
        filename = filename.lower()
        print(filename)
        full_path = "images/PNG-cards-1.3/"+filename
        return full_path
