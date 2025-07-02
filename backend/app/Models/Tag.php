<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $table = 'tags';

    protected $fillable = [
        'name',
        'slug',
    ];

    public function games()
    {
        return $this->belongsToMany(Game::class, 'game_tags')->withTimestamps();
    }
}
