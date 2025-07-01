import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const TagCreate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        slug: ""
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

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

        axios.post("http://127.0.0.1:8000/api/tags", formData)
            .then(response => {
                setSuccessMessage("Tag created successfully!");
                setTimeout(() => {
                    navigate("/admin/tag");
                }, 1500);
            })
            .catch(error => {
                console.error("Error creating tag:", error);
                setError("Failed to create tag. Please check the form.");
            });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Create Tag</h1>
            <Link to="/admin/tag" className="btn btn-secondary mb-2">Back</Link>
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
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TagCreate;
