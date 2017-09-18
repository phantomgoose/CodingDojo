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
        print "Price: ", self.price
        print "Name: ", self.name
        print "Weight: ", self.weight
        print "Brand: ", self.brand
        print "Cost: ", self.cost
        print "Status: ", self.status
        return self

if __name__ == "__main__":
    p = Product(9.99, "shoe", "1lbs", "mike", 5.99)
    b = Product(10.25, "pants", "100lbs", "test_brand", 1123.12)
    p.addTax(.2).sell().returnProduct("defective").displayInfo()
