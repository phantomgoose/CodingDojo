using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using JsonData;

namespace MusicApi.Controllers
{


    public class ArtistController : Controller
    {

        private List<Artist> allArtists { get; set; }

        public ArtistController()
        {
            allArtists = JsonToFile<Artist>.ReadJson();
        }

        //This method is shown to the user navigating to the default API domain name
        //It just display some basic information on how this API functions
        [Route("")]
        [HttpGet]
        public string Index()
        {
            //String describing the API functionality
            string instructions = "Welcome to the Music API~~\n========================\n";
            instructions += "    Use the route /artists/ to get artist info.\n";
            instructions += "    End-points:\n";
            instructions += "       *Name/{string}\n";
            instructions += "       *RealName/{string}\n";
            instructions += "       *Hometown/{string}\n";
            instructions += "       *GroupId/{int}\n\n";
            instructions += "    Use the route /groups/ to get group info.\n";
            instructions += "    End-points:\n";
            instructions += "       *Name/{string}\n";
            instructions += "       *GroupId/{int}\n";
            instructions += "       *ListArtists=?(true/false)\n";
            return instructions;
        }

        [Route("artists")]
        [HttpGet]
        public JsonResult GetAllArtists()
        {
            return Json(allArtists);
        }

        [Route("artists/name/{name}")]
        [HttpGet]
        public JsonResult SearchArtistsByArtistName(string name)
        {
            Regex r = new Regex($"(?i){name}");
            return Json(allArtists.Where(artist => r.IsMatch(artist.ArtistName)).ToList());
        }

        [Route("artists/realname/{name}")]
        [HttpGet]
        public JsonResult SearchArtistsByRealName(string name)
        {
            Regex r = new Regex($"(?i){name}");
            return Json(allArtists.Where(artist => r.IsMatch(artist.RealName)).ToList());
        }

        [Route("artists/hometown/{town}")]
        [HttpGet]
        public JsonResult SearchArtistsByHometown(string town)
        {
            Regex r = new Regex($"(?i){town}");
            return Json(allArtists.Where(artist => r.IsMatch(artist.Hometown)).ToList());
        }

        [Route("artists/groupid/{id}")]
        [HttpGet]
        public JsonResult SearchArtistsByGroupID(int id)
        {
            Regex r = new Regex($"(?i){id}");
            return Json(allArtists.Where(artist => artist.GroupId == id).ToList());
        }
    }
}