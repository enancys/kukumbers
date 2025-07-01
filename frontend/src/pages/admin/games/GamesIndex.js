import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GameIndex = () => {
    const [games, setGames] = useState([]);

    const loadGames = () => {
        axios.get('http://127.0.0.1:8000/api/games')
            .then(response => {
                setGames(response.data.data);
            })
            .catch(error => {
                alert('Error fetching games: ' + error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this game?')) {
            axios.delete(`http://127.0.0.1:8000/api/games/${id}`)
                .then(() => {
                    alert('Game deleted successfully');
                    loadGames();
                })
                .catch(error => {
                    alert('Error deleting game: ' + error);
                });
        }
    };

    useEffect(() => {
        loadGames();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-3">Games List</h1>
            <Link to="/admin/games/create" className="btn btn-primary mb-3">Create New Game</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Developer</th>
                                    <th>Publisher</th>
                                    <th>Release Date</th>
                                    <th>Rating</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {games.map((game, index) => (
                                    <tr key={index}>
                                        <td>{game.id}</td>
                                        <td>{game.title}</td>
                                        <td>{game.developer}</td>
                                        <td>{game.publisher}</td>
                                        <td>{game.release_date}</td>
                                        <td>{game.average_rating}</td>
                                        <td>
                                            <Link to={`/admin/games/update/${game.id}`} className="btn btn-sm btn-info mr-2">Edit</Link>
                                            <button onClick={() => handleDelete(game.id)} className="btn btn-sm btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {games.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center">No games found.</td>
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

export default GameIndex;
