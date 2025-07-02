import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserWishlistIndex = () => {
    const [wishlists, setWishlists] = useState([]);

    const loadWishlists = () => {
        axios.get("http://127.0.0.1:8000/api/user_wishlists")
            .then(response => {
                setWishlists(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching wishlists:", error);
                alert("Gagal memuat data wishlist.");
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Yakin ingin menghapus wishlist ini?")) {
            axios.delete(`http://127.0.0.1:8000/api/user_wishlists/${id}`)
                .then(() => {
                    alert("Wishlist berhasil dihapus.");
                    loadWishlists();
                })
                .catch(error => {
                    console.error("Error deleting wishlist:", error);
                    alert("Gagal menghapus data.");
                });
        }
    };

    useEffect(() => {
        loadWishlists();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-3 text-gray-800">User Wishlist</h1>
            <Link to="/admin/user_wishlists/create" className="btn btn-primary mb-3">Tambah Wishlist</Link>

            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User ID</th>
                                    <th>Game ID</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlists.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.user_id}</td>
                                        <td>{item.game_id}</td>
                                        <td>
                                            <Link to={`/admin/user-wishlist/update/${item.id}`} className="btn btn-sm btn-info mr-1">Edit</Link>
                                            <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {wishlists.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center">Tidak ada data</td>
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

export default UserWishlistIndex;
