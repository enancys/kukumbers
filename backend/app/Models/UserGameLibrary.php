<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserGameLibrary extends Model
{
    protected $table = 'user_game_library';

    protected $fillable = [
        'user_id',
        'game_id',
        'status',
        'added_at',
        'completed_at',
        'play_time_hours',
    ];

    protected $casts = [
        'added_at' => 'datetime',
        'completed_at' => 'datetime',
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
