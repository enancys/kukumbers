import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const GameTagCreate = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        game_id: "",
        tag_id: ""
    });

    const [games, setGames] = useState([]);
    const [tags, setTags] = useState([]);

    // Ambil data game & tag dari API
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/games").then((res) => {
            setGames(res.data.data);
        });

        axios.get("http://127.0.0.1:8000/api/tags").then((res) => {
            setTags(res.data.data);
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/game_tags", formData)
            .then(() => {
                alert("Game tag berhasil ditambahkan");
                navigate("/admin/game_tags");
            })
            .catch((error) => {
                console.error("Gagal tambah data:", error);
                alert("Gagal menambahkan game tag.");
            });
    };

    return (
        <div className="container">
            <h2 className="mb-3">Tambah Game Tag</h2>
            <Link to="/admin/game_tags" className="btn btn-secondary mb-3">Kembali</Link>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Game:</label>
                    <select name="game_id" className="form-control" value={formData.game_id} onChange={handleChange} required>
                        <option value="">-- Pilih Game --</option>
                        {games.map(game => (
                            <option key={game.id} value={game.id}>{game.title}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group mt-3">
                    <label>Tag:</label>
                    <select name="tag_id" className="form-control" value={formData.tag_id} onChange={handleChange} required>
                        <option value="">-- Pilih Tag --</option>
                        {tags.map(tag => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-success mt-4">Simpan</button>
            </form>
        </div>
    );
};

export default GameTagCreate;
