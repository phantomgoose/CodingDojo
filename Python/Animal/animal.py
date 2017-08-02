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

    def __repr__(self):
        return "<Animal object. Name: {}, health: {}>".format(self.name, self.health)

class Dog(Animal):
    def __init__(self):
        self.name = "Doggo"
        self.health = 150

    def pet(self):
        self.health += 5
        return self

    def __repr__(self):
        return "<Dog object. Name: {}, health: {}>".format(self.name, self.health)


class Dragon(Animal):
    def __init__(self):
        self.health = 170

    def fly(self):
        self.health -= 10
        return self

    def displayHealth(self):
        super(Dragon, self).displayHealth()
        print("I am a Dragon")

    def __repr__(self):
        return "<Dragon object. Name: {}, health: {}>".format(self.name, self.health)

if __name__ == "__main__":

    a = Animal("nessy", 100)
    a.walk().walk().walk().run().run().displayHealth()
    d = Dog()
    print d.name
    d.walk().walk().walk().run().run().pet().displayHealth()
    dr = Dragon()
    dr.fly().displayHealth()
