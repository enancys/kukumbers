import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Gamepad2, Star, Calendar, Plus, Heart } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import api from "../../../lib/api";
import { useAuth } from "../../../hooks/use-auth";
import ComponentHeader from "../../../components/user/ComponentHeader";

export default function GamePage() {
    const { id } = useParams();
    const { isAuthenticated, user } = useAuth();
    const [game, setGame] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        rating: "",
        review_text: "",
    });

console.log("User:", user);
console.log("isAuthenticated:", isAuthenticated);

    const submitReview = async () => {
        try {
            await api.post("/api/reviews", {
                user_id: user.id,
                game_id: parseInt(id),
                rating: parseInt(newReview.rating),
                review_text: newReview.review_text,
                is_approved: true, // Bisa juga false jika butuh moderasi
            });

            alert("Ulasan berhasil dikirim!");
            setNewReview({ rating: "", review_text: "" });
            fetchReviews(); // Refresh review list
        } catch (err) {
            console.error("Gagal mengirim ulasan", err);
            alert("Gagal mengirim ulasan. Pastikan semua kolom terisi dengan benar.");
        }
    };

    const fetchReviews = async () => {
        try {
            const res = await api.get("/api/reviews");
            const filtered = res.data.data.filter((r) => r.game.id === parseInt(id));
            setReviews(filtered);
        } catch (err) {
            console.error("Gagal memuat ulasan", err);
        }
    };

    const fetchGame = async () => {
        if (!id) return;
        try {
            const response = await api.get(`/api/games/${id}`);
            setGame(response.data.data);
            setError(null);
        } catch (err) {
            setError("Failed to load game.");
        } finally {
            setLoading(false);
        }
    };

    const fetchWishlist = async () => {
        try {
            const res = await api.get("/api/user_wishlists");
            setWishlist(res.data.data.map((item) => item.game.id));
        } catch (err) {
            console.error("Gagal mengambil wishlist", err);
        }
    };

    const addToWishlist = async () => {
        try {
            const res = await api.post("/api/user_wishlists", {
                user_id: user.id,
                game_id: parseInt(id),
            });
            if (res.data.success) {
                setWishlist([...wishlist, parseInt(id)]);
                alert("Game berhasil ditambahkan ke wishlist!");
            }
        } catch (err) {
            if (err.response && err.response.status === 409) {
                alert("Game sudah ada di wishlist kamu.");
            } else {
                console.error("Gagal menambahkan ke wishlist", err);
            }
        }
    };


    useEffect(() => {
        fetchGame();
        fetchReviews();
        if (isAuthenticated) fetchWishlist();
    }, [id, isAuthenticated]);


    const isWishlisted = wishlist.includes(parseInt(id));

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-10 text-center text-white">
                <p>Loading game details...</p>
            </div>
        );
    }

    if (error || !game) {
        return (
            <div className="container mx-auto px-4 py-10 text-center text-red-500">
                <p>{error || "Game not found."}</p>
            </div>
        );
    }

    return (
        <>
            <ComponentHeader />
            <div className="container mx-auto px-4 py-12 text-white">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="relative aspect-video rounded overflow-hidden">
                        <img
                            src={game.cover_url || "/placeholder.svg"}
                            alt={game.title}
                            className="w-full h-full object-cover rounded"
                        />
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold mb-2">{game.title}</h1>

                        <div className="flex items-center gap-3 mb-4">
                            {isAuthenticated && (
                                <button
                                    onClick={addToWishlist}
                                    disabled={isWishlisted}
                                    title={
                                        isWishlisted
                                            ? "Sudah ada di wishlist"
                                            : "Tambah ke wishlist"
                                    }
                                    className={`text-pink-500 hover:text-pink-400 ${isWishlisted
                                        ? "opacity-60 cursor-not-allowed"
                                        : ""
                                        }`}
                                >
                                    <Heart
                                        fill={isWishlisted ? "#ec4899" : "none"}
                                        stroke="#ec4899"
                                        className="w-5 h-5"
                                    />
                                </button>
                            )}

                            <Badge className="bg-emerald-500 text-white flex items-center">
                                <Star className="h-4 w-4 mr-1" />
                                {typeof game.average_rating === "number"
                                    ? game.average_rating.toFixed(1)
                                    : "N/A"}
                            </Badge>
                            <Badge variant="outline" className="text-white border-white flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(game.release_date).getFullYear()}
                            </Badge>
                            <button
                                onClick={addToWishlist}
                                disabled={isWishlisted}
                                title={
                                    isWishlisted
                                        ? "Sudah ada di wishlist"
                                        : "Tambah ke wishlist"
                                }
                                className={`text-pink-500 hover:text-pink-400 ${isWishlisted
                                    ? "opacity-60 cursor-not-allowed"
                                    : ""
                                    }`}
                            >
                                <Heart
                                    fill={isWishlisted ? "#ec4899" : "none"}
                                    stroke="#ec4899"
                                    className="w-5 h-5"
                                />
                            </button>


                        </div>


                        <p className="text-slate-300 mb-6">{game.description}</p>

                        <div className="mb-4">
                            <p>
                                <strong>Developer:</strong> {game.developer}
                            </p>
                            <p>
                                <strong>Publisher:</strong> {game.publisher}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {game.tags?.map((tag) => (
                                <Badge
                                    key={tag.id}
                                    variant="outline"
                                    className="border-slate-600 text-slate-300"
                                >
                                    {tag.name}
                                </Badge>
                            ))}
                        </div>

                        <div className="relative aspect-video rounded overflow-hidden">
                            <img
                                src={game.cover_url || "/placeholder.svg"}
                                alt={game.title}
                                className="w-full h-full object-cover rounded"
                            />
                            {game.trailer_url && (
                                <video
                                    controls
                                    className="absolute top-0 left-0 w-full h-full object-cover rounded"
                                    style={{ backgroundColor: "#000" }}
                                >
                                    <source src={game.trailer_url} type="video/webm" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>

                        {game.screenshots?.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Screenshots</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {game.screenshots.map((url, index) => (
                                        <div key={index} className="rounded overflow-hidden">
                                            <img
                                                src={url}
                                                alt={`Screenshot ${index + 1}`}
                                                className="w-full h-auto object-cover rounded"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {game.tags?.map((tag) => (
                            <Badge
                                key={tag.id}
                                variant="outline"
                                className="border-slate-600 text-slate-300"
                            >
                                {tag.name}
                            </Badge>
                        ))}

                        {isAuthenticated && (
                            <div className="mt-6">
                                <h2 className="text-lg font-semibold mb-2">Tulis Ulasan Kamu</h2>

                                <div className="mb-4">
                                    <label className="block text-sm text-slate-300 mb-1">Rating (1-10)</label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={10}
                                        className="w-full px-3 py-2 rounded bg-slate-800 text-white"
                                        value={newReview.rating}
                                        onChange={(e) =>
                                            setNewReview({ ...newReview, rating: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm text-slate-300 mb-1">Ulasan</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-3 py-2 rounded bg-slate-800 text-white"
                                        value={newReview.review_text}
                                        onChange={(e) =>
                                            setNewReview({ ...newReview, review_text: e.target.value })
                                        }
                                    />
                                </div>

                                {reviews.length > 0 && (
                                    <div className="mt-8">
                                        <h2 className="text-lg font-semibold mb-4">Ulasan Pengguna</h2>
                                        <div className="space-y-4">
                                            {reviews.map((review) => (
                                                <Card key={review.id}>
                                                    <CardContent className="p-4">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <div className="font-semibold">{review.user.name}</div>
                                                            <Badge className="bg-yellow-500 text-white">
                                                                {review.rating}/10
                                                            </Badge>
                                                        </div>
                                                        <p className="text-slate-300">{review.review_text}</p>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                        )}

                        <Button
                            onClick={submitReview}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Kirim Ulasan
                        </Button>




                        {isAuthenticated && (
                            <Button className="bg-emerald-500 hover:bg-emerald-600">
                                <Plus className="h-4 w-4 mr-2" />
                                Add to Library
                            </Button>
                        )}
                    </div>
                </div>
            </div >
        </>
    );
}
