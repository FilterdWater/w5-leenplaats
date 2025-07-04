<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advertisement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'price',
        'user_id',
        'picture_link',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'advertisement_has_categories', 'advertisement_id', 'category_id');
    }

    protected $casts = [
        'price' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pictures()
    {
        return $this->belongsToMany(Picture::class, 'advertisement_has_pictures', 'advertisement_id', 'picture_id');
    }

    public function bookmarkedBy()
    {
        return $this->belongsToMany(User::class, 'user_bookmark');
    }

    public function rentals()
    {
        return $this->hasMany(Rental::class);
    }

    public function getIsRentedAttribute()
    {
        return $this->rentals()->where('end_date', '>=', now()->startOfDay())->whereIn('status', ['pending', 'confirmed'])->exists();
    }
}
