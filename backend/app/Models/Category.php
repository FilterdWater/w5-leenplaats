<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
    ];

    public function advertisements()
    {
        return $this->belongsToMany(Advertisement::class, 'advertisement_has_categories', 'category_id', 'advertisement_id');
    }
}
