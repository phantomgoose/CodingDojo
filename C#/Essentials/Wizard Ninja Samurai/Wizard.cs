using System;

namespace Human {
    public class Wizard : Human {
        public Wizard(string name) : base(name) {
            this.health = 50;
            this.intelligence = 25;
        }

        public void heal() {
            System.Console.WriteLine($"{this.name} is healing him/herself for {this.intelligence * 10}hp!");
            this.health += this.intelligence * 10;
        }

        public void fireball(object target) {
            Human enemy = target as Human;
            if (enemy != null) {
                Random randy = new Random();
                int dmg = randy.Next(20, 51);
                System.Console.WriteLine($"{this.name} is casting fireball at {enemy.name}. It'll hit for {dmg} dmg!");
                enemy.health -= dmg;
            } else {
                System.Console.WriteLine("Unknown target.");
            }
        }
    }
}