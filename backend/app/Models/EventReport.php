<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Transaction;
class EventReport extends Model
{
    protected $fillable = [
        'transaction_id',
        'evaluation',
        'documentation'
    ];
    public function transaction()
{
    return $this->belongsTo(Transaction::class);
}
}
