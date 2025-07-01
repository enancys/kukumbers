<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class GameTag extends Pivot
{
    protected $table = 'game_tag';

    protected $fillable = [
        'game_id',
        'tag_id',
    ];

    public $timestamps = true; // Karena tabel ini memiliki created_at dan updated_at
}
