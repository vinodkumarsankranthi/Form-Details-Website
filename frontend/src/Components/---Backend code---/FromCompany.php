<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FromCompany extends Model
{
    protected $fillable = [
        'name',
        'address',
        'gst',
        'pan_number',
        'logo',
        'official_mail_id',
        'phone_number',
        'mail_id',
        'contact_person_name',
        'designation',
        'bank_name',
        'bank_branch',
        'bank_account_no',
        'bank_ifsc_code',
        'sign_image',
        'stamp_image',
        'website_link', // New field
        'is_approved',
        'created_by',
        'modified_by',
    ];

    protected $table = 'from_company';

    use HasFactory;
}