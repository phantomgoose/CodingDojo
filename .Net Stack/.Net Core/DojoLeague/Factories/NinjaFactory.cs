using Dapper;
using DojoLeague.Models;
using MySql.Data.MySqlClient;
using System.Data;
using System.Collections.Generic;

namespace DojoLeague.Factories {
    public class NinjaFactory : IFactory<Ninja> {
        private string connectionString;
        public NinjaFactory() {
            connectionString = "server=localhost;userid=root;password=root;port=3306;database=dojo_league;SslMode=None";
        }
        internal IDbConnection Connection {
            get {
                return new MySqlConnection(connectionString);
            }
        }

        public void Create(Ninja ninja) {
            using (IDbConnection db = Connection) {
                string query = "INSERT INTO ninjas (name, level, description, dojo_id) VALUES (@name, @level, @description, @dojo_id)";
                db.Open();
                db.Execute(query, ninja);
            }
        }

        public IEnumerable<Ninja> List() {
            using (IDbConnection db = Connection) {
                db.Open();
                return db.Query<Ninja>("SELECT * FROM ninjas");
            }
        }
    }
}