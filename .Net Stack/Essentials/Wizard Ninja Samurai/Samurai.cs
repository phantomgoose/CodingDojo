using System.Threading;

namespace Human {
    public class Samurai : Human {

        static int samurai_count = 0;

        public Samurai(string name) : base(name) {
            this.health = 200;
            Interlocked.Increment(ref samurai_count);
        }

        ~Samurai() {
            Interlocked.Decrement(ref samurai_count);
        }

        public void death_blow(object target) {
            Human enemy = target as Human;
            if (enemy != null) {
                System.Console.WriteLine($"{this.name} is trying to finish off {enemy.name} with a death blow! Their current health is {enemy.health}hp.");
                if (enemy.health < 50) {
                    System.Console.WriteLine($"{this.name} killed {enemy.name}. RIP.");
                    enemy.health = 0;
                }
            }
        }

        public void meditate() {
            System.Console.WriteLine($"{this.name} is meditating and will restore to full health!");
            this.health = 200;
        }

        public static void how_many() {
            System.Console.WriteLine($"There are currently {samurai_count} samurais(?).");
        }
    }
}