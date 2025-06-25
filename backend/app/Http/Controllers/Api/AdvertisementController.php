<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Advertisement;
use Illuminate\Support\Facades\Auth;


class AdvertisementController extends Controller
{
    public function index()
    {
        $ads = Advertisement::all();
        return response()->json($ads);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'required|string|max:500',
            'price' => 'required|numeric|min:0.01',
        ]);

        $validated['user_id'] = Auth::id();

        $ad = Advertisement::create($validated);

        return response()->json($ad, 201);
    }

    public function show($id)
    {
        return Advertisement::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $ad = Advertisement::findOrFail($id);
        $ad->update($request->all());
        return $ad;
    }

    public function destroy($id)
    {
        Advertisement::destroy($id);
        return response()->noContent();
    }
}

