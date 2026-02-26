<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    protected $table = 'packages';

    protected $fillable = [
        'name', 'description', 'image', 'price', 'categories_id'
    ];

    public function category(){
        return $this->belongsTo(Category::class, 'categories_id', 'id');
    }
}
