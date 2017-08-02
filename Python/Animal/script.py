class Animal(object):
    def __init__(self, name, health):
        self.name = name
        self.health = health

    def walk(self):
        self.health -= 1
        return self

    def run(self):
        self.health -= 5
        return self

    def displayHealth(self):
        print self.health

a = Animal("nessy", 100)
a.walk().walk().walk().run().run().displayHealth()

class Dog(Animal):
    def __init__(self):
        self.health = 150

    def pet(self):
        self.health += 5
        return self

d = Dog()
d.walk().walk().walk().run().run().pet().displayHealth()

class Dragon(Animal):
    def __init__(self):
        self.health = 170

    def fly(self):
        self.health -= 10
        return self

    def displayHealth(self):
        super(Dragon, self).displayHealth()
        print("I am a Dragon")

dr = Dragon()
dr.fly().displayHealth()
