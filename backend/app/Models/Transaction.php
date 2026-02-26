<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'transactions';

    protected $fillable = [
        'user_id', 'packages_id', 'event_name', 'event_date', 'special_requests', 'transaction_date', 'total', 'status', 'event_time', 'guest_count', 'venue'
    ];

    public function package()
    {
        return $this->belongsTo(Package::class, 'packages_id');
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function confirmation()
    {
        return $this->hasOne(Confirmation::class, 'transactions_id');
    }

}
