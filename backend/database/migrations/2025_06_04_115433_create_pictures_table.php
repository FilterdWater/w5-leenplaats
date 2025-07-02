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
        Schema::create('pictures', function (Blueprint $table) {
            $table->id();
            $table->longText('picture_base_string');
            $table->timestamps();
        });

        Schema::create('advertisement_has_pictures', function (Blueprint $table) {
            $table->foreignId('advertisement_id')->constrained()->onDelete('cascade');
            $table->foreignId('picture_id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pictures');
    }
};
