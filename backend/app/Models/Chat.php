<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $fillable = [
    'user_id',
    'admin_id',
    'message',
    'sender'
];
}
