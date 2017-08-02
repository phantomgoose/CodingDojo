class Product(object):
    def __init__(self, price, name, weight, brand, cost, status = "for sale"):
        self.price = price
        self.name = name
        self.weight = weight
        self.brand = brand
        self.cost = cost
        self.status = status

    def sell(self):
        self.status = "sold"
        return self

    def addTax(self, tax):
        self.price *= (1 + tax)
        return self

    def returnProduct(self, reason):
        if reason == "defective":
            self.status = "defective"
            self.price = 0
        elif reason == "in box, like new":
            self.status = "for sale"
        elif reason == "open box":
            self.status = "used"
            self.price *= .8
        return self

    def displayInfo(self):
        print("Price: ", self.price)
        print("Name: ", self.name)
        print("Weight: ", self.weight)
        print("Brand: ", self.brand)
        print("Cost: ", self.cost)
        print("Status: ", self.status)
        return self

    def __repr__(self):
        return "<Product object. Price: {}, name: {}, weight: {}, brand: {}, cost: {}, status: {}>".format(self.price, self.name, self.weight, self.brand, self.cost, self.status)

if __name__ == "__main__":

    p = Product(9.99, "shoe", "1lbs", "mike", 5.99)
    p.displayInfo()
