using System.Collections.Generic;
using System.Data;
using MySql.Data.MySqlClient;

namespace DbConnection
{
    public class DBConnector
    {
        static string server = "localhost";
        static string db = "login_registration";
        static string port = "3306";
        static string user = "root";
        static string pass = "root";

        internal static IDbConnection Connection
        {
            get
            {
                return new MySqlConnection($"Server={server};Port={port};Database={db};UserID={user};Password={pass};SslMode=None");
            }
        }

        public List<Dictionary<string, object>> Query(string queryString)
        {
            using (IDbConnection dbConnection = Connection)
            using (IDbCommand command = dbConnection.CreateCommand())
            {
                command.CommandText = queryString;
                dbConnection.Open();
                var result = new List<Dictionary<string, object>>();
                using (IDataReader rdr = command.ExecuteReader())
                {
                    while (rdr.Read())
                    {
                        var dict = new Dictionary<string, object>();
                        for (int i = 0; i < rdr.FieldCount; i++)
                        {
                            dict.Add(rdr.GetName(i), rdr.GetValue(i));
                        }
                        result.Add(dict);
                    }
                    return result;
                }
            }
        }

        public void Execute(string queryString)
        {
            using (IDbConnection dbConnection = Connection)
            {
                using (IDbCommand command = dbConnection.CreateCommand())
                {
                    command.CommandText = queryString;
                    dbConnection.Open();
                    command.ExecuteNonQuery();
                }
            }
        }
    }
}