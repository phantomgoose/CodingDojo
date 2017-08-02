class Underscore(object):
    def map(self, li, iteratee):
        for i in range(len(li)):
            li[i] = iteratee(li[i])
        return li

    def reduce(self, li, iteratee, memo=None):
        if memo != None:
            for val in li:
                memo = iteratee(memo, val)
        else:
            memo = li[0]
            if len(li) > 1:
                for i in range(1, len(li)):
                    memo = iteratee(memo, li[i])
        return memo

    def find(self, li, predicate):
        for val in li:
            if predicate(val):
                return val
        return None

    def filter(self, li, predicate):
        res = []
        for val in li:
            if predicate(val):
                res.append(val)
        return res

    def reject(self, li, predicate):
        res = []
        for val in li:
            if not predicate(val):
                res.append(val)
        return res

print Underscore().map([1,2], lambda x: x*6)
print Underscore().reduce([-1, 2, 3], lambda memo, num: memo * num, 0)
print Underscore().reduce([-1, 2, 3], lambda memo, num: memo * num)
print Underscore().find([1, 2, 3, 4, 5, 6], lambda num: num % 2 == 0)
print Underscore().filter([1, 2, 3, 4, 5, 6], lambda x: x % 2 == 0)
print Underscore().reject([1, 2, 3, 4, 5, 6], lambda x: x % 2 == 0)
