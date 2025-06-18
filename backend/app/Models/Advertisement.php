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
}
