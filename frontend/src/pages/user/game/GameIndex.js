import { useEffect, useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Calendar, Star, Plus } from "lucide-react";
import api from "../../../lib/api"; // ubah path sesuai struktur kamu
import { useAuth } from "../../../hooks/use-auth"; // ubah path sesuai struktur kamu
import { Link } from "react-router-dom";
import ComponentHeader from "../../../components/user/ComponentHeader";

export default function GamesIndex() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth();

    const fetchGames = async () => {
        try {
            const response = await api.get("/api/games");
            setGames(response.data.data);
        } catch (error) {
            console.error("Failed to fetch games", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-10 text-white text-center">
                <p className="text-lg">Loading games...</p>
            </div>
        );
    }

    const handleAddToLibrary = async (gameId) => {
        const storedUser = localStorage.getItem("auth_user");
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (!user) {
            alert("Silakan login terlebih dahulu.");
            return;
        }

        try {
            await api.post("/api/user_game_library", {
                user_id: user.id,
                game_id: gameId,
                status: "want_to_play",
                play_time_hours: 0
            });

            alert("Game berhasil ditambahkan ke library!");
        } catch (error) {
            if (error.response?.status === 409) {
                alert("Game sudah ada di library kamu.");
            } else {
                console.error("Gagal menambahkan ke library:", error);
                alert("Terjadi kesalahan saat menambahkan game.");
            }
        }
    };


    return (
        <>
            <ComponentHeader />
            <div className="min-h-screen bg-slate-900 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-white mb-10 text-center">
                        Browse All Games
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                        {games.map((game) => (
                            <Card
                                key={game.id}
                                className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 hover:scale-[1.02] group"
                            >
                                <div className="relative h-48 w-full overflow-hidden">
                                    <img
                                        src={game.cover_url || "/placeholder.png"}
                                        alt={game.title}
                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <Badge className="bg-emerald-500 text-white text-xs flex items-center gap-1">
                                            <Star className="h-3 w-3" />
                                            {typeof game.average_rating === "number"
                                                ? game.average_rating.toFixed(1)
                                                : "N/A"}

                                        </Badge>
                                    </div>
                                </div>

                                <CardContent className="p-4 space-y-3">
                                    <h2 className="text-lg font-semibold text-white line-clamp-2">
                                        {game.title}
                                    </h2>

                                    <div className="flex items-center text-slate-400 text-xs">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {new Date(game.release_date).getFullYear()}
                                    </div>

                                    <p className="text-slate-300 text-sm line-clamp-2">
                                        {game.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1">
                                        {game.tags?.slice(0, 3).map((tag) => (
                                            <Badge
                                                key={tag.id}
                                                variant="outline"
                                                className="text-xs border-slate-600 text-slate-300"
                                            >
                                                {tag.name}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-3">
                                        <Link to={`/games/${game.id}`}>
                                            <Button
                                                size="sm"
                                                className="bg-emerald-500 hover:bg-emerald-600 text-xs px-3 py-1"
                                            >
                                                View
                                            </Button>
                                        </Link>

                                        {isAuthenticated && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-xs"
                                                onClick={() => handleAddToLibrary(game.id)}
                                            >
                                                <Plus className="w-3 h-3 mr-1" />
                                                Add to Library
                                            </Button>
                                        )}


                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
