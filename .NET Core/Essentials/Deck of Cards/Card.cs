using System.Diagnostics;

namespace Deck_of_Cards
{
    public class Card
    {
        public string stringVal;
        public string suite;
        public int val;

        public Card(int val, string suite)
        {

            this.val = val;
            this.suite = suite;

            switch (this.val)
            {
                case 1:
                    this.stringVal = "Ace";
                    break;
                case 2:
                    this.stringVal = "Two";
                    break;
                case 3:
                    this.stringVal = "Three";
                    break;
                case 4:
                    this.stringVal = "Four";
                    break;
                case 5:
                    this.stringVal = "Five";
                    break;
                case 6:
                    this.stringVal = "Six";
                    break;
                case 7:
                    this.stringVal = "Seven";
                    break;
                case 8:
                    this.stringVal = "Eight";
                    break;
                case 9:
                    this.stringVal = "Nine";
                    break;
                case 10:
                    this.stringVal = "Ten";
                    break;
                case 11:
                    this.stringVal = "Jack";
                    break;
                case 12:
                    this.stringVal = "Queen";
                    break;
                case 13:
                    this.stringVal = "King";
                    break;
                default:
                    break;
            }
        }
    }
}