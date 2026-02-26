<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('packages_id')->constrained()->onDelete('cascade');
            $table->string('event_name');
            $table->date('event_date');
            $table->string('event_time');
            $table->string('venue');
            $table->integer('guest_count');
            $table->text('special_requests');
            $table->date('transaction_date');
            $table->decimal('total', 12, 2);
            $table->enum('status', ['Waiting verification', 'Paid', 'Rejected']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
