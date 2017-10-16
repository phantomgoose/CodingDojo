using System;
using System.Net.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace PokeInfo.Controllers
{
    public class HomeController : Controller
    {

        // GET: /Home/
        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Pokemon(int id) {
            var PokeInfo = new Dictionary<string, object>();
            GetPokemonDataAsync(id, res => {
                PokeInfo = res;
            }).Wait();
            ViewBag.Pokeman = PokeInfo;
            // System.Console.WriteLine($"type of types: {ViewBag.Pokeman["types"][0]["type"]["name"]}");
            foreach (var item in ViewBag.Pokeman["types"])
            {
                System.Console.WriteLine(item["type"]["name"]);
            }
            // ViewBag.Pokeman["types"] = JsonConvert.DeserializeObject(ViewBag.Pokeman["types"]);
            return View("Index");
        }

        private async Task GetPokemonDataAsync(int PokemanID, Action<Dictionary<string, object>> Callback) {
            using (var Client = new HttpClient()){
                try {
                    Client.BaseAddress = new Uri($"http://pokeapi.co/api/v2/pokemon/{PokemanID}");
                    HttpResponseMessage Response = await Client.GetAsync("");
                    Response.EnsureSuccessStatusCode();
                    string StringResponse = await Response.Content.ReadAsStringAsync();
                    Dictionary<string, object> JsonResponse = JsonConvert.DeserializeObject<Dictionary<string, object>>(StringResponse);
                    Callback(JsonResponse);
                } catch (HttpRequestException e) {
                    System.Console.WriteLine($"Request failed. Exception: {e.Message}");
                }
            }
        }
    }
}
