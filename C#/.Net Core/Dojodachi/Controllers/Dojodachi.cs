using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Reflection;

namespace Dojodachi.Controllers
{
    public class Dojodachi : Controller
    {

        // main page
        [HttpGet]
        [Route("dojodachi")]
        public IActionResult index()
        {
            // initializes base state after reset or on new user
            if (HttpContext.Session.GetObjectFromJson<Game>("game") == null)
            {
                HttpContext.Session.SetObjectAsJson("game", new Game());
            }
            return View();
        }

        // redirects to main page from root (assignment.jpg)
        [HttpGet]
        [Route("")]
        public IActionResult root()
        {
            return RedirectToAction("index");
        }

        // fetch session on page load
        [HttpGet]
        [Route("fetch")]
        public IActionResult fetchGameState()
        {
            return Json(getGame());
        }

        [HttpGet]
        [Route("feed")]
        public IActionResult feed()
        {
            Random r = new Random();
            int ran_fullness = r.Next(5, 11);
            Game game = getGame();
            if (game.meals > 0)
            {
                game.meals--;
                // random failure
                if (r.Next(4) == 0)
                {
                    saveGame(game);
                    checkState("Your Dojodachi did not like the food! Meals -1 :(");
                }
                else
                {
                    game.fullness += ran_fullness;
                    saveGame(game);
                    checkState("You fed your Dojodachi! Meals -1, fullness +" + ran_fullness);
                }

            }
            else
            {
                checkState("You don't have enough meals to feed your Dojodachi!");
            }
            return Json(getGame());
        }

        [HttpGet]
        [Route("play")]
        public IActionResult play()
        {
            Random r = new Random();
            Game game = getGame();
            int ran_happiness = r.Next(5, 11);
            if (game.energy >= 5)
            {
                game.energy -= 5;
                // random fail
                if (r.Next(4) == 0) {
                    saveGame(game);
                    checkState("Your Dojodachi did not like playing with you! Energy -5 :(");
                } else {
                    game.happiness += ran_happiness;
                saveGame(game);
                checkState("You played with your Dojodachi! Energy -5, happiness +" + ran_happiness);
                }
            }
            else
            {
                checkState("Your Dojodachi is too tired to play!");
            }
            return Json(getGame());
        }

        [HttpGet]
        [Route("work")]
        public IActionResult work() {
            Game game = getGame();
            Random r = new Random();
            if (game.energy >= 5) {
                game.energy -= 5;
                int ran_meals = r.Next(1,4);
                game.meals += ran_meals;
                saveGame(game);
                checkState("Your Dojodachi was very productive! Energy -5, meals +" + ran_meals);
            } else {
                checkState("Your Dojodachi is too tired to work :(");
            }
            return Json(getGame());
        }

        [HttpGet]
        [Route("sleep")]
        public IActionResult sleep() {
            Game game = getGame();
            game.energy += 15;
            game.fullness -= 5;
            game.happiness -= 5;
            saveGame(game);
            checkState("Your Dojodachi went to bed and woke up feeling refreshed, but grumpy. Energy +15, fullness -5, happiness -5.");
            return Json(getGame());
        }

        [HttpGet]
        [Route("reset")]
        public IActionResult reset() {
            HttpContext.Session.SetObjectAsJson("game", new Game());
            return Json(getGame());
        }

        // checks game state and updates message accordingly
        private void checkState(string custom_message)
        {
            string message = "";
            bool res = false;
            Game game = getGame();
            // winning takes priority
            if (isGameWon())
            {
                message = "Congratulations! You won!";
                res = true;
            }
            else if (isGameLost())
            {
                message = "Your Dojodachi has passed away.";
                res = true;
            }
            else
            {
                message = custom_message;
            }
            game.message = message;
            game.gameOver = res;
            saveGame(game);
        }

        private bool isGameWon()
        {
            if (getGame().fullness >= 100 && getGame().happiness >= 100 && getGame().energy >= 100)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private bool isGameLost()
        {
            if (getGame().fullness <= 0 || getGame().happiness <= 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private Game getGame()
        {
            return HttpContext.Session.GetObjectFromJson<Game>("game");
        }

        private void saveGame(Game game)
        {
            HttpContext.Session.SetObjectAsJson("game", game);
        }
    }
}