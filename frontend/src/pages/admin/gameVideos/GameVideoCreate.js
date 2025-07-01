import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const GameVideoCreate = () => {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [videoData, setVideoData] = useState({
        game_id: "",
        title: "",
        video_url: "",
        thumbnail_url: "",
        duration: "",
        sort_order: 0,
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/games")
            .then(response => setGames(response.data.data))
            .catch(error => alert("Error fetching games: " + error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVideoData({ ...videoData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        axios.post("http://127.0.0.1:8000/api/game_videos", videoData)
            .then(response => {
                setSuccessMessage("Game video created successfully!");
                setTimeout(() => {
                    navigate("/admin/game_videos");
                }, 1500);
            })
            .catch(error => {
                console.error("Error creating video:", error);
                setError("Failed to create game video. Please check your input.");
            });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Create Game Video</h1>
            <Link to="/admin/game_videos" className="btn btn-secondary mb-2">Back</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Game</label>
                            <select
                                name="game_id"
                                value={videoData.game_id}
                                onChange={handleChange}
                                className="form-control"
                                required
                            >
                                <option value="">-- Select Game --</option>
                                {games.map((game) => (
                                    <option key={game.id} value={game.id}>
                                        {game.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={videoData.title}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Video URL</label>
                            <input
                                type="text"
                                name="video_url"
                                value={videoData.video_url}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Thumbnail URL</label>
                            <input
                                type="text"
                                name="thumbnail_url"
                                value={videoData.thumbnail_url}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Duration (seconds)</label>
                            <input
                                type="number"
                                name="duration"
                                value={videoData.duration}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Sort Order</label>
                            <input
                                type="number"
                                name="sort_order"
                                value={videoData.sort_order}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GameVideoCreate;
