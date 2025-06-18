<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(User::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6',
            'address' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:20',
            'city' => 'nullable|string|max:100',
        ]);

        $user = User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'address' => $validated['address'] ?? null,
            'zip_code' => $validated['zip_code'] ?? null,
            'city' => $validated['city'] ?? null,
        ]);

        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

public function emailExists(string $email)
{
    $exists = User::where('email', $email)->exists();

    return response()->json([
        'exists' => $exists,
    ]);
}


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        $user->update($validated);

        return new UserResource($user);
    }

    public function updatePassword(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'current_password' => 'required',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if (!Hash::check($validated['current_password'], $user->password)) {
            return response()->json([
                'errors' => [
                    'current_password' => ['The current password is incorrect.'],
                ]
            ], 422);
        }

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json(['message' => 'Password updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'password' => ['required'],
        ]);

        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'error' => [
                    'field' => 'password',
                    'message' => 'The password you entered is incorrect.',
                ],
            ], 422);
        }

        $user->tokens()->delete();

        $user->forceDelete();

        return response()->json(['message' => 'Account deleted successfully.']);
    }
}
