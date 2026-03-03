<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::create([
            'category_name' => 'MPLS',
            'description' => 'Program Masa Pengenalan Lingkungan Sekolah untuk siswa SMP/MTs dan SMA/SMK/MA dengan berbagai pilihan paket kegiatan.'
        ]);

        Category::create([
            'category_name' => 'LDKMS',
            'description' => 'Latihan Dasar Kepemimpinan Manajemen Siswa dengan materi kepemimpinan, manajemen organisasi, dan character building.'
        ]);

        Category::create([
            'category_name' => 'Bimbel SNBT',
            'description' => 'Program bimbingan belajar persiapan SNBT meliputi TPS, literasi, penalaran matematika, dan try out berkala.'
        ]);

        Category::create([
            'category_name' => 'Seminar',
            'description' => 'Seminar pendidikan meliputi motivasi akademik, personal branding, public speaking, dan kepemimpinan pelajar.'
        ]);

        Category::create([
            'category_name' => 'Outbond',
            'description' => 'Kegiatan outdoor berbasis team building, leadership simulation, problem solving, dan penguatan karakter.'
        ]);
    }
}