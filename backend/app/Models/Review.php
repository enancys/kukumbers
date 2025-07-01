<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    protected $table = 'reviews';

    protected $fillable = [
        'user_id',
        'game_id',
        'rating',
        'review_text',
        'is_approved',
    ];

    /**
     * Relasi: Review dimiliki oleh User.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi: Review dimiliki oleh Game.
     */
    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }
}
