using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GCStudyBuddyAPI.Entities;
using GCStudyBuddyAPI.DTOs;

namespace GCStudyBuddyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserFavoritesController : ControllerBase
    {
        private readonly GcstudyBuddyDbContext _context;

        public UserFavoritesController(GcstudyBuddyDbContext context)
        {
            _context = context;
        }

        // GET: api/UserFavorites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserFavoriteDTO>>> GetUserFavorites()
        {
            var favorites = await _context.UserFavorites.Include(f => f.Question).ToListAsync();

            var favoriteDtos = favorites.Select(f => new UserFavoriteDTO
            {
                FavoriteId = f.FavoriteId,
                UserId = f.UserId,
                QuestionId = f.QuestionId,
               Question = new QaDTO
               {
                   Id= f.FavoriteId,
                   Question = f.Question!.Question,
                   Answer = f.Question.Answer,
               }
            }).ToList();

            return Ok(favoriteDtos);
        }

        // GET: api/UserFavorites/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserFavoriteDTO>> GetUserFavorite(int id)
        {
            var favoriteQuestion = await _context.Qas.FindAsync(id);

            if (favoriteQuestion == null)
            {
                return BadRequest();
            }
            var questionDto = new QaDTO
            {
                Id = id,
                Question = favoriteQuestion.Question,
                Answer = favoriteQuestion.Answer
            };

            return Ok(questionDto);
        }

        // PUT: api/UserFavorites/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserFavorite(int id, UserFavorite userFavorite)
        {
            if (id != userFavorite.FavoriteId)
            {
                return BadRequest();
            }

            _context.Entry(userFavorite).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserFavoriteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UserFavorites
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserFavoriteDTO>> PostUserFavorite(UserFavoriteDTO userFavoriteDto)
        {
            if(userFavoriteDto == null)
            {
                return BadRequest();
            }

            var newFavorite = new UserFavorite
            {
                UserId = userFavoriteDto.UserId,
                QuestionId = userFavoriteDto.QuestionId,
            };

            _context.UserFavorites.Add(newFavorite);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserFavorite), new { id = newFavorite.FavoriteId }, new UserFavoriteDTO
            {
                FavoriteId = newFavorite.FavoriteId,
                UserId = newFavorite.UserId,
                QuestionId = newFavorite.QuestionId,
            });
        }

        // DELETE: api/UserFavorites/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserFavorite(int id)
        {
            var userFavorite = await _context.UserFavorites.FindAsync(id);
            if (userFavorite == null)
            {
                return NotFound();
            }

            _context.UserFavorites.Remove(userFavorite);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserFavoriteExists(int id)
        {
            return _context.UserFavorites.Any(e => e.FavoriteId == id);
        }
    }
}
