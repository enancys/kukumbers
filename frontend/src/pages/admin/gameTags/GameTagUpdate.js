import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const GameTagUpdate = () => {
    const { id } = useParams(); // ID dari game_tag
    const navigate = useNavigate();

    const [gameTag, setGameTag] = useState({
        game_id: "",
        tag_id: ""
    });
    const [games, setGames] = useState([]);
    const [tags, setTags] = useState([]);

    // Load semua data game dan tag untuk dropdown
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/games").then(res => {
            setGames(res.data.data);
        });

        axios.get("http://127.0.0.1:8000/api/tags").then(res => {
            setTags(res.data.data);
        });

        axios.get(`http://127.0.0.1:8000/api/game_tags/${id}`).then(res => {
            setGameTag(res.data.data);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGameTag(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/game_tags/${id}`, gameTag)
            .then(() => {
                alert("Data berhasil diperbarui!");
                navigate("/admin/game_tags");
            })
            .catch(err => {
                console.error("Gagal update:", err);
                alert("Gagal memperbarui data.");
            });
    };

    return (
        <div className="container">
            <h2>Edit Game Tag</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Game:</label>
                    <select name="game_id" className="form-control" value={gameTag.game_id} onChange={handleChange} required>
                        <option value="">-- Pilih Game --</option>
                        {games.map(game => (
                            <option key={game.id} value={game.id}>{game.title}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Tag:</label>
                    <select name="tag_id" className="form-control" value={gameTag.tag_id} onChange={handleChange} required>
                        <option value="">-- Pilih Tag --</option>
                        {tags.map(tag => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Update</button>
            </form>
        </div>
    );
};

export default GameTagUpdate;
