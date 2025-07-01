import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GameTagIndex = () => {
    const [gameTags, setGameTags] = useState([]);

    const loadGameTags = () => {
        axios.get("http://127.0.0.1:8000/api/game_tags")
            .then(response => {
                setGameTags(response.data.data);
            })
            .catch(error => {
                alert("Error fetching data: ", error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this game tag?")) {
            axios.delete(`http://127.0.0.1:8000/api/game_tags/${id}`)
                .then(() => {
                    alert("Game tag deleted successfully");
                    loadGameTags();
                })
                .catch(error => {
                    alert("Error deleting game tag: ", error);
                });
        }
    };

    useEffect(() => {
        loadGameTags();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Game Tag Data</h1>
            <Link to="/admin/game_tags/create" className="btn btn-primary mb-2">Create</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Game Title</th>
                                    <th>Tag Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gameTags.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.game?.title || 'N/A'}</td>
                                        <td>{item.tag?.name || 'N/A'}</td>
                                        <td>
                                            <Link to={`/admin/game_tags/update/${item.id}`} className="btn btn-sm btn-info">Edit</Link>
                                            <button
                                                onClick={() => handleDelete(item.id)}
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

export default GameTagIndex;
