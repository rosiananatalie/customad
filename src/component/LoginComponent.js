import React from 'react'
import { SERVER_URL } from '../Constants';

function LoginComponent ({ setAuthenticated, setDisplayName }) {
    const handleFormSubmit = async (e) => {
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

    return (
        <div className="container">
            <div className="col-12 text-center">
                <h1>Custom AD</h1>
            </div>
            <div className="col-4 col-mx-auto">
                <form className="form-horizontal" onSubmit={handleFormSubmit}>
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
                            <label className="form-label" htmlFor="password">Password:</label>
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
                        <button type="submit" className="btn btn-primary">
                            Log in
                        </button>
                    </div>
                    <div className="col-12 has-error">
                        <div className="form-input-hint"></div>
                    </div>
                </form>
                {/* TODO: create new account
                <div class="divider text-center" data-content="OR"></div>
                <div className="col-12 text-center">
                    <button type="button" className="btn btn-primary">
                        Create new account
                    </button>
                </div>
                */}
            </div>
        </div>
    )
}

export default LoginComponent
