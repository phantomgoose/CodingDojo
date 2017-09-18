class Hospital(object):
    def __init__(self, name, capacity, patients = []):
        self.name = name
        self.capacity = capacity
        self.patients = patients
        self.beds = []
        #setting all beds to unoccupied
        for bed in range(capacity):
            self.beds.append(0)

    def admit(self, patient):
        #check if hospital is full
        if (len(self.patients) < self.capacity):
            bed_id = 1
            #find first empty bed, set it to 1 (occupied)
            for bed in range(len(self.beds)):
                if self.beds[bed] == 0:
                    bed_id = bed + 1
                    self.beds[bed] = 1
                    break
            self.patients.append(patient)
            patient.bed = bed_id
            return "patient admitted"
        else:
            return "hospital full, patient not admitted"

    def discharge(self, patient):
        self.patients.pop(self.patients.index(patient))
        #set patient's hospital bed to 0 (empty)
        self.beds[patient.bed-1] = 0
        patient.bed = None
        return self

    def info(self):
        for patient in self.patients:
            patient.info()
        return self

    def infoList(self):
        res = ""
        for p in self.patients:
            res += p.name + " "
        return res

    def __repr__(self):
        return "<Hospital object. Name: {}, capacity: {}, patients: {}>".format(self.name, self.capacity, self.infoList())

class Patient(object):
    def __init__(self, pat_id, name, allergies=[], bed=None):
        self.id = pat_id
        self.name = name
        self.allergies = allergies
        self.bed = bed

    def info(self):
        print "Patient's name is", self.name, "and they are in bed", self.bed
        return self

    def allergyList(self):
        res = ""
        if len(self.allergies) > 0:
            for a in self.allergies:
                res += a + " "
        else:
            res = "None"
        return res

    def __repr__(self):
        return "<Patient object. ID: {}, name: {}, allergies: {}, bed: {}>".format(self.id, self.name, self.allergyList(), self.bed)

if __name__ == "__main__":

    h = Hospital("Overlake", 5)
    p = Patient(1, "Alex")
    p2 = Patient(2, "Bob")
    p3 = Patient(3, "Gary")
    p4 = Patient(4, "Bobberson")
    p5 = Patient(5, "Alice")
    h.admit(p)
    h.admit(p2)
    h.admit(p3)
    h.admit(p4)
    h.info()
    print "discharging Bob"
    h.discharge(p2)
    h.info()
    print "admitting Alice"
    h.admit(p5)
    h.info()
    print p5
    #great success, alice is in bob's bed now (insert 13-year-old joke here)
