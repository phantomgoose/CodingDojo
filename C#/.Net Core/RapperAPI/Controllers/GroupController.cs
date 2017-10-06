using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Regex = System.Text.RegularExpressions;
using JsonData;

namespace MusicApi.Controllers {
    public class GroupController : Controller {
        private List<Group> allGroups {get; set;}
        public GroupController() {
            allGroups = JsonToFile<Group>.ReadJson();
        }

        [Route("groups")]
        [HttpGet]
        public JsonResult GetAllGroups() {
            return Json(allGroups);
        }

        [Route("groups/name/{name}")]
        [HttpGet]
        public JsonResult SearchGroupsByName(string name, bool displayArtists = true){
            Regex.Regex r = new Regex.Regex($"(?i){name}");
            List<Group> groups = allGroups.Where(group => r.IsMatch(group.GroupName)).ToList();
            if (displayArtists) {
                List<Artist> allArtists = JsonToFile<Artist>.ReadJson();
                var artists = from Group in groups
                            join Artist in allArtists on Group.Id equals Artist.GroupId
                            where Artist.GroupId == Group.Id
                            select Artist;
                return Json(new {groups, artists});
            } else {
                return Json(groups);
            }
        }

        [Route("groups/id/{id}")]
        [HttpGet]
        public JsonResult SearchGroupsByID(int id, bool displayArtists = true){
            List<Group> groups = allGroups.Where(group => group.Id == id).ToList();
            if (displayArtists) {
                List<Artist> allArtists = JsonToFile<Artist>.ReadJson();
                var artists = from Group in groups
                            join Artist in allArtists on Group.Id equals Artist.GroupId
                            where Artist.GroupId == Group.Id
                            select Artist;
                return Json(new {groups, artists});
            } else {
                return Json(groups);
            }
        }
    }
}