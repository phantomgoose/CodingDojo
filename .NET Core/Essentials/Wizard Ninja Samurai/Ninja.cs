namespace Human {
    public class Ninja : Human {
        public Ninja(string name) : base(name) {
            this.dexterity = 175;
        }

        public void steal(object target) {
            Human enemy = target as Human;
            if (enemy != null) {
                System.Console.WriteLine($"{this.name} is attacking {enemy.name} and restoring 10 health!");
                this.attack(enemy);
                this.health += 10;
            } else {
                System.Console.WriteLine("Unknown target.");
            }
        }

        public void get_away() {
            System.Console.WriteLine($"{this.name} is getting away! Lost 15 health.");
            this.health -= 15;
        }
    }
}