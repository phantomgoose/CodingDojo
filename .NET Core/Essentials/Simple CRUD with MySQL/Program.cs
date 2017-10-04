using System;
using DbConnection;
using System.Collections.Generic;

namespace Simple_CRUD_with_MySQL
{
    class Program
    {
        static void Main(string[] args)
        {
            // Create("Blobby","aodwija", 7);
            // Create("Alkex","awdoijawoidj", 5);
            Update(1, "AR", "Aawoidj", 10);
            Delete(1);
        }

        static void Read() {
            List<Dictionary<string, object>> all = DbConnector.Query("SELECT * FROM users");
            foreach(Dictionary<string, object> dict in all) {
                System.Console.Write("Entry: ");
                foreach (KeyValuePair<string, object> keyVal in dict) {
                    System.Console.Write(keyVal.Key + "=" + keyVal.Value + ", ");
                }
                System.Console.WriteLine();
            }
        }

        static void Create(string firstName, string lastName, int favoriteNum) {
            string query = $"INSERT INTO users (FirstName, LastName, FavoriteNumber) VALUES ('{firstName}', '{lastName}', '{favoriteNum}')";
            System.Console.WriteLine("Adding user...");
            DbConnector.Execute(query);
            Read();
        }

        static void Update(int id, string firstName, string lastName, int favoriteNum) {
            string query = $"UPDATE users SET FirstName='{firstName}', LastName='{lastName}', FavoriteNumber='{favoriteNum}' WHERE id={id}";
            System.Console.WriteLine("Updating user...");
            DbConnector.Execute(query);
            Read();
        }

        static void Delete(int id) {
            string query = $"DELETE FROM users WHERE id={id}";
            System.Console.WriteLine("Deleting user...");
            DbConnector.Execute(query);
            Read();
        }
    }
}
