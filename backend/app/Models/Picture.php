<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Picture extends Model
{
    use HasFactory;

    protected $fillable = [
        'picture_base_string',
    ];

    public function advertisements()
    {
        return $this->belongsToMany(Advertisement::class, 'advertisement_has_pictures', 'picture_id', 'advertisement_id');
    }
}
