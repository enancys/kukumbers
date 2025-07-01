<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\Request;

class ApiGameController extends Controller
{
    /**
     * Display a listing of all games.
     */
    public function index()
    {
        $games = Game::with(['screenshots', 'tags'])->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar game berhasil dimuat',
            'data' => $games,
        ], 200);
    }

    /**
     * Store a newly created game.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'steam_id' => 'nullable|string',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'cover_url' => 'nullable|string|max:500',
            'release_date' => 'required|date',
            'developer' => 'required|string|max:255',
            'publisher' => 'required|string|max:255',
            'average_rating' => 'nullable|numeric|between:0,10',
            'total_ratings' => 'nullable|integer',
            'steam_app_id' => 'nullable|integer',
            'metacritic_score' => 'nullable|integer',
            'trailer_url' => 'nullable|string|max:500',
            'is_featured' => 'boolean',
        ]);

        $game = Game::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Game berhasil dibuat',
            'data' => $game,
        ], 201);
    }

    /**
     * Display the specified game.
     */
    public function show(string $id)
    {
        $game = Game::with(['screenshots', 'tags'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => "Game dengan ID {$id} berhasil ditemukan",
            'data' => $game,
        ], 200);
    }

    /**
     * Update the specified game.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'steam_id' => 'nullable|string',
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'cover_url' => 'nullable|string|max:500',
            'release_date' => 'sometimes|required|date',
            'developer' => 'sometimes|required|string|max:255',
            'publisher' => 'sometimes|required|string|max:255',
            'average_rating' => 'nullable|numeric|between:0,10',
            'total_ratings' => 'nullable|integer',
            'steam_app_id' => 'nullable|integer',
            'metacritic_score' => 'nullable|integer',
            'trailer_url' => 'nullable|string|max:500',
            'is_featured' => 'boolean',
        ]);

        $game = Game::findOrFail($id);
        $game->update($validated);

        return response()->json([
            'success' => true,
            'message' => "Game dengan ID {$id} berhasil diperbarui",
            'data' => $game,
        ], 200);
    }

    /**
     * Remove the specified game.
     */
    public function destroy(string $id)
    {
        $game = Game::findOrFail($id);
        $game->delete();

        return response()->json([
            'success' => true,
            'message' => "Game dengan ID {$id} berhasil dihapus",
            'data' => $game,
        ], 200);
    }
}
