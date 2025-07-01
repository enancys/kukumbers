<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GameVideo;
use Illuminate\Http\Request;

class ApiGameVideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     public function index()
    {
        $videos = GameVideo::with('game')->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar video game berhasil dimuat',
            'data' => $videos
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'game_id'       => 'required|exists:games,id',
            'title'         => 'required|string|max:255',
            'video_url'     => 'required|url',
            'thumbnail_url' => 'nullable|url',
            'duration'      => 'nullable|integer',
            'sort_order'    => 'nullable|integer',
        ]);

        $video = GameVideo::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Video game berhasil ditambahkan',
            'data' => $video
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $video = GameVideo::with('game')->findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => 'Data video berhasil ditemukan',
            'data' => $video
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $video = GameVideo::findOrFail($id);

        $validated = $request->validate([
            'game_id'       => 'required|exists:games,id',
            'title'         => 'required|string|max:255',
            'video_url'     => 'required|url',
            'thumbnail_url' => 'nullable|url',
            'duration'      => 'nullable|integer',
            'sort_order'    => 'nullable|integer',
        ]);

        $video->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Video game berhasil diperbarui',
            'data' => $video
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $video = GameVideo::findOrFail($id);
        $video->delete();

        return response()->json([
            'success' => true,
            'message' => 'Video game berhasil dihapus',
            'data' => $video
        ], 200);
    }
}
