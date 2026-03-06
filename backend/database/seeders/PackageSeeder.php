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
        // MPLS (ID: 1)
        Package::create([
            'name' => 'MPLS Gold',
            'description' => 'Paket premium pengenalan sekolah dengan outbound lengkap, ice breaking, seminar motivasi, dan merchandise.',
            'image' => 'mpls_fun.jpg',
            'price' => 5000000,
            'duration' => '3 Hari',
            'target_audience' => 'Siswa Baru (SMP/SMA)',
            'categories_id' => 1,
        ]);
        Package::create([
            'name' => 'MPLS Silver',
            'description' => 'Paket menengah pengenalan sekolah dengan outbound, ice breaking, dan seminar motivasi.',
            'image' => 'mpls_leadership.jpg',
            'price' => 3500000,
            'duration' => '3 Hari',
            'target_audience' => 'Siswa Baru (SMP/SMA)',
            'categories_id' => 1,
        ]);
        Package::create([
            'name' => 'MPLS Classic',
            'description' => 'Paket dasar pengenalan sekolah dengan ice breaking dan materi pengenalan dasar.',
            'image' => 'mpls_classic.jpg',
            'price' => 2000000,
            'duration' => '2 Hari',
            'target_audience' => 'Siswa Baru (SMP/SMA)',
            'categories_id' => 1,
        ]);

        // LDKMS (ID: 2)
        Package::create([
            'name' => 'LDKMS Kepemimpinan',
            'description' => 'Pelatihan kepemimpinan intensif dengan simulasi manajemen organisasi dan karakter.',
            'image' => 'ldkms_basic.jpg',
            'price' => 4000000,
            'duration' => '2 Hari 1 Malam',
            'target_audience' => 'Pengurus OSIS/BEM',
            'categories_id' => 2,
        ]);
        Package::create([
            'name' => 'LDKMS Dasar',
            'description' => 'Pelatihan dasar kepemimpinan dan pengenalan organisasi sekolah.',
            'image' => 'ldkms_advance.jpg',
            'price' => 2500000,
            'duration' => '1 Hari',
            'target_audience' => 'Calon Pengurus Organisasi',
            'categories_id' => 2,
        ]);

        // Wisuda & Pelepasan (ID: 3)
        Package::create([
            'name' => 'Wisuda Elegan & Formal',
            'description' => 'Dekorasi panggung formal, sound system premium, dan dokumentasi lengkap.',
            'image' => 'wisuda_elegant.jpg',
            'price' => 15000000,
            'duration' => '1 Hari',
            'target_audience' => 'Siswa/Mahasiswa Lulusan',
            'categories_id' => 3,
        ]);
        Package::create([
            'name' => 'Pesta Perpisahan Outdoor',
            'description' => 'Acara pelepasan santai dengan tema garden party dan live music.',
            'image' => 'perpisahan_outdoor.jpg',
            'price' => 12000000,
            'duration' => '1 Hari',
            'target_audience' => 'Siswa/Mahasiswa Lulusan',
            'categories_id' => 3,
        ]);

        // Seminar & Workshop Akademik (ID: 4)
        Package::create([
            'name' => 'Seminar Pendidikan Nasional',
            'description' => 'Seminar dengan pembicara ahli pendidikan, fasilitas sertifikat, dan lunch box.',
            'image' => 'seminar_pendidikan.jpg',
            'price' => 6000000,
            'duration' => '1 Hari',
            'target_audience' => 'Guru, Dosen, & Mahasiswa',
            'categories_id' => 4,
        ]);
        Package::create([
            'name' => 'Workshop IT & Coding',
            'description' => 'Pelatihan praktis pemrograman dengan instruktur berpengalaman.',
            'image' => 'workshop_it.jpg',
            'price' => 9000000,
            'duration' => '2 Hari',
            'target_audience' => 'Siswa/Mahasiswa IT',
            'categories_id' => 4,
        ]);

        // Kompetisi Pendidikan (ID: 5)
        Package::create([
            'name' => 'Olimpiade Sains & Matematika',
            'description' => 'Penyelenggaraan lomba akademik dengan sistem penilaian digital.',
            'image' => 'olimpiade_sains.jpg',
            'price' => 10000000,
            'duration' => '1 Hari',
            'target_audience' => 'Siswa SD/SMP/SMA',
            'categories_id' => 5,
        ]);
        Package::create([
            'name' => 'Lomba Karya Ilmiah Remaja',
            'description' => 'Kompetisi presentasi penelitian dan inovasi teknologi.',
            'image' => 'kir.jpg',
            'price' => 8500000,
            'duration' => '2 Hari',
            'target_audience' => 'Siswa SMA/Mahasiswa',
            'categories_id' => 5,
        ]);
    }
}
