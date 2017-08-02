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

    def listInventory(self):
        res = "["
        for p in self.products:
            res += p.name + " "
        return res + "]"

    def __repr__(self):
        return "<Store object. Products: {}, location: {}, owner: {}>".format(self.listInventory(), self.location, self.owner)

if __name__ == "__main__":
    s = Store([], "Bellevue", "Alex")
    print s
