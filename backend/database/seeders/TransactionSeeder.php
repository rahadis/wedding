<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;
use Illuminate\Support\Carbon;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        Transaction::create([
            'user_id' => 2,
            'packages_id' => 1,
            'event_name' => 'Pernikahan Dika & Sari',
            'event_date' => '2025-06-20',
            'event_time' => '10:00',
            'venue' => 'Gedung Serbaguna Harmony',
            'guest_count' => 200,
            'special_requests' => 'Menu vegetarian untuk 10 orang',
            'transaction_date' => Carbon::now()->subDays(5)->format('Y-m-d'),
            'total' => 7500000.00,
            'status' => 'Paid'
        ]);

        Transaction::create([
            'user_id' => 2,
            'packages_id' => 2,
            'event_name' => 'Ulang taun Dika',
            'event_date' => '2025-06-20',
            'event_time' => '10:00',
            'venue' => 'Gedung Serbaguna Harmony',
            'guest_count' => 200,
            'special_requests' => 'Menu vegetarian untuk 10 orang',
            'transaction_date' => Carbon::now()->subDays(5)->format('Y-m-d'),
            'total' => 7500000.00,
            'status' => 'Paid'
        ]);
    }
}
