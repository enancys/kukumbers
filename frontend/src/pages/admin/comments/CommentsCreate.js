import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CommentCreate = () => {
    const navigate = useNavigate();
    const [commentData, setCommentData] = useState({
        user_id: "",
        game_id: "",
        comment_text: "",
        is_approved: 1,
    });

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCommentData({ ...commentData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage(null);

        axios.post("http://127.0.0.1:8000/api/comments", commentData)
            .then(() => {
                setSuccessMessage("Comment added successfully!");
                setTimeout(() => {
                    navigate("/admin/comments");
                }, 1500);
            })
            .catch((error) => {
                console.error("Error adding comment:", error);
                setError("Failed to add comment. Please check the form data and try again.");
            });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Add New Comment</h1>
            <Link to="/admin/comments" className="btn btn-secondary mb-2">Back</Link>
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
                                value={commentData.user_id}
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
                                value={commentData.game_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Comment Text:</label>
                            <textarea
                                name="comment_text"
                                value={commentData.comment_text}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label>Is Approved:</label>
                            <select
                                name="is_approved"
                                value={commentData.is_approved}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            >
                                <option value={1}>Approved</option>
                                <option value={0}>Not Approved</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CommentCreate;
