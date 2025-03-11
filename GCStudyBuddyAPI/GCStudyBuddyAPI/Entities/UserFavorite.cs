using System;
using System.Collections.Generic;

namespace GCStudyBuddyAPI.Entities;

public partial class UserFavorite
{
    public int FavoriteId { get; set; }

    public string? UserId { get; set; }

    public int QuestionId { get; set; }

    public virtual Qa? Question { get; set; }
}
