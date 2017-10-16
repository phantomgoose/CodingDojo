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
                    checkState(game, "Your Dojodachi did not like the food! Meals -1 :(");
                }
                else
                {
                    game.fullness += ran_fullness;
                    checkState(game, "You fed your Dojodachi! Meals -1, fullness +" + ran_fullness);
                }

            }
            else
            {
                checkState(game, "You don't have enough meals to feed your Dojodachi!");
            }
            return Json(game);
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
                if (r.Next(4) == 0)
                {
                    checkState(game, "Your Dojodachi did not like playing with you! Energy -5 :(");
                }
                else
                {
                    game.happiness += ran_happiness;
                    checkState(game, $"You played with your Dojodachi! Energy -5, happiness +{ran_happiness}");
                }
            }
            else
            {
                checkState(game, "Your Dojodachi is too tired to play!");
            }
            return Json(game);
        }

        [HttpGet]
        [Route("work")]
        public IActionResult work()
        {
            Game game = getGame();
            Random r = new Random();
            if (game.energy >= 5)
            {
                game.energy -= 5;
                int ran_meals = r.Next(1, 4);
                game.meals += ran_meals;
                checkState(game, $"Your Dojodachi was very productive! Energy -5, meals +{ran_meals}");
            }
            else
            {
                checkState(game, "Your Dojodachi is too tired to work :(");
            }
            return Json(game);
        }

        [HttpGet]
        [Route("sleep")]
        public IActionResult sleep()
        {
            Game game = getGame();
            game.energy += 15;
            game.fullness -= 5;
            game.happiness -= 5;
            checkState(game, "Your Dojodachi went to bed and woke up feeling refreshed, but grumpy. Energy +15, fullness -5, happiness -5.");
            return Json(game);
        }

        [HttpGet]
        [Route("reset")]
        public IActionResult reset()
        {
            Game game = new Game();
            HttpContext.Session.SetObjectAsJson("game", game);
            return Json(game);
        }

        // checks game state, updates message accordingly (on win/loss), and most importantly saves the game state to session
        private void checkState(Game game, string custom_message)
        {
            string message = custom_message;
            bool res = false;
            // winning takes priority
            if (isGameWon(game))
            {
                message = "Congratulations! You won!";
                res = true;
            }
            else if (isGameLost(game))
            {
                message = "Your Dojodachi has passed away.";
                res = true;
            }
            // totally unnecessary reflection here for practice purposes
            updateValue(game, "message", message);
            updateValue(game, "gameOver", res);
            // game.message = message;
            // game.gameOver = res;
            saveGame(game);
        }

        private bool isGameWon(Game game)
        {
            if (game.fullness >= 100 && game.happiness >= 100 && game.energy >= 100)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private bool isGameLost(Game game)
        {
            if (game.fullness <= 0 || game.happiness <= 0)
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

        private void updateValue(Game game, string key, object value)
        {
            typeof(Game).GetField(key).SetValue(game, value);
        }
    }
}