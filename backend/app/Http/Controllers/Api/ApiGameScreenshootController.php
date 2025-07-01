<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GameScreenshoot;
use Illuminate\Http\Request;

class ApiGameScreenshootController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $screenshots = GameScreenshoot::with('game')->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar screenshot berhasil dimuat',
            'data' => $screenshots
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'game_id' => 'required|exists:games,id',
            'image_url' => 'required|string|max:500',
            'caption' => 'nullable|string|max:255',
            'sort_order' => 'required|integer',
        ]);

        $screenshot = GameScreenshoot::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Screenshot berhasil ditambahkan',
            'data' => $screenshot
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $screenshot = GameScreenshoot::with('game')->findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => "Screenshot dengan ID {$id} berhasil ditemukan",
            'data' => $screenshot
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'game_id' => 'sometimes|required|exists:games,id',
            'image_url' => 'sometimes|required|string|max:500',
            'caption' => 'nullable|string|max:255',
            'sort_order' => 'sometimes|required|integer',
        ]);

        $screenshot = GameScreenshoot::findOrFail($id);
        $screenshot->update($validated);

        return response()->json([
            'success' => true,
            'message' => "Screenshot dengan ID {$id} berhasil diperbarui",
            'data' => $screenshot
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $screenshot = GameScreenshoot::findOrFail($id);
        $screenshot->delete();

        return response()->json([
            'success' => true,
            'message' => "Screenshot berhasil dihapus",
            'data' => $screenshot
        ], 200);
    }
}
