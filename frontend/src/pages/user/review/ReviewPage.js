import { useEffect, useState } from "react";
import api from "../../../lib/api";
import { Star } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

export default function ReviewPage() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await api.get("/api/reviews");
                setReviews(res.data.data);
            } catch (err) {
                console.error("Gagal memuat review", err);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    if (loading) return <div className="text-white p-6">Memuat review...</div>;

    return (
        
            reviews.map((review) => (
                <Card key={review.id} className="bg-slate-900 border border-slate-700 shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-4">

                        {/* Cover Game */}
                        <div className="md:col-span-1">
                            <img
                                src={review.game?.cover_url || "/placeholder.svg"}
                                alt={review.game?.title || "Game"}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Isi Review */}
                        <div className="md:col-span-3 p-4 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <h2 className="text-xl font-bold text-white">
                                        {review.game?.title || "Game tidak ditemukan"}
                                    </h2>
                                    <div className="flex items-center gap-1 bg-yellow-500 text-black px-2 py-1 rounded text-sm font-semibold">
                                        <Star className="w-4 h-4" />
                                        {review.rating}/10
                                    </div>
                                </div>
                                <p className="text-slate-300 leading-relaxed mb-2">"{review.review_text}"</p>
                            </div>
                            <p className="text-sm text-slate-500 italic">Ditulis oleh: {review.user?.name || "Anonim"}</p>
                        </div>
                    </div>
                </Card>
            ))
        


    );
}
