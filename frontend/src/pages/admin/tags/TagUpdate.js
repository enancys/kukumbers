import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TagUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        slug: ""
    });

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const fetchTag = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/tags/${id}`)
            .then(response => {
                const { name, slug } = response.data.data;
                setFormData({ name, slug });
            })
            .catch(error => {
                setError("Failed to load tag data.");
            });
    }, [id]);

    useEffect(() => {
        fetchTag();
    }, [fetchTag]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        axios.put(`http://127.0.0.1:8000/api/tags/${id}`, formData)
            .then(response => {
                setSuccessMessage("Tag updated successfully!");
                setTimeout(() => {
                    navigate("/admin/tag");
                }, 1500);
            })
            .catch(error => {
                setError("Failed to update tag.");
            });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Edit Tag</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Slug:</label>
                            <input
                                type="text"
                                name="slug"
                                className="form-control"
                                value={formData.slug}
                                onChange={handleChange}
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

export default TagUpdate;
