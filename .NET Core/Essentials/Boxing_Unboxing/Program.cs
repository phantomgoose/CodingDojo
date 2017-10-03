using System;
using System.Collections.Generic;

namespace Boxing_Unboxing
{
    class Program
    {
        static void Main(string[] args)
        {
            List<object> testList = new List<object>(new object[] {7, 28, -1, true, "chair"});
            int sum = 0;
            foreach (object item in testList)
            {
                if (item is int) {
                    sum += (int)item;
                }
                System.Console.WriteLine(item);
            }
            System.Console.WriteLine("Sum was " + sum);
        }
    }
}
