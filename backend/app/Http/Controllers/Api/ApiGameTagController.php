<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GameTag;
use Illuminate\Http\Request;

class ApiGameTagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gameTags = GameTag::with(['game', 'tag'])->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar game-tag berhasil dimuat',
            'data' => $gameTags
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'game_id' => 'required|exists:games,id',
            'tag_id' => 'required|exists:tags,id',
        ]);

        $gameTag = GameTag::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Tag berhasil ditambahkan ke game',
            'data' => $gameTag
        ], 201);
    }

    /**
     * Display a specific game-tag record.
     */
    public function show($id)
    {
        $gameTag = GameTag::with(['game', 'tag'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => 'Data game-tag ditemukan',
            'data' => $gameTag
        ], 200);
    }

    /**
     * Update the specified game-tag record.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'game_id' => 'required|exists:games,id',
            'tag_id' => 'required|exists:tags,id',
        ]);

        $gameTag = GameTag::findOrFail($id);
        $gameTag->update($validated);

        return response()->json([
            'success' => true,
            'message' => "Data game-tag ID {$id} berhasil diperbarui",
            'data' => $gameTag
        ], 200);
    }

    /**
     * Remove the specified game-tag record.
     */
    public function destroy($id)
    {
        $gameTag = GameTag::findOrFail($id);
        $gameTag->delete();

        return response()->json([
            'success' => true,
            'message' => 'Relasi tag-game berhasil dihapus',
            'data' => $gameTag
        ], 200);
    }
}
