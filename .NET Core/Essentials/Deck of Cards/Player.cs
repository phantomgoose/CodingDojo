using System.Collections.Generic;

namespace Deck_of_Cards {
    public class Player {
        public string name;
        List<Card> hand = new List<Card>();

        public Player(string name) {
            this.name = name;
        }

        public Card draw(Deck deck) {
            Card drawn_card = deck.deal();
            this.hand.Add(drawn_card);
            return drawn_card;
        }

        public Card discard(int idx) {
            if (idx < 0 || idx >= this.hand.Count) {
                return null;
            }
            Card discarded_card = this.hand[idx];
            this.hand.RemoveAt(idx);
            return discarded_card;
        }
    }
}