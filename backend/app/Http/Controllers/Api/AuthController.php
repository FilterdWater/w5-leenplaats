<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = $user->createToken('mobile_token')->plainTextToken;

        $tokenModel = $user->tokens()->latest()->first();
        $tokenModel->expires_at = now()->addMinutes(120);
        $tokenModel->save();

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }
}
