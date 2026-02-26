<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Confirmation extends Model
{
    protected $table = 'confirmations';

    protected $fillable = [
        'transactions_id', 'image', 'payment_method', 'payment_date', 'status', 'user_id', 'admin_name'
    ];
    

    public function admin() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class, 'transactions_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}