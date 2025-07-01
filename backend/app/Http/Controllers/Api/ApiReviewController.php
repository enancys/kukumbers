<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ApiReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
       public function index()
    {
        $reviews = Review::with(['user', 'game'])->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar ulasan berhasil dimuat',
            'data' => $reviews
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id'     => 'required|exists:users,id',
            'game_id'     => 'required|exists:games,id',
            'rating'      => 'required|integer|min:1|max:10',
            'review_text' => 'required|string',
            'is_approved' => 'boolean',
        ]);

        $review = Review::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Ulasan berhasil ditambahkan',
            'data' => $review
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $review = Review::with(['user', 'game'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => 'Detail ulasan berhasil dimuat',
            'data' => $review
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);

        $validated = $request->validate([
            'user_id'     => 'required|exists:users,id',
            'game_id'     => 'required|exists:games,id',
            'rating'      => 'required|integer|min:1|max:10',
            'review_text' => 'required|string',
            'is_approved' => 'boolean',
        ]);

        $review->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Ulasan berhasil diperbarui',
            'data' => $review
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();

        return response()->json([
            'success' => true,
            'message' => 'Ulasan berhasil dihapus',
            'data' => $review
        ], 200);
    }
}
