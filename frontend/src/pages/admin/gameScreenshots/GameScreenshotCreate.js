import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const GameScreenshotCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        game_id: "",
        image_url: "",
        caption: "",
        sort_order: 0,
    });

    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const fetchGames = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/games");
            setGames(response.data.data);
        } catch (error) {
            console.error("Failed to fetch games:", error);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        axios.post("http://127.0.0.1:8000/api/game_screenshots", formData)
            .then(response => {
                setSuccessMessage("Screenshot successfully added!");
                setTimeout(() => {
                    navigate("/admin/game_screenshots");
                }, 1500);
            })
            .catch(error => {
                console.error("Error creating screenshot:", error);
                setError("Failed to create screenshot. Please check your data.");
            });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Add Game Screenshot</h1>
            <Link to="/admin/game_screenshots" className="btn btn-secondary mb-3">Back</Link>

            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <div className="card shadow mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Game</label>
                            <select
                                name="game_id"
                                value={formData.game_id}
                                onChange={handleChange}
                                className="form-control"
                                required
                            >
                                <option value="">-- Select Game --</option>
                                {games.map(game => (
                                    <option key={game.id} value={game.id}>
                                        {game.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Image URL</label>
                            <input
                                type="text"
                                name="image_url"
                                value={formData.image_url}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Caption</label>
                            <input
                                type="text"
                                name="caption"
                                value={formData.caption}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label>Sort Order</label>
                            <input
                                type="number"
                                name="sort_order"
                                value={formData.sort_order}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GameScreenshotCreate;
