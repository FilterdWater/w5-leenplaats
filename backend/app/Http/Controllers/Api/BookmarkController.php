<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookmarkController extends Controller
{
    public function index()
    {
        return Auth::user()->bookmarks()->with(['pictures', 'user', 'rentals'])->get()->map(function ($ad) {
            $ad->append('is_rented');
            return $ad;
        });
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'advertisement_id' => 'required|integer|exists:advertisements,id',
        ]);

        $user = Auth::user();
        $user->bookmarks()->syncWithoutDetaching([$validated['advertisement_id']]);

        return response()->json(['message' => 'Added to bookmarks']);
    }


    public function destroy(Request $request)
    {
        $validated = $request->validate([
            'advertisement_id' => 'required|integer|exists:advertisements,id',
        ]);

        $user = Auth::user();
        $user->bookmarks()->detach($validated['advertisement_id']);

        return response()->json(['message' => 'Removed from bookmarks']);
    }
}

