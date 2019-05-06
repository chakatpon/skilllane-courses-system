import React from 'react';
import { Link } from 'react-router-dom';

import courses from '../apis/courses';
import history from '../history'
import { userService } from '../_services';


class CourseDelete extends React.Component {

    state = {
        user: {},
        users: [],
        course : {}
    }

    componentWillMount() {
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user')),
            users: { loading: true }
        });
        userService.getAll().then(users => this.setState({ users }));
        this.fetchCourse(this.props.match.params.id);
    }

    fetchCourse = async (id) => {
        const response = await courses.get(`/courses/${id}`);
        console.log(response);
        this.setState({ course : response.data})
    }

    deleteCourse = async (id) => {
        await courses.delete(`/courses/${id}`);
        history.push('/');
    }

    renderAction() {

        const { id } = this.props.match.params;

        return (
            <React.Fragment>
                <button onClick={() => this.deleteCourse(id)} className="btn btn-danger" style={{ marginRight:5 }}>Delete</button>
                <Link to="/" className="btn btn-primary">Cancel</Link>
            </React.Fragment>
        );

    }

    renderContent() {
        if (!this.state.course) {
            return 'Are you sure you want to delete this course?'
        }
        return `Are you sure you want to delete the course with name: ${this.state.course.title}`
    }

    render() {
        return (
            <div>
                
                    <h1>Are you want to Delete ?</h1>
                    <h4>
                        {this.renderContent()}
                    </h4>
                    <div>
                        {this.renderAction()}
                    </div>
                
            </div>
        );
    }
}

export default CourseDelete;