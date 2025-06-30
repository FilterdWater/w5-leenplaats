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
        $ads = Advertisement::all();
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
            'pictures' => 'required|array|min:1', // Match your frontend field name
            'pictures.*' => 'required|string', // Each image should be a base64 string
        ]);

        foreach ($validated['pictures'] as $index => $image) {
            if (!$this->isValidBase64Image($image)) {
                return response()->json([
                    'message' => 'Invalid image format',
                    'errors' => [
                        "pictures.{$index}" => ['The image must be a valid base64 encoded image']
                    ]
                ], 422);
            }
        }

        $validated['picture_link'] = $validated['pictures'][0];
        $validated['user_id'] = Auth::id();

        // Remove pictures from data since it's not a database field
        unset($validated['pictures']);

        $ad = Advertisement::create($validated);
        unset($validated['pictures']);

        return response()->json([
            'message' => 'Categories attached successfully.',
            'categories' => $advertisement->categories,
        ]);
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

        // Validate images if they're being updated
        if (isset($validated['pictures'])) {
            foreach ($validated['pictures'] as $index => $image) {
                if (!$this->isValidBase64Image($image)) {
                    return response()->json([
                        'message' => 'Invalid image format',
                        'errors' => [
                            "pictures.{$index}" => ['The image must be a valid base64 encoded image']
                        ]
                    ], 422);
                }
            }

            // Update picture_link with first image
            $validated['picture_link'] = $validated['pictures'][0];
            unset($validated['pictures']);
        }

        $ad->update($validated);
        return response()->json($ad);
    }

    public function destroy($id)
    {
        Advertisement::destroy($id);
        return response()->noContent();
    }

    /**
     * Validate if the provided string is a valid base64 image
     */
    private function isValidBase64Image($base64String)
    {
        // Check if it starts with data:image/
        if (!preg_match('/^data:image\/[a-zA-Z]+;base64,/', $base64String)) {
            return false;
        }

        // Extract the base64 part
        $base64Data = preg_replace('/^data:image\/[a-zA-Z]+;base64,/', '', $base64String);

        // Check if it's valid base64
        if (!base64_decode($base64Data, true)) {
            return false;
        }

        return true;
    }
}
