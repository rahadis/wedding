<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Wedding
        Package::create([
            'name' => 'Paket Wedding Modern Glam',
            'description' => 'Venue indoor + Dekorasi glamor + Dokumentasi full day',
            'image' => 'wedding_glam.jpg',
            'price' => 12000000,
            'categories_id' => 1,
        ]);
        Package::create([
            'name' => 'Paket Wedding Rustic',
            'description' => 'Venue outdoor + Dekorasi kayu + Dokumentasi half day',
            'image' => 'wedding_rustic.jpg',
            'price' => 10000000,
            'categories_id' => 1,
        ]);
        Package::create([
            'name' => 'Paket Wedding Classic',
            'description' => 'Venue ballroom + Dekorasi klasik + Dokumentasi full day',
            'image' => 'wedding_classic.jpg',
            'price' => 13000000,
            'categories_id' => 1,
        ]);
        Package::create([
            'name' => 'Paket Wedding Outdoor Elegan',
            'description' => 'Taman outdoor + Dekorasi elegan + Dokumentasi drone',
            'image' => 'wedding_outdoor_elegan.jpg',
            'price' => 14000000,
            'categories_id' => 1,
        ]);

        //Birthday
        Package::create([
            'name' => 'Paket Ulang Tahun Aesthetic',
            'description' => 'Dekorasi ala Pinterest + Neon Sign',
            'image' => 'birthday_aesthetic.jpeg',
            'price' => 3000000,
            'categories_id' => 2,
        ]);
        Package::create([
            'name' => 'Paket Ulang Tahun Tema Kartun',
            'description' => 'Dekorasi karakter + Balon warna-warni',
            'image' => 'birthday_cartoon.jpg',
            'price' => 2500000,
            'categories_id' => 2,
        ]);
        Package::create([
            'name' => 'Paket Ulang Tahun Minimalis',
            'description' => 'Dekorasi sederhana + Kue custom',
            'image' => 'birthday_minimalist.jpg',
            'price' => 2000000,
            'categories_id' => 2,
        ]);
        Package::create([
            'name' => 'Paket Ulang Tahun Outdoor',
            'description' => 'Lokasi taman + Permainan anak + Snack box',
            'image' => 'birthday_outdoor.jpg',
            'price' => 3500000,
            'categories_id' => 2,
        ]);

        //Concert
        Package::create([
            'name' => 'Paket Konser Musik Full Package',
            'description' => 'Stage + Sound system + Lighting + MC',
            'image' => 'concert_full.jpg',
            'price' => 15000000,
            'categories_id' => 3,
        ]);
        Package::create([
            'name' => 'Paket Event Outdoor',
            'description' => 'Tenda besar + Sound system + Panggung minimalis',
            'image' => 'event_outdoor.jpg',
            'price' => 9000000,
            'categories_id' => 3,
        ]);
        Package::create([
            'name' => 'Paket Pertunjukan Seni',
            'description' => 'Dekorasi tema + Sound system + Lighting artistik',
            'image' => 'arts_performance.jpg',
            'price' => 12000000,
            'categories_id' => 3,
        ]);
        Package::create([
            'name' => 'Paket Hiburan Mini',
            'description' => 'MC + Musik live akustik + Dekorasi sederhana',
            'image' => 'mini_entertainment.jpg',
            'price' => 7000000,
            'categories_id' => 3,
        ]);

        //Graduation
        Package::create([
            'name' => 'Paket Graduation Garden Party',
            'description' => 'Outdoor setup + Foto Booth + Snack Table',
            'image' => 'graduation_garden.jpeg',
            'price' => 5500000,
            'categories_id' => 4,
        ]);
        Package::create([
            'name' => 'Paket Graduation Indoor',
            'description' => 'Dekorasi aula + Musik live + Catering',
            'image' => 'graduation_indoor.jpg',
            'price' => 6000000,
            'categories_id' => 4,
        ]);
        Package::create([
            'name' => 'Paket Graduation Simple',
            'description' => 'Dekorasi minimalis + Kue ulang tahun',
            'image' => 'graduation_simple.jpg',
            'price' => 4000000,
            'categories_id' => 4,
        ]);
        Package::create([
            'name' => 'Paket Graduation Themed Party',
            'description' => 'Tema vintage + Live band + Photobooth',
            'image' => 'graduation_themed.jpg',
            'price' => 7000000,
            'categories_id' => 4,
        ]);

        //Engagement
        Package::create([
            'name' => 'Paket Engagement Bohemian',
            'description' => 'Tema rustic + Lampu gantung + Standing Flowers',
            'image' => 'engagement_boho.jpeg',
            'price' => 6000000,
            'categories_id' => 5,
        ]);
        Package::create([
            'name' => 'Paket Engagement Classic',
            'description' => 'Dekorasi elegan + Musik akustik',
            'image' => 'engagement_classic.jpeg',
            'price' => 6500000,
            'categories_id' => 5,
        ]);
        Package::create([
            'name' => 'Paket Engagement Modern',
            'description' => 'Dekorasi minimalis + Foto profesional',
            'image' => 'engagement_modern.jpg',
            'price' => 5500000,
            'categories_id' => 5,
        ]);
        Package::create([
            'name' => 'Paket Engagement Garden',
            'description' => 'Tema taman + Lampu fairy + Catering kecil',
            'image' => 'engagement_garden.jpg',
            'price' => 7000000,
            'categories_id' => 5,
        ]);
    }
}
