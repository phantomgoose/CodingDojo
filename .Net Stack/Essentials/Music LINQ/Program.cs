using System;
using System.Collections.Generic;
using System.Linq;
using Regex = System.Text.RegularExpressions;
using JsonData;

namespace ConsoleApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //Collections to work with
            List<Artist> Artists = JsonToFile<Artist>.ReadJson();
            List<Group> Groups = JsonToFile<Group>.ReadJson();

            //========================================================
            //Solve all of the prompts below using various LINQ queries
            //========================================================

            //There is only one artist in this collection from Mount Vernon, what is their name and age?

            Artist artistFromVernon = Artists.Where(artist => artist.Hometown == "Mount Vernon").First();
            System.Console.WriteLine(artistFromVernon.RealName + " " + artistFromVernon.Age);


            //Who is the youngest artist in our collection of artists?

            Artist youngest = Artists.OrderBy(artist => artist.Age).First();
            System.Console.WriteLine(youngest.Age);

            //Display all artists with 'William' somewhere in their real name
            string pattern = @"William";
            Regex.Regex r = new Regex.Regex(pattern);
            List<Artist> williams = Artists.Where(artist => r.IsMatch(artist.RealName)).ToList();

            //Display the 3 oldest artist from Atlanta

            List<Artist> oldest = Artists.OrderByDescending(artist => artist.Age).Where(artist => artist.Hometown == "Atlanta").Take(3).ToList();

            //(Optional) Display the Group Name of all groups that have members that are not from New York City

            var query = Groups.Join(Artists, group => group.Id, artist => artist.GroupId, (group, artist) => {return new { Group = group, Artist = artist };}).Where(groupAndArtist => groupAndArtist.Artist.Hometown != "New York City").Select(groupAndArtist => groupAndArtist.Group.GroupName).Distinct();

            //(Optional) Display the artist names of all members of the group 'Wu-Tang Clan'

            var query2 =
                from a in Artists
                join g in Groups on a.GroupId equals g.Id
                where g.GroupName == "Wu-Tang Clan"
                select new {a.RealName};
            
            var query3 =
                from g in Groups
                where g.GroupName.Length < 8
                select new {g.GroupName};
        }
    }
}
