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
        'screenshots', // ✅ tambahkan ini
        'is_featured',
    ];

    protected $casts = [
        'release_date' => 'date',
        'average_rating' => 'decimal:2',
        'is_featured' => 'boolean',
        'screenshots' => 'array', // ✅ supaya otomatis decode ke array
    ];

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'game_tags');
    }
}
