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

class Store(object):
    def __init__(self, productsArray, location, owner):
        self.products = productsArray
        self.location = location
        self.owner = owner

    def add_product(self, product):
        self.products.append(product)
        return self

    def remove_product(self, productName):
        for p in range(len(self.products)):
            if self.products[p].name == productName:
                self.products.pop(p)
                return self
        return self

    def inventory(self):
        for p in self.products:
            p.displayInfo()
        return self

p = Product(9.99, "shoe", "1lbs", "mike", 5.99)
b = Product(10.25, "pants", "100lbs", "test_brand", 1123.12)
p.addTax(.2).sell().returnProduct("defective")

s = Store([p,b], "Bellevue", "Alex")

s.add_product(Product(20.5, "jacket", "20lbs", "another_test_brand", 2))
print "first inventory"
s.inventory()
print "second inventory"
s.remove_product("shoe").inventory()
