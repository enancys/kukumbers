import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CommentUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [commentData, setCommentData] = useState({
        user_id: "",
        game_id: "",
        comment_text: "",
        is_approved: 1,
    });

    const getComment = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/comments/${id}`)
            .then(response => {
                const { user_id, game_id, comment_text, is_approved } = response.data.data;
                setCommentData({ user_id, game_id, comment_text, is_approved });
            })
            .catch(error => {
                alert('Error fetching comment details: ', error);
            });
    }, [id]);

    useEffect(() => {
        getComment();
    }, [getComment]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCommentData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/comments/${id}`, commentData)
            .then(response => {
                alert('Comment updated successfully!');
                navigate('/admin/comments');
            })
            .catch(error => {
                console.error('Error updating comment: ', error);
                alert('Failed to update comment.');
            });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Edit Comment</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
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
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CommentUpdate;
