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
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string('steam_id')->nullable()->index();
            $table->string('title');
            $table->text('description');
            $table->string('cover_url', 500)->nullable();
            $table->date('release_date');
            $table->string('developer');
            $table->string('publisher');
            $table->decimal('average_rating', 3, 2)->default(0.00);
            $table->integer('total_ratings')->default(0);
            $table->integer('steam_app_id')->nullable();
            $table->integer('metacritic_score')->nullable();
            $table->string('trailer_url', 500)->nullable();
            $table->timestamps();
            $table->boolean('is_featured')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
