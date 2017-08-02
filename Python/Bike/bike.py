class Bike(object):
    def __init__(self, price, max_speed, miles = 0):
        self.price = price
        self.max_speed = max_speed
        self.miles = miles

    def displayInfo(self):
        print(self.price, self.max_speed, self.miles)

    def ride(self):
        print("Riding")
        self.miles += 10
        return self

    def reverse(self):
        if (self.miles < 5):
            print("No room to reverse!")
        else:
            print("Reversing")
            self.miles -= 5
        return self

    def __repr__(self):
        return "<Bike object. Price: {}, speed: {}, miles: {}".format(self.price, self.speed, self.miles)

if __name__ == "__main__":

    bike1 = Bike(200, "25mpg")
    bike2 = Bike(400, "30mpg")
    bike3 = Bike(1000, "40mpg")

    bike1.ride()
    bike1.ride()
    bike1.ride()
    bike1.reverse()
    bike1.displayInfo()

    bike2.ride()
    bike2.ride()
    bike2.reverse()
    bike2.reverse()
    bike2.displayInfo()

    bike3.reverse()
    bike3.reverse()
    bike3.reverse()
    bike3.displayInfo()
