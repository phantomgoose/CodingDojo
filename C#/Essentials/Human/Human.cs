namespace Human {
    public class Human {
        public string name;
        public int strength = 3;
        public int intelligence = 3;
        public int dexterity = 3;
        public int health = 100;

        public Human(string name) {
            this.name = name;
        }

        public Human(string name, int strength, int intelligence, int dexterity, int health) {
            this.name = name;
            this.strength = strength;
            this.intelligence = intelligence;
            this.dexterity = dexterity;
            this.health = health;
        }

        public void attack(object target) {
            Human human_target = target as Human;
            human_target.health -= this.strength * 5;
        }

    }
}