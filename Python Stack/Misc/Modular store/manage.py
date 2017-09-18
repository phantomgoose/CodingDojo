from store import Store
from product import Product

p = Product(9.99, "shoe", "1lbs", "mike", 5.99)
b = Product(10.25, "pants", "100lbs", "test_brand", 1123.12)
p.addTax(.2).sell().returnProduct("defective")

s = Store([Product(9.99, "shoe", "1lbs", "mike", 5.99),Product(10.25, "pants", "100lbs", "test_brand", 1123.12)], "Bellevue", "Alex")

s.add_product(Product(20.5, "jacket", "20lbs", "another_test_brand", 2))
print "first inventory"
s.inventory()
print "second inventory"
s.remove_product("shoe").inventory()
