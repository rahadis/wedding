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
            'category_name' => 'MPLS',
            'description' => 'Paket Masa Pengenalan Lingkungan Sekolah untuk siswa baru dengan berbagai kegiatan menarik.'
        ]);

        Category::create([
            'category_name' => 'LDKMS',
            'description' => 'Paket Latihan Dasar Kepemimpinan Mahasiswa/Siswa untuk pengembangan karakter dan organisasi.'
        ]);

        Category::create([
            'category_name' => 'Wisuda & Pelepasan',
            'description' => 'Paket acara wisuda dan pelepasan siswa/mahasiswa dengan dekorasi formal dan berkesan.'
        ]);

        Category::create([
            'category_name' => 'Seminar & Workshop Akademik',
            'description' => 'Paket seminar dan workshop akademik dengan fasilitas lengkap untuk menunjang pembelajaran.'
        ]);

        Category::create([
            'category_name' => 'Kompetisi Pendidikan',
            'description' => 'Paket penyelenggaraan kompetisi pendidikan seperti Olimpiade, LKS, dan lomba akademik lainnya.'
        ]);
    }
}
