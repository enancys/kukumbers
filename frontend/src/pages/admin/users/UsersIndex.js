import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserIndex = () => {
    const [user, setUser] = useState([]);
    const loadUser = () => {
        axios.get('http://127.0.0.1:8000/api/users')
        .then(Response => {
            setUser(Response.data.data);
        })
        .catch(Error => {
            alert('Eror Fetching Data: ', Error);
        });
    };

    const handleDelete = (id) => {
        if(window.confirm('Are you sure want to delete this data user?')) {
            axios.delete(`http://127.0.0.1:8000/api/users/${id}`)
            .then(() => {
                alert('Data deleted successfully');
                loadUser();
            })
            .catch(Error => {
                alert('Error deleting the data: ', Error);
            });
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-bg-gray-800 mb-2">User Data</h1>
            <Link to="/admin/user/create" className="btn btn-primary mb-2">Create</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.map((users, index) => (
                                    <tr key={index}>
                                        <td>{users.id}</td>
                                        <td>{users.name}</td>
                                        <td>{users.email}</td>
                                        <td>******</td>
                                        <td>{users.role}</td>
                                        <td>
                                            <Link to={`/admin/user/update/${users.id}`} className="btn btn-sm btn-info">Edit</Link>
                                            <button 
                                                onClick={() => handleDelete(users.id)}
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


export default UserIndex;