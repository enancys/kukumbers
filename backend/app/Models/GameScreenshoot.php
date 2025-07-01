<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameScreenshoot extends Model
{
    use HasFactory;

    protected $fillable = [
        'game_id',
        'image_url',
        'caption',
        'sort_order',
    ];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }
}
