<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class ApiCommentController extends Controller
{
    /**
     * Display a listing of the comments.
     */
    public function index()
    {
        $comments = Comment::with(['user', 'game'])->get();

        return response()->json([
            'success' => true,
            'message' => 'Data komentar berhasil dimuat',
            'data' => $comments,
        ], 200);
    }

    /**
     * Store a newly created comment.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'game_id' => 'required|exists:games,id',
            'comment_text' => 'required|string',
            'is_approved' => 'boolean',
        ]);

        $comment = Comment::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Komentar berhasil dibuat',
            'data' => $comment,
        ], 201);
    }

    /**
     * Display the specified comment.
     */
    public function show(string $id)
    {
        $comment = Comment::with(['user', 'game'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => "Komentar dengan ID {$id} berhasil ditemukan",
            'data' => $comment,
        ], 200);
    }

    /**
     * Update the specified comment.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'comment_text' => 'sometimes|required|string',
            'is_approved' => 'sometimes|boolean',
        ]);

        $comment = Comment::findOrFail($id);
        $comment->update($validated);

        return response()->json([
            'success' => true,
            'message' => "Komentar dengan ID {$id} berhasil diperbarui",
            'data' => $comment,
        ], 200);
    }

    /**
     * Remove the specified comment.
     */
    public function destroy(string $id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();

        return response()->json([
            'success' => true,
            'message' => "Komentar dengan ID {$id} berhasil dihapus",
            'data' => $comment,
        ], 200);
    }
}
