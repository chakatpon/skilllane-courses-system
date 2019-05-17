import React from 'react';
import { connect } from 'react-redux';
import { userService } from '../_services';
import { setData } from '../actions'
import history from '../history';

class LoginPage extends React.Component {

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleTextChange = (e) => {
        const { name, value } = e.target;
        this.props.setData({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.setData({ submitted: true})
        const { username, password, role } = this.props;
        if (!(username && password && role)) {
            return;
        }

        this.props.setData({ loading: true });
        userService.login(username, password, role)
            .then(
                user => {
                    const { from } = { from: { pathname: "/" } };
                    history.push(from);
                },
                error => this.props.setData({ error, loading: false })
            );

    }

    render() {
        const { username, password, role, submitted, loading, error } = this.props;
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
                            <input type="text" className="form-control" name="username" value={this.props.username} onChange={this.handleTextChange} />
                            {submitted && !username &&
                                <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={this.props.password} onChange={this.handleTextChange} />
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

const mapStateToProps = (state) => {
    return { 
        username: state.auth.username,
        password: state.auth.password,
        role: state.auth.role,
        submitted: state.auth.submitted,
        loading: state.auth.loading,
        error: state.auth.error
    }
}

export default connect(mapStateToProps, { setData })(LoginPage)  ; 

