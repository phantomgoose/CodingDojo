using System;
using System.Collections.Generic;


namespace Collections_Practice
{
    class Program
    {
        static void Main(string[] args)
        {
            int[] basic1 = new int[] { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
            string[] names = new string[] { "Tim", "Martin", "Nikki", "Sara" };
            bool[] basic3 = new bool[] { true, false, true, false, true, false, true, false, true, false };

            int[,] mult = new int[10, 10];
            for (int i = 0; i < 10; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    mult[i, j] = (i + 1) * (j + 1);
                }
            }

            List<string> flavors = new List<string>(new string[] {"Strawberry", "Cherry", "Mango", "Pistachio", "Chocolate"});
            System.Console.WriteLine(flavors.Count);
            System.Console.WriteLine(flavors[2]);
            flavors.RemoveAt(2);
            System.Console.WriteLine(flavors.Count);

            Dictionary<string, string> test = new Dictionary<string, string>();
            foreach (string name in names) {
                test.Add(name, null);
            }

            Random randy = new Random();

            foreach (string name in names)
            {
                test[name] = flavors[randy.Next(flavors.Count)];
            }

            foreach (KeyValuePair<string, string> entry in test) {
                System.Console.WriteLine("{0}'s favorite is {1}", entry.Key, entry.Value);
            }
        }

        public static void printArr(int[,] arr)
        {
            foreach (int column in arr)
            {
                System.Console.WriteLine(column);
            }
        }
    }
}
