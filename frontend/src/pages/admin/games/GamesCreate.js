import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const GameCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        steam_id: "",
        title: "",
        description: "",
        cover_url: "",
        release_date: "",
        developer: "",
        publisher: "",
        average_rating: 0,
        total_ratings: 0,
        steam_app_id: "",
        metacritic_score: "",
        trailer_url: "",
        is_featured: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/games", formData)
            .then(() => {
                alert("Game created successfully!");
                navigate("/admin/games");
            })
            .catch((error) => {
                console.error("Error creating game:", error);
                alert("Failed to create game.");
            });
    };

  const fetchFromSteam = async () => {
    if (!formData.steam_app_id) {
        alert("Masukkan Steam App ID terlebih dahulu.");
        return;
    }

    try {
        const res = await axios.post("http://127.0.0.1:8000/api/games/import-steam", {
            steam_id: formData.steam_app_id
        });

        const data = res.data.data;
        setFormData((prev) => ({
            ...prev,
            steam_id: data.steam_id,
            title: data.title,
            description: data.description,
            cover_url: data.cover_url,
            release_date: data.release_date,
            developer: data.developer,
            publisher: data.publisher,
            metacritic_score: data.metacritic_score,
            trailer_url: data.trailer_url,
        }));

        alert("Data berhasil diambil dari Steam!");
    } catch (error) {
        console.error("Gagal mengambil data dari Steam:", error);
        alert("Gagal mengambil data dari Steam.");
    }
};


    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-3">Create New Game</h1>
            <Link to="/admin/games" className="btn btn-secondary mb-3">Back</Link>

            <div className="card shadow mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {[
                            "steam_app_id", "steam_id", "title", "description", "cover_url",
                            "release_date", "developer", "publisher",
                            "average_rating", "total_ratings",
                            "metacritic_score", "trailer_url"
                        ].map((field, idx) => (
                            <div className="form-group" key={idx}>
                                <label>{field.replace(/_/g, " ").toUpperCase()}</label>
                                <input
                                    type={field === "release_date" ? "date" : "text"}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="form-control"
                                    required={["title", "description", "developer", "publisher"].includes(field)}
                                />
                                {field === "steam_app_id" && (
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-info mt-2"
                                        onClick={fetchFromSteam}
                                    >
                                        Ambil Data dari Steam API
                                    </button>
                                )}
                            </div>
                        ))}

                        <div className="form-group form-check">
                            <input
                                type="checkbox"
                                name="is_featured"
                                checked={formData.is_featured}
                                onChange={handleChange}
                                className="form-check-input"
                            />
                            <label className="form-check-label">Is Featured?</label>
                        </div>

                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GameCreate;
