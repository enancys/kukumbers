import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserWishlistUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [wishlistData, setWishlistData] = useState({
        user_id: "",
        game_id: "",
    });

    const getWishlist = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/user_wishlists/${id}`)
            .then(response => {
                setWishlistData(response.data.data);
            })
            .catch(error => {
                alert("Gagal memuat data wishlist.");
                console.error(error);
            });
    }, [id]);

    useEffect(() => {
        getWishlist();
    }, [getWishlist]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setWishlistData({ ...wishlistData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/user_wishlists/${id}`, wishlistData)
            .then(response => {
                alert("Wishlist berhasil diperbarui.");
                navigate("/admin/user-wishlist");
            })
            .catch(error => {
                alert("Gagal memperbarui data.");
                console.error(error);
            });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-3 text-gray-800">Edit User Wishlist</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
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
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserWishlistUpdate;
