<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Advertisement extends Model
{
    protected $fillable = [
        'title',
        'description',
        'price',
        'user_id',
        'rented_by',
        'rented_at',
        'rented_until',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'advertisement_has_categories', 'advertisement_id', 'category_id');
    }
}
