using System;

namespace Deck_of_Cards
{
    class Program
    {
        static void Main(string[] args)
        {
            Deck test_deck = new Deck();
            Player alex = new Player("Alex");
            alex.draw(test_deck);
            alex.draw(test_deck);
            alex.draw(test_deck);
            alex.discard(0);
        }
    }
}
