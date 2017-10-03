using System;

namespace Human
{
    class Program
    {
        static void Main(string[] args)
        {
            Human human1 = new Human("Alex", 1, 1, 3, 10);
            Human human2 = new Human("Bob");

            human1.attack(human2);
            System.Console.WriteLine(human2.health);
            human2.attack(human1);
            System.Console.WriteLine(human1.health);
        }
    }
}
