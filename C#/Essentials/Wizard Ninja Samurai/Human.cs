namespace Human
{
    public class Human
    {
        public string name;
        public int strength { get; set; }
        public int intelligence { get; set; }
        public int dexterity { get; set; }
        public int health { get; set; }

        public Human(string name)
        {
            this.name = name;
            this.strength = 3;
            this.intelligence = 3;
            this.dexterity = 3;
            this.health = 100;
        }

        public Human(string name, int strength, int intelligence, int dexterity, int health)
        {
            this.name = name;
            this.strength = strength;
            this.intelligence = intelligence;
            this.dexterity = dexterity;
            this.health = health;
        }

        public void attack(object target)
        {
            Human human_target = target as Human;
            if (human_target != null) {
                human_target.health -= this.strength * 5;
            } else {
                System.Console.WriteLine("Unknown target.");
            }
        }

        public void echo(string type) {
            System.Console.WriteLine($"My name is {this.name}. I am a {type}. My health is {this.health}. My STR is {this.strength}, INT is {this.intelligence}, DEX is {this.dexterity}.");
        }

    }
}