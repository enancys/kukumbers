<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GameVideo extends Model
{
    protected $table = 'game_videos';

    protected $fillable = [
        'game_id',
        'title',
        'video_url',
        'thumbnail_url',
        'duration',
        'sort_order',
    ];

    /**
     * Relasi: GameVideo milik satu Game.
     */
    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }
}
