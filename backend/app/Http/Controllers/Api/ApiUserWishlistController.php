<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserWishlist;
use Illuminate\Http\Request;

class ApiUserWishlistController extends Controller
{
    /**
     * Tampilkan semua data wishlist.
     */
    public function index()
    {
        $wishlists = UserWishlist::with(['user', 'game'])->get();

        return response()->json([
            'success' => true,
            'message' => 'Data wishlist berhasil dimuat',
            'data' => $wishlists
        ], 200);
    }

    /**
     * Tambahkan entri baru ke wishlist.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'game_id' => 'required|exists:games,id',
        ]);

        $exists = UserWishlist::where('user_id', $validated['user_id'])
            ->where('game_id', $validated['game_id'])
            ->exists();

        if ($exists) {
            // return sukses false tapi tidak dianggap error HTTP
            return response()->json([
                'success' => false,
                'message' => 'Game sudah ada di wishlist',
            ], 200); // status OK agar tidak error di frontend
        }

        $wishlist = UserWishlist::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Game berhasil ditambahkan ke wishlist',
            'data' => $wishlist
        ], 201);
    }

    /**
     * Tampilkan wishlist berdasarkan ID.
     */
    public function show(string $id)
    {
        $wishlist = UserWishlist::with(['user', 'game'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => "Wishlist ID {$id} ditemukan",
            'data' => $wishlist
        ], 200);
    }

    /**
     * Perbarui wishlist.
     */
    public function update(Request $request, string $id)
    {
        $wishlist = UserWishlist::findOrFail($id);

        $validated = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'game_id' => 'sometimes|required|exists:games,id',
        ]);

        $wishlist->update($validated);

        return response()->json([
            'success' => true,
            'message' => "Wishlist ID {$id} berhasil diperbarui",
            'data' => $wishlist
        ], 200);
    }

    /**
     * Hapus dari wishlist.
     */
    public function destroy(string $id)
    {
        $wishlist = UserWishlist::findOrFail($id);
        $wishlist->delete();

        return response()->json([
            'success' => true,
            'message' => "Wishlist ID {$id} berhasil dihapus",
            'data' => $wishlist
        ], 200);
    }

    public function userWishlist(Request $request)
    {
        $userId = $request->user()->id;

        $wishlists = UserWishlist::with('game')
            ->where('user_id', $userId)
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Wishlist user berhasil dimuat',
            'data' => $wishlists
        ]);
    }

}
