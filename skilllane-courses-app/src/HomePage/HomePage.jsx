import React from 'react';
import { Link } from 'react-router-dom';

import { userService } from '../_services';
import courses from '../apis/courses';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: []
        };
    }

    async componentDidMount() {
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user')),
            users: { loading: true }
        });
        userService.getAll().then(users => this.setState({ users }));
        const response = await courses.get('/courses');
        const data = await response.data;
        console.log(data);
    }


    render() {
        const { user, users } = this.state;
        return (
            <div className="container">
                <h1>Welcome {user.firstName}! to skilllane courses</h1>
                <p>You can learn every where & every time !!!</p>
                <h3>Our Courses :</h3>
                {users.loading && <em>Loading users...</em>}
                {users.length &&
                    <ul>
                        {users.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link className="btn btn-danger" to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

export { HomePage };