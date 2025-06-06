<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFromCompanyTable extends Migration
{
    public function up()
    {
        Schema::create('from_company', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('address')->nullable();
            $table->string('gst')->nullable();
            $table->string('pan_number')->nullable();
            $table->string('logo')->nullable();
            $table->string('official_mail_id')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('mail_id')->nullable();
            $table->string('contact_person_name')->nullable();
            $table->string('designation')->nullable();
            $table->string('bank_name')->nullable();
            $table->string('bank_branch')->nullable();
            $table->string('bank_account_no')->nullable();
            $table->string('bank_ifsc_code')->nullable();
            $table->string('sign_image')->nullable();
            $table->string('stamp_image')->nullable();
            $table->string('website_link')->nullable(); // New field
            $table->boolean('is_approved')->default(false);
            $table->string('created_by')->nullable();
            $table->string('modified_by')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('from_company');
    }
}