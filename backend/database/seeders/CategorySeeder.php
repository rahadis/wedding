<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'category_name' => 'Wedding',
            'description' => 'Paket pernikahan dengan berbagai tema seperti glamor, rustic, dan outdoor elegan.'
        ]);

        Category::create([
            'category_name' => 'Birthday',
            'description' => 'Paket ulang tahun dengan tema aesthetic, kartun, minimalis, dan outdoor party.'
        ]);

        Category::create([
            'category_name' => 'Concert & Entertainment',
            'description' => 'Paket acara hiburan seperti konser musik, pertunjukan, dan event outdoor seru.'
        ]);

        Category::create([
            'category_name' => 'Graduation Party',
            'description' => 'Paket pesta kelulusan dengan dekorasi indoor, outdoor, dan tema kekinian.'
        ]);

        Category::create([
            'category_name' => 'Engagement',
            'description' => 'Paket acara lamaran dengan tema rustic, bohemian, klasik, dan garden party.'
        ]);
    }
}
