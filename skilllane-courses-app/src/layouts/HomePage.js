import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { setData, setUser } from '../actions';
import { userService } from '../_services';
import CourseList from '../components/CourseList';

class HomePage extends React.Component {
 
    componentDidMount() {
        this.props.setData({loading: true});
        this.props.setUser({...JSON.parse(localStorage.getItem('user'))})
    }


    render() {
        const { user } = this.props;
        return (
            <div className="container">
                <h2>Welcome {user.firstName} ! to skilllane courses</h2>
                <h4>You can learn every where & every time !!!</h4>

                    <div>
                    <h4>    
                        <strong>{user.isIns ? 'Instructor: ' : 'Student: '}</strong>{user.firstName + ' ' + user.lastName}   
                    </h4>
                    <h4><strong>Nickname: </strong>{user.nickName}</h4>
                    </div>
                
                {user.isIns && <Link to="/course/new" className="btn btn-success" style={{marginRight:5}}>Create Course</Link>}
                <Link className="btn btn-danger" to="/login">Logout</Link>
                <CourseList user={user}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { setData, setUser })(HomePage);