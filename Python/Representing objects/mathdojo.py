class MathDojo(object):
    def __init__(self, starting_result = 0):
        self.result = starting_result

    #assumes we pass a number or a list or tuple of numbers
    def add(self, *num):
        for n in num:
            #checks for list or tuple
            if (type(n) in (list, tuple)):
                for i in n:
                    self.result += i
            else:
                self.result += n
        return self

    #assumes we pass a number or a list or tuple of numbers
    def subtract(self, *num):
        for n in num:
            #checks for list or tuple
            if (type(n) in (list, tuple)):
                for i in n:
                    self.result -= i
            else:
                self.result -= n
        return self

    def __repr__(self):
        return "<MathDojo object. Result: {}>".format(self.result)

if __name__ == "__main__":

    md = MathDojo()
    md.add([1],3,4).add([3, 5, 7, 8], [2, 4.3, 1.25]).subtract(2, [2,3], [1.1, 2.3]).result
    print(md.result)
