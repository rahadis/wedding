<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {

        //Admin
        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('admin123'),   
            'role' => 'admin',
            'phone' => '081234567890'
        ]);

        //User
        User::create([
            'name' => 'User',
            'email' => 'user@example.com',
            'password' => bcrypt('user123'),   
            'role' => 'user',
            'phone' => '089876543210'
        ]);
    }
}
