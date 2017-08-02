#practicing with class/objects and sorting in python
class Call(object):
    def __init__(self, call_id, name, number, time, reason):
        self.call_id = call_id
        self.name = name
        self.number = number
        self.time = time
        self.reason = reason

    def display(self):
        print "Call id:", self.call_id, "; Caller's name:", self.name, "; Caller's number", self.number, "; Time of call:", self.time, "; Reason for call:", self.reason

class CallCenter(object):
    def __init__(self, call_list):
        self.calls = call_list
        self.queue = len(self.calls)

    def add(self, new_call):
        self.calls.append(new_call)
        self.queue += 1
        return self

    def remove(self):
        self.calls.pop(0)
        self.queue -= 1
        return self

    def info(self):
        for c in self.calls:
            print "Caller's name", c.name, "; Caller's phone number:", c.number, "; Total queue size:", self.queue
        return self

    def findRemove(self, phone_number):
        for i in range(len(self.calls)):
            if self.calls[i].number == phone_number:
                self.calls.pop(i)
        return self

    def sortCalls(self):
        def getCallTime(c):
            return c.time
        self.calls.sort(key=getCallTime)
        return self

c = Call(12, "Alex", 152196519561, 3, "you guys suck")
b = Call(13, "Bob", 4535434354343, 1, "you guys don't suck")

cs = CallCenter([c, b])
cs.add(Call(14, "bijojiboj", 453453443535, 2, "i suck")).info().sortCalls().info()
# print "removing first member"
# cs.remove().info()
# print "removing member with phone number 12312313112313"
# cs.findRemove(12312313112313).info()
