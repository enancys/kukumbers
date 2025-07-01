import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ReviewCreate = () => {
    const navigate = useNavigate();
    const [reviewData, setReviewData] = useState({
        user_id: "",
        game_id: "",
        rating: "",
        review_text: "",
        is_approved: 1,
    });

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setReviewData({ ...reviewData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage(null);

        axios.post("http://127.0.0.1:8000/api/reviews", reviewData)
            .then((response) => {
                setSuccessMessage("Review added successfully!");
                setTimeout(() => {
                    navigate("/admin/review");
                }, 1500);
            })
            .catch((error) => {
                console.error("Error adding review:", error);
                setError("Failed to add review. Please check the form.");
            });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Add New Review</h1>
            <Link to="/admin/review" className="btn btn-secondary mb-2">Back</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>User ID:</label>
                            <input type="number" name="user_id" value={reviewData.user_id} onChange={handleInputChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Game ID:</label>
                            <input type="number" name="game_id" value={reviewData.game_id} onChange={handleInputChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Rating (1-10):</label>
                            <input type="number" name="rating" value={reviewData.rating} onChange={handleInputChange} className="form-control" min="1" max="10" required />
                        </div>
                        <div className="form-group">
                            <label>Review Text:</label>
                            <textarea name="review_text" value={reviewData.review_text} onChange={handleInputChange} className="form-control" required></textarea>
                        </div>
                        <div className="form-group">
                            <label>Is Approved:</label>
                            <select name="is_approved" value={reviewData.is_approved} onChange={handleInputChange} className="form-control">
                                <option value={1}>Yes</option>
                                <option value={0}>No</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReviewCreate;
