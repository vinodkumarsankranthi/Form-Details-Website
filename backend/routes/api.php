<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormController;

Route::get('/form-data', [FormController::class, 'getAllForms']);
Route::get('/form-data/{id}', [FormController::class, 'getForm']);
Route::post('/form-submit1', [FormController::class, 'submitForm']);
Route::post('/form-update/{id}', [FormController::class, 'updateForm']);
Route::delete('/form-delete/{id}', [FormController::class, 'deleteForm']);
