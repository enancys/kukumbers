import React, { useEffect, useState } from "react";
import api from "../../../lib/api";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Calendar, Star, Clock, Heart } from "lucide-react";
import ComponentHeader from "../../../components/user/ComponentHeader";

const DashboardGameLibrary = () => {
    const [library, setLibrary] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loadingLibrary, setLoadingLibrary] = useState(true);
    const [loadingWishlist, setLoadingWishlist] = useState(true);

    const fetchUserLibrary = async () => {
        try {
            const response = await api.get("/api/user-game-library", {
                withCredentials: true,
            });
            setLibrary(response.data.data);
        } catch (error) {
            console.error("Failed to load user game library", error);
        } finally {
            setLoadingLibrary(false);
        }
    };

    const fetchUserWishlist = async () => {
        try {
            const response = await api.get("/api/user-wishlist", {
                withCredentials: true,
            });
            setWishlist(response.data.data);
        } catch (error) {
            console.error("Failed to load user wishlist", error);
        } finally {
            setLoadingWishlist(false);
        }
    };

    useEffect(() => {
        fetchUserLibrary();
        fetchUserWishlist();
    }, []);

    if (loadingLibrary || loadingWishlist) {
        return (
            <div className="container mx-auto text-white py-10 text-center">
                <p>Loading your game library & wishlist...</p>
            </div>
        );
    }

    
    return (
        <>
        
            <ComponentHeader />
            <div className="min-h-screen bg-slate-900 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-white mb-6">Your Game Library</h1>

                    {library.length === 0 ? (
                        <p className="text-slate-400">You haven't added any games to your library.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                            {library.map((item) => (
                                <Card key={item.id} className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={item.game.cover_url || "/placeholder.svg"}
                                            alt={item.game.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <CardContent className="p-4 space-y-2">
                                        <h2 className="text-lg text-white font-semibold">{item.game.title}</h2>
                                        <p className="text-slate-300 text-sm line-clamp-2">{item.game.description}</p>
                                        <div className="flex gap-2 flex-wrap">
                                            <Badge className="bg-emerald-500 text-white text-xs flex items-center">
                                                <Star className="w-3 h-3 mr-1" />
                                                {typeof item.game.average_rating === "number"
                                                    ? item.game.average_rating.toFixed(1)
                                                    : "N/A"}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs border-white text-white flex items-center">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {new Date(item.game.release_date).getFullYear()}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs border-slate-500 text-slate-300 flex items-center">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {item.play_time_hours} hrs
                                            </Badge>
                                            <Badge variant="outline" className="text-xs border-indigo-400 text-indigo-300">
                                                {item.status}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    <h2 className="text-2xl font-bold text-white mb-6">Your Wishlist</h2>

                    {wishlist.length === 0 ? (
                        <p className="text-slate-400">You haven't added any games to your wishlist.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {wishlist.map((item) => (
                                <Card key={item.id} className="bg-slate-700 border border-slate-600 rounded-lg overflow-hidden">
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={item.game.cover_url || "/placeholder.svg"}
                                            alt={item.game.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <CardContent className="p-4 space-y-2">
                                        <h2 className="text-lg text-white font-semibold flex items-center">
                                            <Heart className="w-4 h-4 text-pink-400 mr-1" />
                                            {item.game.title}
                                        </h2>
                                        <p className="text-slate-300 text-sm line-clamp-2">{item.game.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default DashboardGameLibrary;
