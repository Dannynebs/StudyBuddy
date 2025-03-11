using GCStudyBuddyAPI.Entities;

namespace GCStudyBuddyAPI.DTOs
{
    public class UserFavoriteDTO
    {
        public int FavoriteId { get; set; }

        public string? UserId { get; set; }

        public int QuestionId { get; set; }

        public virtual QaDTO? Question { get; set; }
    }
}
