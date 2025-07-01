import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const UserGameLibraryUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        user_id: "",
        game_id: "",
        status: "",
        added_at: "",
        completed_at: "",
        play_time_hours: 0
    });

    const [users, setUsers] = useState([]);
    const [games, setGames] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/users").then(res => setUsers(res.data.data));
        axios.get("http://127.0.0.1:8000/api/games").then(res => setGames(res.data.data));
        axios.get(`http://127.0.0.1:8000/api/user_game_library/${id}`).then(res => {
            setFormData(res.data.data);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/user_game_library/${id}`, formData)
            .then(() => {
                alert("Data berhasil diperbarui");
                navigate("/admin/user-game-library");
            })
            .catch(err => {
                console.error("Update error:", err);
                alert("Gagal memperbarui data");
            });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">Edit User Game Library</h1>
            <Link to="/admin/user-game-library" className="btn btn-secondary mb-3">Kembali</Link>
            <div className="card shadow">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>User</label>
                            <select name="user_id" className="form-control" value={formData.user_id} onChange={handleChange} required>
                                <option value="">-- Pilih User --</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Game</label>
                            <select name="game_id" className="form-control" value={formData.game_id} onChange={handleChange} required>
                                <option value="">-- Pilih Game --</option>
                                {games.map(game => (
                                    <option key={game.id} value={game.id}>{game.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select name="status" className="form-control" value={formData.status} onChange={handleChange} required>
                                <option value="">-- Pilih Status --</option>
                                <option value="want_to_play">Ingin Bermain</option>
                                <option value="playing">Sedang Dimainkan</option>
                                <option value="completed">Selesai</option>
                                <option value="dropped">Ditinggalkan</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Added At</label>
                            <input type="datetime-local" name="added_at" className="form-control" value={formData.added_at ?? ''} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Completed At</label>
                            <input type="datetime-local" name="completed_at" className="form-control" value={formData.completed_at ?? ''} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Play Time (hours)</label>
                            <input type="number" name="play_time_hours" className="form-control" value={formData.play_time_hours} onChange={handleChange} min={0} />
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserGameLibraryUpdate;
