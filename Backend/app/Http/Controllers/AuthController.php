<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
	public function register(Request $request)
	{
		$validated = $request->validate([
			'name' => 'required|string|max:255',
			'email' => 'required|string|email|max:255|unique:users',
			'password' => 'required|string|min:8|confirmed',
		]);

		$user = User::create([
			'name' => $validated['name'],
			'email' => $validated['email'],
			'password' => Hash::make($validated['password']),
		]);

		return response()->json([
			'message' => 'Registration successful.',
			'user' => $user,
		], 201);
	}

	public function login(Request $request)
	{
		$credentials = $request->validate([
			'email' => 'required|string|email',
			'password' => 'required|string',
		]);

		if (!Auth::attempt($credentials)) {
			throw ValidationException::withMessages([
				'email' => ['Invalid credentials.'],
			]);
		}

		$user = Auth::user();

		$token = $user->createToken('api-token')->plainTextToken;

		return response()->json([
			'message' => 'Login successful.',
			'user' => $user,
			'token' => $token,
		]);
	}

	public function logout(Request $request)
	{
		$user = Auth::user();
		$user->tokens()->delete();

		Auth::logout();

		$request->session()->invalidate();
		$request->session()->regenerateToken();

		return response()->json([
			'message' => 'Logged out successfully.',
		]);
	}
}