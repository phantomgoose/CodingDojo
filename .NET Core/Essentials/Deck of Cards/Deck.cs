using System;
using System.Collections.Generic;

namespace Deck_of_Cards {
    public class Deck {
        private List<Card> cards = new List<Card>();

        public Deck() {
            this.genCards();
            this.shuffle();
        }

        private void genCards() {
            string[] suits = new string[] {"Clubs", "Spades", "Hearts", "Diamonds"};

            foreach (string suit in suits) {
                for (int i = 1; i <= 13; i++) {
                    this.cards.Add(new Card(i, suit));
                }
            }
        }

        public Card deal() {
            Card res = this.cards[this.cards.Count - 1];
            this.cards.Remove(res);
            return res;
        }

        public void reset() {
            this.cards.Clear();
            this.genCards();
        }

        public void shuffle() {
            Random randy = new Random();

            for (int i = 0; i < this.cards.Count; i++) {
                int randIdx = randy.Next(i, this.cards.Count);
                Card temp = this.cards[i];
                this.cards[i] = this.cards[randIdx];
                this.cards[randIdx] = temp;
            }
        }
    }
}