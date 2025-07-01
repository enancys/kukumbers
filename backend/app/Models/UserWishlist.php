<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserWishlist extends Model
{
    protected $table = 'user_wishlist';

    protected $fillable = [
        'user_id',
        'game_id',
    ];

    // Relasi ke User
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke Game
    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }
}
