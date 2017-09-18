import random
import math

class Car(object):
    def __init__(self, price, speed, fuel, mileage):
        self.price = price
        self.speed = speed
        self.fuel = fuel
        self.mileage = mileage
        self.tax = .12 if price < 10000 else .15
        self.verboseFuel = self.fuelLevel()
        self.display_all()

    def display_all(self):
        print("Price:", self.price, "Speed:", self.speed, "Fuel level:", self.verboseFuel, "Mileage:", self.mileage, "Tax:", self.tax)

    def fuelLevel(self):
        if self.fuel == 0:
            return "Empty"
        elif self.fuel < 6:
            return "Almost empty"
        elif self.fuel < 10:
            return "Kind of full"
        elif self.fuel <= 12:
            return "Full"
        else:
            return "Invalid fuel amount"

    def __repr__(self):
        return "<Car object. Price: {}, speed: {}, fuel: {}, mileage: {}>".format(self.price, self.speed, self.fuel, self.mileage)

if __name__ == "__main__":

    def randomize(a, b):
        return int(math.floor(random.random()*(b-a+1)))+a

    cars = []
    for i in range(6):
        cars.append(Car(randomize(5000,15000), randomize(50,100), randomize(0,12), randomize(0, 250000)))
