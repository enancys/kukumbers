<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserGameLibrary;
use Illuminate\Http\Request;

class ApiUserGameLibraryController extends Controller
{
    /**
     * Tampilkan semua data library.
     */
    public function index()
    {
        $libraries = UserGameLibrary::with(['user', 'game'])->get();

        return response()->json([
            'success' => true,
            'message' => 'Data user_game_library berhasil dimuat',
            'data' => $libraries
        ], 200);
    }

    /**
     * Simpan entri baru ke library.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'game_id' => 'required|exists:games,id',
            'status' => 'required|in:want_to_play,playing,completed,dropped',
            'added_at' => 'nullable|date',
            'completed_at' => 'nullable|date',
            'play_time_hours' => 'required|integer|min:0',
        ]);

        $library = UserGameLibrary::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Game berhasil ditambahkan ke library',
            'data' => $library
        ], 201);
    }

    /**
     * Tampilkan data library berdasarkan ID.
     */
    public function show(string $id)
    {
        $library = UserGameLibrary::with(['user', 'game'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => "Data dengan ID {$id} berhasil ditemukan",
            'data' => $library
        ], 200);
    }

    /**
     * Perbarui data library.
     */
    public function update(Request $request, string $id)
    {
        $library = UserGameLibrary::findOrFail($id);

        $validated = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'game_id' => 'sometimes|required|exists:games,id',
            'status' => 'sometimes|required|in:want_to_play,playing,completed,dropped',
            'added_at' => 'nullable|date',
            'completed_at' => 'nullable|date',
            'play_time_hours' => 'sometimes|required|integer|min:0',
        ]);

        $library->update($validated);

        return response()->json([
            'success' => true,
            'message' => "Data library ID {$id} berhasil diperbarui",
            'data' => $library
        ], 200);
    }

    /**
     * Hapus data dari library.
     */
    public function destroy(string $id)
    {
        $library = UserGameLibrary::findOrFail($id);
        $library->delete();

        return response()->json([
            'success' => true,
            'message' => "Game di library ID {$id} berhasil dihapus",
            'data' => $library
        ], 200);
    }

    public function userLibrary(Request $request)
    {
        $user = $request->user();

        $libraries = $user->gameLibraries()->with('game')->get();

        return response()->json([
            'success' => true,
            'message' => 'Library user berhasil dimuat',
            'data' => $libraries
        ]);
    }

}
