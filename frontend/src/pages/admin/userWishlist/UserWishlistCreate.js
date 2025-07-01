import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const UserWishlistCreate = () => {
    const navigate = useNavigate();
    const [wishlistData, setWishlistData] = useState({
        user_id: "",
        game_id: "",
    });

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setWishlistData({ ...wishlistData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        axios.post("http://127.0.0.1:8000/api/user_wishlists", wishlistData)
            .then(response => {
                setSuccessMessage("Wishlist berhasil ditambahkan!");
                setTimeout(() => {
                    navigate("/admin/user-wishlist");
                }, 1500);
            })
            .catch(error => {
                setError("Gagal menambahkan wishlist. Silakan coba lagi.");
                console.error(error);
            });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-3">Add Wishlist</h1>
            <Link to="/admin/user-wishlist" className="btn btn-secondary mb-2">Back</Link>

            <div className="card shadow mb-4">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>User ID:</label>
                            <input
                                type="number"
                                name="user_id"
                                value={wishlistData.user_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Game ID:</label>
                            <input
                                type="number"
                                name="game_id"
                                value={wishlistData.game_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserWishlistCreate;
