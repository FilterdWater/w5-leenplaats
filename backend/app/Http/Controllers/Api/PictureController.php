<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Picture;
use Illuminate\Http\Request;

class PictureController extends Controller
{
    public function index()
    {
        $ads = Picture::all();
        return response()->json($ads);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'pictures' => 'required|array',
            'pictures.*.picture_base_string' => 'required|string',
        ]);

        $created = [];

        foreach ($validated['pictures'] as $pictureData) {
            $created[] = Picture::create([
                'picture_base_string' => $pictureData['picture_base_string'],
            ]);
        }

        return response()->json($created, 201);
    }


    public function show($id)
    {
        return Picture::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $ad = Picture::findOrFail($id);
        $ad->update($request->all());
        return $ad;
    }

    public function destroy($id)
    {
        Picture::destroy($id);
        return response()->noContent();
    }
}

