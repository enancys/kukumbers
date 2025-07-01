import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ReviewUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reviewData, setReviewData] = useState({
        user_id: "",
        game_id: "",
        rating: "",
        review_text: "",
        is_approved: 1,
    });

    const getReview = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/reviews/${id}`)
            .then(response => {
                const { user_id, game_id, rating, review_text, is_approved } = response.data.data;
                setReviewData({ user_id, game_id, rating, review_text, is_approved });
            })
            .catch(error => {
                alert('Error fetching review data: ', error);
            });
    }, [id]);

    useEffect(() => {
        getReview();
    }, [getReview]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setReviewData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/reviews/${id}`, reviewData)
            .then(response => {
                alert('Review updated successfully');
                navigate('/admin/review');
            })
            .catch(error => {
                console.error('Error updating review:', error);
                alert('Update failed. Please check input.');
            });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Edit Review</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
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
                            <label>Rating:</label>
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
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReviewUpdate;
