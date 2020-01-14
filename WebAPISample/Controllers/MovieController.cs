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
            IList<Movies> movies = null;
            using (var context = new ApplicationDbContext())
            {
                movies = context.Movies.Select(m => new Movies()
                {
                    Title = m.Title,
                    Genre = m.Genre,
                    DirectorName = m.DirectorName
                }).ToList();
                context.SaveChanges();
            }
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
<<<<<<< HEAD
            IList<Movies> movies = null;
            
            using (var mList = new ApplicationDbContext())
            {
                movies = mList.Movies.Include("Title")
                    .Select(m => new Movies()
                    {
                        Title = m.Title,
                        Genre = m.Genre,
                        DirectorName = m.DirectorName
                    }).ToList<Movies>();
            }
            if(movies.Count == 0)
            {
                return NotFound();
            }
            return Ok();
=======
            var movie = context.Movies.Where(m => m.MovieId == id).SingleOrDefault();
            if (movie == null)
            {
                return NotFound();
            }
            
            return Ok(movie);
>>>>>>> 614a10ff1dc2f3f3bf3d32be6a497690b4c4be51
        }

        // POST api/values
        public IHttpActionResult Post([FromBody]Movies value)
        {
            // Create movie in db logic
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }
            using (var context = new ApplicationDbContext())
            {
                context.Movies.Add(new Movies()
                {
                    Title = value.Title,
                    Genre = value.Genre,
                    DirectorName = value.DirectorName
                });

                context.SaveChanges();
            }
            return Ok();
        }

        // PUT api/values/5
        public IHttpActionResult Put(int id, [FromBody]Movies value)
        {
            // Update movie in db logic
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid input");
            }
            using (var context = new ApplicationDbContext())
            {
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
            }
            return Ok();
        }

        // DELETE api/values/5
<<<<<<< HEAD
        public void Delete(int id, [FromBody]Movies value)
        {
            // Delete movie from db logic

            var movie = context.Movies.Where(m => m.MovieId == id).SingleOrDefault();
            context.Movies.Remove(movie);
            context.SaveChanges();
=======
        public IHttpActionResult Delete(int id)
        {
            // Delete movie from db logic
            if (id <= 0)
            {
                return BadRequest("Not a valid id");
            }
            using (var context = new ApplicationDbContext())
            {
                var movie = context.Movies.Where(m => m.MovieId == id).SingleOrDefault();
                context.Entry(movie).State = System.Data.Entity.EntityState.Deleted;
                context.SaveChanges();
            }
            return Ok();
>>>>>>> 614a10ff1dc2f3f3bf3d32be6a497690b4c4be51
        }
    }

}