<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $ads = Category::all();
        return response()->json($ads);
    }

    public function store(Request $request)
    {
        $ad = Category::create($request->all());
        return response()->json($ad, 201);
    }

    public function show($id)
    {
        return Category::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $ad = Category::findOrFail($id);
        $ad->update($request->all());
        return $ad;
    }

    public function destroy($id)
    {
        Category::destroy($id);
        return response()->noContent();
    }
}

