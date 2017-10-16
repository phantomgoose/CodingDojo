using Dapper;
using DojoLeague.Models;
using MySql.Data.MySqlClient;
using System.Data;
using System.Collections.Generic;
using System.Linq;

namespace DojoLeague.Factories {
    public class DojoFactory : IFactory<Ninja> {
        private string connectionString;
        public DojoFactory() {
            connectionString = "server=localhost;userid=root;password=root;port=3306;database=dojo_league;SslMode=None";
        }
        internal IDbConnection Connection {
            get {
                return new MySqlConnection(connectionString);
            }
        }

        public void Create(Dojo dojo) {
            using (IDbConnection db = Connection) {
                string query = "INSERT INTO dojos (name, location, information) VALUES (@name, @location, @information)";
                db.Open();
                db.Execute(query, dojo);
            }
        }

        public IEnumerable<Dojo> List() {
            using (IDbConnection db = Connection) {
                db.Open();
                return db.Query<Dojo>("SELECT * FROM dojos");
            }
        }

        public Dojo GetDojo(int id) {
            using (IDbConnection db = Connection) {
                db.Open();
                string query = @"SELECT * FROM dojos WHERE id = @id; SELECT * FROM ninjas WHERE dojo_id = @id";
                using (var multi = db.QueryMultiple(query, new { id = id})) {
                    var dojo = multi.Read<Dojo>().SingleOrDefault();
                    dojo.ninjas = multi.Read<Ninja>().ToList();
                    return dojo;
                }
            }
        }
    }
}