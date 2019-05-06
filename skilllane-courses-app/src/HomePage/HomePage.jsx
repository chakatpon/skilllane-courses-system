import React from 'react';
import ReactDOM from 'react-dom';
import { Link} from 'react-router-dom';

import { userService } from '../_services';
import CourseList from '../components/CourseList';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: []
        };
    }

    componentDidMount() {
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user')),
            users: { loading: true }
        });
        userService.getAll().then(users => this.setState({ users }));
    }


    render() {
        const { user, users } = this.state;
        return (
            <div className="container">
                <h2>Welcome {user.firstName} ! to skilllane courses</h2>
                <h4>You can learn every where & every time !!!</h4>
                {users.loading && <em>Loading users...</em>}
                {users.length &&
                    <div>
                    <h4>    
                        <strong>{user.isIns ? 'Instructor: ' : 'Student: '}</strong>{user.firstName + ' ' + user.lastName}   
                    </h4>
                    <h4><strong>Nickname: </strong>{user.nickName}</h4>
                    </div>
                }
                {user.isIns && <Link to="/course/new" className="btn btn-success" style={{marginRight:5}}>Create Course</Link>}
                <Link className="btn btn-danger" to="/login">Logout</Link>
                <CourseList user={user}/>
            </div>
        );
    }
}

export { HomePage };