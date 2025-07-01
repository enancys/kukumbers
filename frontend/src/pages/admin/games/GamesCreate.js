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

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-3">Create New Game</h1>
            <Link to="/admin/games" className="btn btn-secondary mb-3">Back</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {[
                            "steam_id", "title", "description", "cover_url",
                            "release_date", "developer", "publisher",
                            "average_rating", "total_ratings",
                            "steam_app_id", "metacritic_score", "trailer_url"
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
