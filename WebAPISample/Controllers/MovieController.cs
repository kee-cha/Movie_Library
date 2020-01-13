﻿using System;
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
        public IEnumerable<string> Get()
        {
            // Retrieve all movies from db logic
            context.Movies.ToList();
            context.SaveChanges();
            return new string[] { "movie1 string", "movie2 string" };
        }

        // GET api/values/5
        public IHttpActionResult Get(int id)
        {
            // Retrieve movie by id from db logic
            var movie = context.Movies.Where(m => m.MovieId == id).SingleOrDefault();
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
            public IHttpActionResult Put(int id, [FromBody]string value)
            {
            // Update movie in db logic
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a valid input");
            }
            
            }

            // DELETE api/values/5
            public void Delete(int id)
            {
                // Delete movie from db logic
                var movie = context.Movies.Where(m => m.MovieId == id).SingleOrDefault();
                context.Movies.Remove(movie);
                context.SaveChanges();
            }
        }

    }