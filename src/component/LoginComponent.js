import React from 'react'
import { SERVER_URL } from '../Constants';

function LoginComponent ({ setAuthenticated, setDisplayName }) {
    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
            };

            const response = await fetch(SERVER_URL + '/auth/login', {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(formData),
            });

            const parseRes = await response.json();
            if (parseRes.token) {
                setAuthenticated(true);
                setDisplayName(parseRes.displayName);
                sessionStorage.setItem('token', parseRes.token);
            } else {
                setAuthenticated(false);
                setDisplayName('');
                const errorMessage = parseRes.error ? parseRes.error.message : 'Failed to login';
                document.querySelector('.form-input-hint').innerText = errorMessage;
            }
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    }

    const handleSignUpFormSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            username: document.getElementById('sign-up-username').value,
            password: document.getElementById('sign-up-password').value,
            name: document.getElementById('sign-up-name').value,
        };
        if (formData.username === '' || formData.password === '') {
            document.querySelector('#modal-sign-up .form-input-hint').innerText = 'Please fill in the required fields.';
        } else {
            try {
                const response = await fetch(SERVER_URL + '/auth/signUp', {
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application/json'
                    },
                    body: JSON.stringify(formData),
                });

                const parseRes = await response.json();
                if (parseRes.token) {
                    setAuthenticated(true);
                    setDisplayName(parseRes.displayName);
                    sessionStorage.setItem('token', parseRes.token);
                } else {
                    const errorMessage = parseRes.error ? parseRes.error.message : 'Failed to sign up.';
                    document.querySelector('#modal-sign-up .form-input-hint').innerText = errorMessage;
                }
            } catch (error) {
                console.error('Sign up failed:', error.message);
            }
        }
    };

    const handleModalClose = (e) => {
        document.getElementById('sign-up-username').value = '';
        document.getElementById('sign-up-password').value = '';
        document.getElementById('sign-up-name').value = '';
        document.querySelector('#modal-sign-up .form-input-hint').innerText = '';
    }

    return (
        <div>
            <div className="container">
                <div className="col-12 text-center">
                    <h1>Custom AD</h1>
                </div>
                <div className="col-4 col-mx-auto">
                    <form className="form-horizontal" onSubmit={handleLoginFormSubmit}>
                        <div className="form-group">
                            <div className="col-3 col-sm-12">
                                <label className="form-label" htmlFor="username">Username</label>
                            </div>
                            <div className="col-9 col-sm-12">
                                <input
                                    className="form-input"
                                    type="text"
                                    id="username"
                                    placeholder="Username"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-3 col-sm-12">
                                <label className="form-label" htmlFor="password">Password</label>
                            </div>
                            <div className="col-9 col-sm-12">
                                <input
                                    className="form-input"
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                >
                                </input>
                            </div>
                        </div>
                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-primary">Log in</button>
                        </div>
                        <div className="col-12 has-error">
                            <div className="form-input-hint"></div>
                        </div>
                    </form>
                    <div className="divider text-center" data-content="OR"></div>
                    <div className="col-12 text-center">
                        <a className="btn btn-primary" href="#modal-sign-up">Create new account</a>
                    </div>
                </div>
            </div>
            <div className="modal modal-sm" id="modal-sign-up">
                <a href="#close" className="modal-overlay" aria-label="Close" onClick={handleModalClose}></a>
                <div className="modal-container">
                    <div className="modal-header">
                        <a href="#close" className="btn btn-clear float-right" aria-label="Close" onClick={handleModalClose}></a>
                        <div className="modal-title h5">Sign Up</div>
                    </div>
                    <form className="form-horizontal" onSubmit={handleSignUpFormSubmit}>
                        <div className="modal-body">
                            <div className="content">
                                <div className="form-group">
                                    <div className="col-4 col-sm-12">
                                        <label className="form-label" htmlFor="sign-up-username">Username</label>
                                    </div>
                                    <div className="col-8 col-sm-12">
                                        <input
                                            className="form-input"
                                            type="text"
                                            id="sign-up-username"
                                            placeholder="Username"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-4 col-sm-12">
                                        <label className="form-label" htmlFor="sign-up-password">Password</label>
                                    </div>
                                    <div className="col-8 col-sm-12">
                                        <input
                                            className="form-input"
                                            type="password"
                                            id="sign-up-password"
                                            placeholder="Password"
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-4 col-sm-12">
                                        <label className="form-label" htmlFor="sign-up-name">Name</label>
                                    </div>
                                    <div className="col-8 col-sm-12">
                                        <input
                                            className="form-input"
                                            type="text"
                                            id="sign-up-name"
                                            placeholder="Name"
                                        />
                                    </div>
                                </div>
                                <div className="col-12 has-error">
                                    <div className="form-input-hint"></div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent
