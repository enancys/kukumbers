import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState([]);
    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        try {
            const response = await axios.post('http://localhost:8000/api/login', formData);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('auth_user', JSON.stringify(response.data.user)); // ✅ konsisten dengan useAuth

            if (response.data.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }

        } catch (error) {
            if (error.response && error.response.data) {
                setValidation(error.response.data);
            } else {
                setValidation({ message: "Terjadi kesalahan tak terduga." });
            }
        }
    };

    return (
        <div className="container" style={{ marginTop: "120px" }}>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <h4 className="fw-bold">HALAMAN LOGIN</h4>
                            <hr />
                            {validation.message && (
                                <div className="alert alert-danger">
                                    {validation.message}
                                </div>
                            )}
                            <form onSubmit={loginHandler}>
                                <div className="mb-3">
                                    <label className="form-label">ALAMAT EMAIL</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Masukkan Alamat Email"
                                        required
                                    />
                                </div>
                                {validation.email && (
                                    <div className="alert alert-danger">{validation.email[0]}</div>
                                )}
                                <div className="mb-3">
                                    <label className="form-label">PASSWORD</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Masukkan Password"
                                        required
                                    />
                                </div>
                                {validation.password && (
                                    <div className="alert alert-danger">{validation.password[0]}</div>
                                )}
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">LOGIN</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
