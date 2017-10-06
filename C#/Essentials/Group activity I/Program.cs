using System;

namespace Group_activity_I
{
    class Program
    {
        static void Main(string[] args)
        {
            // oneTo255();
            // oneTo255Odd();
            // oneTo255Sum();
            // iterate(new int[] {1,3,5,7,9,13});
            // findMax(new int[] {-3, -5, -7});
            // findAvg(new int[] {2,3});
            // int[] test = createOdd();
            // iterate(test);
            // greaterThan(new int[] {1,3,5,7,9,13}, 4);
            // iterate(square(new int[] {2,3}));
            // iterate(remNeg(new int[] {-3, -5, -7, 1, 2}));
            // minMaxAvg(new int[] {2,3,6});
            // shift(new int[] {2,3,6});
            // replaceNeg(new int[] {-3, -5, -7, 1, 2});
            // object[] test = new object[] {"hi", 1, 2, true};
            // iterate(test);
        }

        public static void oneTo255()
        {
            for (int i = 1; i < 256; i++)
            {
                System.Console.WriteLine(i);
            }
        }

        public static void oneTo255Odd()
        {
            for (int i = 1; i < 256; i++)
            {
                if (i % 2 != 0)
                {
                    System.Console.WriteLine(i);
                }
            }
        }

        public static void oneTo255Sum()
        {
            int sum = 0;
            for (int i = 0; i < 256; i++)
            {
                sum += i;
                System.Console.WriteLine("New number: {0}, Sum: {1}", i, sum);
            }
        }

        public static void iterate (int[] arr) {
            for (int i = 0; i < arr.Length; i++)
            {
                System.Console.WriteLine(arr[i]);
            }
        }

        public static void iterate (object[] arr) {
            for (int i = 0; i < arr.Length; i++)
            {
                if (arr[i] is int) {
                    System.Console.WriteLine("This is an integer: " + arr[i]);
                }
                else if (arr[i] is string) {
                    System.Console.WriteLine("This is a string: " + arr[i]);
                }
                else {
                    System.Console.WriteLine("Wtf is this: " + arr[i]);
                }
            }
        }

        public static void findMax (int[] arr) {
            int max = arr[0];
            for (int i = 0; i < arr.Length; i++) {
                if (arr[i] > max) {
                    max = arr[i];
                }
            }
            System.Console.WriteLine(max);
        }

        public static void findAvg(int[] arr) {
            int sum = 0;
            for (int i = 0; i < arr.Length; i++) {
                sum += arr[i];
            }
            float avg = sum / (float)arr.Length;
            System.Console.WriteLine(avg);            
        }

        public static int[] createOdd() {
            int[] res = new int[128];
            int idx = 0;
            for (int i = 1; i < 256; i++)
            {
                if (i % 2 != 0)
                {
                    res[idx] = i;
                    idx++;
                }
            }
            return res;
        }

        public static void greaterThan(int[] arr, int y) {
            int count = 0;
            foreach (int num in arr)
            {
                if (num > y) {
                    count++;
                }
            }
            System.Console.WriteLine(count);
        }

        public static int[] square(int[] arr) {
            for (int i = 0; i < arr.Length; i++)
            {
                arr[i] *= arr[i];
            }
            return arr;
        }
        public static int[] remNeg(int[] arr) {
            for (int i = 0; i < arr.Length; i++)
            {
                arr[i] = arr[i] < 0 ? 0 : arr[i];
            }
            return arr;
        }

        public static void minMaxAvg(int[] arr) {
            int max = arr[0];
            int min = arr[0];
            int sum = 0;
            for (int i = 0; i < arr.Length; i++)
            {
                if (arr[i] > max) {
                    max = arr[i];
                }
                if (arr[i] < min) {
                    min = arr[i];
                }
                sum += arr[i];
            }
            double avg = sum / (double)arr.Length;
            System.Console.WriteLine("Min: " + min);
            System.Console.WriteLine("Max: " + max);
            System.Console.WriteLine("Average: " + avg);
        }

        public static void shift(int[] arr) {
            for (int i = 0; i < arr.Length - 1; i++)
            {
                arr[i] = arr[i+1];
            }
            arr[arr.Length-1] = 0;
            iterate(arr);
        }

        public static string[] replaceNeg(int[] arr) {
            string[] res = new string[arr.Length];
            for (int i = 0; i < arr.Length; i++)
            {
                res[i] = arr[i] < 0 ? "Dojo" : arr[i].ToString();
            }
            return res;
        }
    }
}
