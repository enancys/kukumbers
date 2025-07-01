import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const GameVideoUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [videoData, setVideoData] = useState({
        game_id: "",
        title: "",
        video_url: "",
        thumbnail_url: "",
        duration: "",
        sort_order: 0,
    });

    const [games, setGames] = useState([]);

    const getVideo = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/game_videos/${id}`)
            .then(response => {
                setVideoData(response.data.data);
            })
            .catch(error => {
                alert("Error fetching video data: ", error);
            });
    }, [id]);

    const getGames = () => {
        axios.get("http://127.0.0.1:8000/api/games")
            .then(response => {
                setGames(response.data.data);
            })
            .catch(error => {
                alert("Error fetching game list: ", error);
            });
    };

    useEffect(() => {
        getVideo();
        getGames();
    }, [getVideo]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setVideoData({ ...videoData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/game_videos/${id}`, videoData)
            .then(() => {
                alert("Game video updated successfully!");
                navigate("/admin/game_videos");
            })
            .catch(error => {
                alert("Failed to update video: ", error);
            });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Update Game Video</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Game:</label>
                            <select
                                name="game_id"
                                value={videoData.game_id}
                                onChange={handleInputChange}
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
                            <label>Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={videoData.title}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Video URL:</label>
                            <input
                                type="text"
                                name="video_url"
                                value={videoData.video_url}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Thumbnail URL:</label>
                            <input
                                type="text"
                                name="thumbnail_url"
                                value={videoData.thumbnail_url}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Duration (in seconds):</label>
                            <input
                                type="number"
                                name="duration"
                                value={videoData.duration || ""}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Sort Order:</label>
                            <input
                                type="number"
                                name="sort_order"
                                value={videoData.sort_order}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Update Video
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GameVideoUpdate;
