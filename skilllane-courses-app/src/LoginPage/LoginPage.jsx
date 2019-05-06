import React from 'react';

import { userService } from '../_services';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            username: '',
            password: '',
            role: 'student',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, role, returnUrl } = this.state;

        // stop here if form is invalid
        if (!(username && password && role)) {
            return;
        }

        this.setState({ loading: true });
        userService.login(username, password, role)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
    }

    render() {
        const { username, password, role, submitted, loading, error } = this.state;
        return (
            <div className="container">
            <h1>Demo App</h1>
                <div className="row">
                
                    <div className="alert alert-info col-md-5 mx-1">
                        For student<br />
                        Username: student<br />
                        Password: student
                    </div>
                    <div className="alert alert-info col-md-5 mx-1">
                        For instructor<br />
                        Username: instructor<br />
                        Password: instructor
                    </div>
                </div>
                <div className="col-md-8 col-md-offset-3">
                    <h2>Login</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                            {submitted && !username &&
                                <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                            {submitted && !password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !role ? ' has-error' : '')}>
                            <label htmlFor="role">Role</label>
                            <select 
                              id="role" 
                              name="role"
                              className="form-control"
                              onChange={this.handleChange}
                              value={role}>
                                <option value="student">Student</option>
                                <option value="instructor">Instructor</option>
                            </select>
                            {submitted && !role &&
                                <div className="help-block">Role is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" disabled={loading}>Login</button>
                            
                        </div>
                        {error &&
                            <div className={'alert alert-danger'}>{error}</div>
                        }
                    </form>
                </div>
            </div>
        );
    }
}

export { LoginPage }; 