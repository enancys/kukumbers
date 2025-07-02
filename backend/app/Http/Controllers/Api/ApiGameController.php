<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;
use Illuminate\Support\Str;

class ApiGameController extends Controller
{
    public function index()
    {
        $games = Game::with(['tags'])->get();


        return response()->json([
            'success' => true,
            'message' => 'Daftar game berhasil dimuat',
            'data' => $games,
        ], 200);
    }

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
            'screenshots' => 'nullable|array',
            'is_featured' => 'boolean',
        ]);

        $game = Game::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Game berhasil dibuat',
            'data' => $game,
        ], 201);
    }

    public function show(string $id)
    {
        $game = Game::with(['tags'])->findOrFail($id);


        return response()->json([
            'success' => true,
            'message' => "Game dengan ID {$id} berhasil ditemukan",
            'data' => $game,
        ], 200);
    }

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
            'screenshots' => 'nullable|array',
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

    public function importFromSteam(Request $request)
    {
        $request->validate([
            'steam_id' => 'required|numeric',
        ]);

        $steamId = $request->steam_id;

        $response = Http::withOptions(['verify' => false])
            ->get("https://store.steampowered.com/api/appdetails?appids={$steamId}");

        if (!$response->successful()) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data dari Steam API',
            ], 500);
        }

        $data = $response->json();

        if (!$data[$steamId]['success']) {
            return response()->json([
                'success' => false,
                'message' => 'Steam ID tidak ditemukan atau tidak valid',
            ], 404);
        }

        $gameData = $data[$steamId]['data'];

        $trailerUrl = null;
        if (isset($gameData['movies']) && count($gameData['movies']) > 0) {
            $trailerUrl = $gameData['movies'][0]['webm']['480'] ?? $gameData['movies'][0]['mp4']['480'] ?? null;
        }

        $releaseRaw = $gameData['release_date']['date'] ?? null;
        $releaseDate = now();

        if ($releaseRaw) {
            if (preg_match('/Q([1-4])\s+(\d{4})/', $releaseRaw, $matches)) {
                $quarter = (int) $matches[1];
                $year = (int) $matches[2];
                $month = ($quarter - 1) * 3 + 1;
                $releaseDate = Carbon::createFromDate($year, $month, 1);
            } else {
                try {
                    $releaseDate = Carbon::parse($releaseRaw);
                } catch (\Exception $e) {
                    $releaseDate = now();
                }
            }
        }

        $screenshots = [];
        if (isset($gameData['screenshots']) && is_array($gameData['screenshots'])) {
            foreach ($gameData['screenshots'] as $screenshot) {
                if (isset($screenshot['path_full'])) {
                    $screenshots[] = $screenshot['path_full'];
                }
            }
        }

        $game = Game::create([
            'steam_id' => $steamId,
            'title' => $gameData['name'],
            'description' => $gameData['short_description'] ?? '-',
            'cover_url' => $gameData['header_image'] ?? null,
            'release_date' => $releaseDate,
            'developer' => $gameData['developers'][0] ?? 'Unknown',
            'publisher' => $gameData['publishers'][0] ?? 'Unknown',
            'average_rating' => 0,
            'total_ratings' => 0,
            'steam_app_id' => $steamId,
            'metacritic_score' => $gameData['metacritic']['score'] ?? 0,
            'trailer_url' => $trailerUrl,
            'screenshots' => $screenshots,
            'is_featured' => false,
        ]);

        if (!empty($gameData['genres'])) {
            foreach ($gameData['genres'] as $genre) {
                $tag = \App\Models\Tag::firstOrCreate([
                    'name' => $genre['description'],
                    'slug' => Str::slug($genre['description']),
                ]);

                $game->tags()->syncWithoutDetaching([$tag->id]);

            }
        }


        return response()->json([
            'success' => true,
            'message' => 'Game berhasil diimpor dari Steam',
            'data' => $game,
        ], 201);
    }
}
