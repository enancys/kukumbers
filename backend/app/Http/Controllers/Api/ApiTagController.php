<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class ApiTagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = Tag::all();

        return response()->json([
            'success' => true,
            'message' => 'Daftar tag berhasil dimuat',
            'data' => $tags
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:tags,name',
            'slug' => 'required|string|unique:tags,slug',
        ]);

        $tag = Tag::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Tag berhasil dibuat',
            'data' => $tag
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tag = Tag::with('games')->findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => "Detail tag ID {$id} berhasil dimuat",
            'data' => $tag
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tag = Tag::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|unique:tags,name,' . $id,
            'slug' => 'required|string|unique:tags,slug,' . $id,
        ]);

        $tag->update($validated);

        return response()->json([
            'success' => true,
            'message' => "Tag ID {$id} berhasil diperbarui",
            'data' => $tag
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tag = Tag::findOrFail($id);
        $tag->delete();

        return response()->json([
            'success' => true,
            'message' => "Tag ID {$id} berhasil dihapus",
            'data' => $tag
        ], 200);
    }
}
