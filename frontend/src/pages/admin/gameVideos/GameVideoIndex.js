import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GameVideoIndex = () => {
    const [gameVideos, setGameVideos] = useState([]);

    const loadGameVideos = () => {
        axios.get("http://127.0.0.1:8000/api/game_videos")
            .then(response => {
                setGameVideos(response.data.data);
            })
            .catch(error => {
                alert("Error fetching game videos: ", error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this video?")) {
            axios.delete(`http://127.0.0.1:8000/api/game_videos/${id}`)
                .then(() => {
                    alert("Video deleted successfully");
                    loadGameVideos();
                })
                .catch(error => {
                    alert("Error deleting video: ", error);
                });
        }
    };

    useEffect(() => {
        loadGameVideos();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Game Videos</h1>
            <Link to="/admin/game_videos/create" className="btn btn-primary mb-2">Create</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Game Title</th>
                                    <th>Title</th>
                                    <th>Video URL</th>
                                    <th>Thumbnail</th>
                                    <th>Duration</th>
                                    <th>Sort Order</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gameVideos.map((video, index) => (
                                    <tr key={index}>
                                        <td>{video.id}</td>
                                        <td>{video.game?.title || "N/A"}</td>
                                        <td>{video.title}</td>
                                        <td>
                                            <a href={video.video_url} target="_blank" rel="noreferrer">
                                                Link
                                            </a>
                                        </td>
                                        <td>
                                            {video.thumbnail_url ? (
                                                <img src={video.thumbnail_url} alt="Thumbnail" width="100" />
                                            ) : "N/A"}
                                        </td>
                                        <td>{video.duration ?? "-"}</td>
                                        <td>{video.sort_order}</td>
                                        <td>
                                            <Link to={`/admin/game_videos/update/${video.id}`} className="btn btn-sm btn-info">Edit</Link>
                                            <button
                                                onClick={() => handleDelete(video.id)}
                                                className="btn btn-sm btn-danger ml-1">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameVideoIndex;
