using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    public class MovieController : ApiController
    {
        ApplicationDbContext context;

        public MovieController()
        {
            context = new ApplicationDbContext();
        }

        // GET api/values
        public IHttpActionResult Get()
        {
            // Retrieve all movies from db logic
            List<Movies> movies;
            movies = context.Movies.ToList();
            context.SaveChanges();
            if (movies.Count == 0)
            {
                return NotFound();
            }
            return Ok(movies);
        }

        // GET api/values/5
        public IHttpActionResult Get(int id)
        {
            // Retrieve movie by id from db logic
            var movie = context.Movies.Where(m => m.MovieId == id).SingleOrDefault();
            if (movie == null)
            {
                return NotFound();
            }

            return Ok(movie);
        }

        // POST api/values
        public IHttpActionResult Post([FromBody]Movies value)
        {
            // Create movie in db logic
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }
            Movies movie = new Movies();
            movie.Title = value.Title;
            movie.Genre = value.Genre;
            movie.DirectorName = value.DirectorName;
            context.Movies.Add(movie);
            context.SaveChanges();
            return Ok(movie);
        }

        // PUT api/values/5
        public IHttpActionResult Put(int id, [FromBody]Movies value)
        {
            // Update movie in db logic
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid input");
            }
            var existMovie = context.Movies.Where(m => m.MovieId == id).SingleOrDefault();
            if (existMovie != null)
            {
                existMovie.Title = value.Title;
                existMovie.Genre = value.Genre;
                existMovie.DirectorName = value.DirectorName;
                context.SaveChanges();
            }
            else
            {
                return NotFound();
            }

            return Ok(existMovie);
        }

        // DELETE api/values/5
        public IHttpActionResult Delete(int id,[FromBody]Movies value)
        {
            // Delete movie from db logic
            if (id <= 0)
            {
                return BadRequest("Not a valid id");
            }
            var movie = context.Movies.Where(m => m.MovieId == id && m.Title == value.Title).SingleOrDefault();
            context.Movies.Remove(movie);
            context.SaveChanges();
            return Ok(context.Movies);
        }
    }

}