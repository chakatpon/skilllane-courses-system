import React from 'react';
import { Link } from 'react-router-dom';

import courses from '../apis/courses';


class CourseShow extends React.Component {

    state = {
        course: {}
    }

    componentWillMount = () => {
        this.fetchCourse(this.props.match.params.id);
    }

    fetchCourse = async (id) => {
        const response = await courses.get(`/courses/${id}`);
        console.log(response);
        this.setState({ course : response.data})
    }

    render() {
        return(
            <div className="card" style={{width: 600}}>
                <img className="card-img-top" src={this.state.course.img} alt="Card image cap"/>
                <div className="card-body" >
                    <h4 className="card-title"><strong>Title: </strong>{this.state.course.title}</h4>
                    <p className="card-text">{this.state.course.description}</p>
                    <Link to="/" className="btn btn-danger">Exit</Link>
                </div>
        </div>
        );
    }
}

export default CourseShow;