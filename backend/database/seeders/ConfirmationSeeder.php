<?php

namespace Database\Seeders;

use App\Models\Confirmation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class ConfirmationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Confirmation::create([
            'transactions_id' => 1,
            'image' => 'bukti1.jpg',
            'payment_method' => "Bca",
            'payment_date' => Carbon::now()->subDays(1)->format('Y-m-d'),
            'status' => 'Waiting verification',
            'user_id' => 2,
            'admin_name' => null
        ]);

        Confirmation::create([
            'transactions_id' => 2,
            'image' => 'bukti1.jpg',
            'payment_method' => "Bca",
            'payment_date' => Carbon::now()->subDays(1)->format('Y-m-d'),
            'status' => 'Waiting verification',
            'user_id' => 2,
            'admin_name' => null
        ]);
    }
}