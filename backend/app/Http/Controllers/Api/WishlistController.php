<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    public function index()
    {
        return Auth::user()->wishlist;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'advertisement_id' => 'required|integer|exists:advertisements,id',
        ]);

        $user = Auth::user();
        $user->wishlist()->syncWithoutDetaching([$validated['advertisement_id']]);

        return response()->json(['message' => 'Added to wishlist']);
    }


    public function destroy(Request $request)
    {
        $validated = $request->validate([
            'advertisement_id' => 'required|integer|exists:advertisements,id',
        ]);

        $user = Auth::user();
        $user->wishlist()->detach($validated['advertisement_id']);

        return response()->json(['message' => 'Removed from wishlist']);
    }
}

