<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('form_details', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('mobile_number');
            $table->text('address');
            $table->string('profile_photo');
            $table->string('resume');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('form_details');
    }
};
