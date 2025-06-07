<?php


use Illuminate\Support\Facades\Route;

// Route default (optional)
Route::get('/', function () {
    return response()->json(['message' => 'Laravel backend is running.']);
});