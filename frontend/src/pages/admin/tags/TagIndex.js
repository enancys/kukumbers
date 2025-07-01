import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TagIndex = () => {
    const [tags, setTags] = useState([]);

    const loadTags = () => {
        axios.get("http://127.0.0.1:8000/api/tags")
            .then(response => {
                setTags(response.data.data);
            })
            .catch(error => {
                alert("Error fetching tags:", error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this tag?")) {
            axios.delete(`http://127.0.0.1:8000/api/tags/${id}`)
                .then(() => {
                    alert("Tag deleted successfully");
                    loadTags();
                })
                .catch(error => {
                    alert("Error deleting tag:", error);
                });
        }
    };

    useEffect(() => {
        loadTags();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Tags</h1>
            <Link to="/admin/tag/create" className="btn btn-primary mb-2">Create Tag</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Slug</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tags.map((tag, index) => (
                                    <tr key={index}>
                                        <td>{tag.id}</td>
                                        <td>{tag.name}</td>
                                        <td>{tag.slug}</td>
                                        <td>
                                            <Link to={`/admin/tag/update/${tag.id}`} className="btn btn-sm btn-info mr-1">Edit</Link>
                                            <button
                                                onClick={() => handleDelete(tag.id)}
                                                className="btn btn-sm btn-danger ml-1">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {tags.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center">No tags found.</td>
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

export default TagIndex;
