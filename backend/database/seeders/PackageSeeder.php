<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    public function run(): void
    {
        // 1. MPLS

        Package::create([
            'name' => 'MPLS Gold',
            'description' => 'Pemateri profesional + Fasilitator + Konsep & Rundown Acara + Tim Dokumentasi + Konsumsi (4 Jam)',
            'image' => 'mpls_gold.jpg',
            'price' => 1000000,
            'categories_id' => 1,
        ]);

        Package::create([
            'name' => 'MPLS Silver',
            'description' => 'Pemateri + Fasilitator + Tim Dokumentasi (4 Jam)',
            'image' => 'mpls_silver.jpg',
            'price' => 700000,
            'categories_id' => 1,
        ]);

        Package::create([
            'name' => 'MPLS Classic',
            'description' => 'Fasilitator + Tim Dokumentasi (4 Jam)',
            'image' => 'mpls_classic.jpg',
            'price' => 500000,
            'categories_id' => 1,
        ]);


        // 2. LDKMS

        Package::create([
            'name' => 'LDKMS Advance Leader',
            'description' => '3 Hari 2 Malam - Kepemimpinan Visioner, Manajemen Organisasi, Public Speaking, Leadership Camp',
            'image' => 'ldkms_advance.jpg',
            'price' => 1500000,
            'categories_id' => 2,
        ]);

        Package::create([
            'name' => 'LDKMS Intermediate Leader',
            'description' => '2 Hari 1 Malam - Kepemimpinan, Manajemen Organisasi Sekolah, Public Speaking, Leadership Games',
            'image' => 'ldkms_intermediate.jpg',
            'price' => 1000000,
            'categories_id' => 2,
        ]);

        Package::create([
            'name' => 'LDKMS Basic Leader',
            'description' => '1 Hari - Dasar Kepemimpinan, Organisasi OSIS/MPK, Etika Siswa, Public Speaking Dasar',
            'image' => 'ldkms_basic.jpg',
            'price' => 700000,
            'categories_id' => 2,
        ]);


        // 3. Bimbel SNBT

        Package::create([
            'name' => 'Bimbel SNBT Intensif',
            'description' => 'TPS, Literasi BI & Inggris, Penalaran Matematika, Try Out Berkala, Pembahasan Soal Intensif',
            'image' => 'snbt_intensif.jpg',
            'price' => 1200000,
            'categories_id' => 3,
        ]);

        Package::create([
            'name' => 'Bimbel SNBT Reguler',
            'description' => 'Materi SNBT lengkap + Modul Digital + Simulasi Try Out + Progress Report',
            'image' => 'snbt_reguler.jpg',
            'price' => 800000,
            'categories_id' => 3,
        ]);


        // 4. Seminar

        Package::create([
            'name' => 'Seminar Motivasi Akademik',
            'description' => 'Motivasi Akademik + Personal Branding + Public Speaking + Sertifikat',
            'image' => 'seminar_motivasi.jpg',
            'price' => 1500000,
            'categories_id' => 4,
        ]);

        Package::create([
            'name' => 'Seminar Kepemimpinan Pelajar',
            'description' => 'Kepemimpinan Pelajar + Pendidikan Karakter + Moderator + Dokumentasi',
            'image' => 'seminar_leadership.jpg',
            'price' => 1300000,
            'categories_id' => 4,
        ]);


        // 5. Outbond

        Package::create([
            'name' => 'Outbond Leadership Camp',
            'description' => 'Team Building Challenge + Leadership Simulation + Character Strengthening',
            'image' => 'outbond_leadership.jpg',
            'price' => 2000000,
            'categories_id' => 5,
        ]);

        Package::create([
            'name' => 'Outbond Team Building',
            'description' => 'Problem Solving Games + Communication Training + Fasilitator Profesional',
            'image' => 'outbond_teambuilding.jpg',
            'price' => 1500000,
            'categories_id' => 5,
        ]);
    }
}