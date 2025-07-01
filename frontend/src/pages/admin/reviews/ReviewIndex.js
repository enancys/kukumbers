import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ReviewIndex = () => {
    const [reviews, setReviews] = useState([]);

    const loadReviews = () => {
        axios.get('http://127.0.0.1:8000/api/reviews')
            .then(response => {
                setReviews(response.data.data);
            })
            .catch(error => {
                alert('Error fetching reviews:', error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure want to delete this review?')) {
            axios.delete(`http://127.0.0.1:8000/api/reviews/${id}`)
                .then(() => {
                    alert('Review deleted successfully');
                    loadReviews();
                })
                .catch(error => {
                    alert('Error deleting review:', error);
                });
        }
    };

    useEffect(() => {
        loadReviews();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Review List</h1>
            <Link to="/admin/review/create" className="btn btn-primary mb-2">Add Review</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User ID</th>
                                    <th>Game ID</th>
                                    <th>Rating</th>
                                    <th>Review</th>
                                    <th>Approved</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reviews.map((review, index) => (
                                    <tr key={index}>
                                        <td>{review.id}</td>
                                        <td>{review.user_id}</td>
                                        <td>{review.game_id}</td>
                                        <td>{review.rating}</td>
                                        <td>{review.review_text}</td>
                                        <td>{review.is_approved ? "Yes" : "No"}</td>
                                        <td>
                                            <Link to={`/admin/review/update/${review.id}`} className="btn btn-sm btn-info">Edit</Link>
                                            <button
                                                onClick={() => handleDelete(review.id)}
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

export default ReviewIndex;
