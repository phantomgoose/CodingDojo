using System;

namespace Human
{
    class Program
    {
        static void Main(string[] args)
        {
            Wizard human1 = new Wizard("Alex");
            Ninja human2 = new Ninja("Bob");
            human1.echo(human1.GetType().ToString());
            human2.echo(human2.GetType().ToString());
            human1.fireball(human2);
            human2.steal(human1);
            human1.echo(human1.GetType().ToString());
            human2.echo(human2.GetType().ToString());

            Samurai human3 = new Samurai("Bobby");
            Samurai human4 = new Samurai("Peter");
            Samurai.how_many();
            human3 = null;
            human4 = null;
            GC.Collect();
            GC.WaitForPendingFinalizers();
            Samurai.how_many();
        }
    }
}
