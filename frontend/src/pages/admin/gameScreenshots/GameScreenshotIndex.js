import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GameScreenshotIndex = () => {
    const [screenshots, setScreenshots] = useState([]);

    const loadScreenshots = () => {
        axios.get("http://127.0.0.1:8000/api/game_screenshots")
            .then(response => {
                setScreenshots(response.data.data);
            })
            .catch(error => {
                alert("Error loading screenshots: " + error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this screenshot?")) {
            axios.delete(`http://127.0.0.1:8000/api/game_screenshots/${id}`)
                .then(() => {
                    alert("Screenshot deleted successfully!");
                    loadScreenshots();
                })
                .catch(error => {
                    alert("Failed to delete screenshot: " + error);
                });
        }
    };

    useEffect(() => {
        loadScreenshots();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-3">Game Screenshots</h1>
            <Link to="/admin/game_screenshots/create" className="btn btn-primary mb-3">Add Screenshot</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Game ID</th>
                                    <th>Image</th>
                                    <th>Caption</th>
                                    <th>Sort Order</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {screenshots.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.game_id}</td>
                                        <td>
                                            <img src={item.image_url} alt="Screenshot" width="120" />
                                        </td>
                                        <td>{item.caption}</td>
                                        <td>{item.sort_order}</td>
                                        <td>
                                            <Link to={`/admin/game_screenshots/update/${item.id}`} className="btn btn-sm btn-info mr-1">Edit</Link>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="btn btn-sm btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {screenshots.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameScreenshotIndex;
