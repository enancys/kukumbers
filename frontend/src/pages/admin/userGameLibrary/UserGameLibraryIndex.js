import React, { useState, useEffect } from "react";
import axios from "axios";

const UserGameLibraryIndex = () => {
    const [libraries, setLibraries] = useState([]);

    const loadLibraries = () => {
        axios.get("http://127.0.0.1:8000/api/user_game_library")
            .then(response => {
                setLibraries(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching user game libraries:", error);
                alert("Gagal memuat data");
            });
    };

    useEffect(() => {
        loadLibraries();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">User Game Library</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User ID</th>
                                    <th>Game ID</th>
                                    <th>Status</th>
                                    <th>Added At</th>
                                    <th>Completed At</th>
                                    <th>Play Time (hrs)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {libraries.map((library, index) => (
                                    <tr key={index}>
                                        <td>{library.id}</td>
                                        <td>{library.user_id}</td>
                                        <td>{library.game_id}</td>
                                        <td>{library.status}</td>
                                        <td>{library.added_at}</td>
                                        <td>{library.completed_at ?? '-'}</td>
                                        <td>{library.play_time_hours}</td>
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

export default UserGameLibraryIndex;
