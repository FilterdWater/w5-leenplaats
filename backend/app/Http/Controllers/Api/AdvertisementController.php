<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Advertisement;
use Illuminate\Support\Facades\Auth;

class AdvertisementController extends Controller
{
    public function index()
    {
        $ads = Advertisement::with('categories')->get();
        return response()->json($ads);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'required|string|max:500',
            'price' => 'required|numeric|min:0.01',
            'categories' => 'required|array|min:1',
            'categories.*' => 'integer|exists:categories,id',
            'pictures' => 'required|array|min:1',
            'pictures.*' => 'required|string',
        ]);

        $validated['user_id'] = Auth::id();
        $validated['picture_link'] = $validated['pictures'][0];

        $ad = Advertisement::create($validated);
        $ad->categories()->sync($validated['categories']);

        return response()->json($ad->load('categories'), 201);
    }

    public function show($id)
    {
        return Advertisement::findOrFail($id);
    }

    public function fetchCategories($advertisement_id)
    {
        $advertisement = Advertisement::findOrFail($advertisement_id);
        return response()->json($advertisement->categories);
    }

    public function update(Request $request, $id)
    {
        $ad = Advertisement::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:100',
            'description' => 'sometimes|string|max:500',
            'price' => 'sometimes|numeric|min:0.01',
            'pictures' => 'sometimes|array|min:1',
            'pictures.*' => 'sometimes|string',
        ]);

        $ad->update($validated);
        return response()->json($ad);
    }

    public function destroy($id)
    {
        Advertisement::destroy($id);
        return response()->noContent();
    }
}
