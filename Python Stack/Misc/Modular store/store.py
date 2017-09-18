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

if __name__ == "__main__":
    s = Store([], "Bellevue", "Alex")
    s.inventory()
