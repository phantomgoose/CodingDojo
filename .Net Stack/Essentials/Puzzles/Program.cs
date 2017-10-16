using System;

namespace Puzzles
{
    class Program
    {
        static void Main(string[] args)
        {
            // RandArr(10);
            // Random randy = new Random();
            // System.Console.WriteLine("Head to tail rate: " + TossMultipleCoins(10, randy));

            string[] testArray = new string[] {"Todd", "Tiffany", "Charlie", "Geneva", "Sydney"};
            Names(testArray);
        }

        public static int[] RandArr(int length) {
            int[] res = new int[length];
            int min = 5;
            int max = 5;
            int sum = 0;
            Random randy = new Random();

            for (int i = 0; i < res.Length; i++) {
                res[i] = randy.Next(5,26);
                if (res[i] < min) {
                    min = res[i];
                }
                if (res[i] > max) {
                    max = res[i];
                }
                sum += res[i];
            }

            System.Console.WriteLine("Min: " + min);
            System.Console.WriteLine("Max: " + max);
            System.Console.WriteLine("Sum: " + sum);
            return res;
        }

        public static string TossCoin(Random generator) {
            System.Console.WriteLine("Tossing a Coin!");
            int toss = generator.Next(0,2);
            if (toss == 1) {
                System.Console.WriteLine("Heads");
                return "Heads";
            } else {
                System.Console.WriteLine("Tails");
                return "Tails";
            }
        }

        public static double TossMultipleCoins(int num, Random generator) {
            int heads = 0;
            int tails = 0;
            string toss_res;
            for (int i = 0; i < num; i++) {
                toss_res = TossCoin(generator);
                if (toss_res == "Heads") {
                    heads++;
                } else if (toss_res == "Tails") {
                    tails++;
                } else {
                    System.Console.WriteLine("wat");
                    break;
                }
            }
            return heads/(double)tails;
        }

        public static string[] Names(string[] arr) {
            Random randy = new Random();
            int randIdx;
            string temp;
            string[] res = new string[arr.Length];
            int longNameCount = 0;
            for (int i = 0; i < arr.Length; i++) {
                randIdx = randy.Next(i, arr.Length);
                temp = arr[i];
                arr[i] = arr[randIdx];
                arr[randIdx] = temp;
            }
            foreach (string name in arr) {
                System.Console.WriteLine(name);
                if (name.Length > 5) {
                    res[longNameCount] = name;
                    longNameCount++;
                }
            }
            Array.Resize(ref res, longNameCount);
            return res;
        }
    }
}
