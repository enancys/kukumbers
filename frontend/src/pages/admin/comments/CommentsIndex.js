import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CommentIndex = () => {
    const [comments, setComments] = useState([]);

    const loadComments = () => {
        axios.get("http://127.0.0.1:8000/api/comments")
            .then(response => {
                setComments(response.data.data);
            })
            .catch(error => {
                alert("Error fetching comments: " + error.message);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            axios.delete(`http://127.0.0.1:8000/api/comments/${id}`)
                .then(() => {
                    alert("Comment deleted successfully");
                    loadComments();
                })
                .catch(error => {
                    alert("Error deleting the comment: " + error.message);
                });
        }
    };

    useEffect(() => {
        loadComments();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Comment Data</h1>
            <Link to="/admin/comments/create" className="btn btn-primary mb-2">Create</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User ID</th>
                                    <th>Game ID</th>
                                    <th>Comment</th>
                                    <th>Approved</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comments.map((comment, index) => (
                                    <tr key={index}>
                                        <td>{comment.id}</td>
                                        <td>{comment.user_id}</td>
                                        <td>{comment.game_id}</td>
                                        <td>{comment.comment_text}</td>
                                        <td>{comment.is_approved ? "Yes" : "No"}</td>
                                        <td>
                                            <Link to={`/admin/comments/update/${comment.id}`} className="btn btn-sm btn-info">Edit</Link>
                                            <button
                                                onClick={() => handleDelete(comment.id)}
                                                className="btn btn-sm btn-danger ml-1"
                                            >Delete</button>
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

export default CommentIndex;
