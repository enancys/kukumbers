<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;
    protected $fillable = [
        'steam_id',
        'title',
        'description',
        'cover_url',
        'release_date',
        'developer',
        'publisher',
        'average_rating',
        'total_ratings',
        'steam_app_id',
        'metacritic_score',
        'trailer_url',
        'is_featured',
    ];

    protected $casts = [
        'release_date' => 'date',
        'average_rating' => 'decimal:2',
        'is_featured' => 'boolean',
    ];

    public function screenshots()
    {
        return $this->hasMany(GameScreenshoot::class);
    }

    public function tags()
{
    return $this->belongsToMany(Tag::class, 'game_tags');
}


}
