import React from 'react';
import { Link } from 'react-router-dom';

import courses from '../apis/courses';
import history from '../history'
import { userService } from '../_services';

class CourseEdit extends React.Component {
    state = {
        title: '',
        description: '',
        img: '',
        time: '',
        course: {},
        submitted: false
    }

    componentWillMount = () => {
        this.fetchCourse(this.props.match.params.id);
        
        
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { title, description, img, time, submitted } = this.state;
        const { id } = this.props.match.params;

        // stop here if form is invalid
        if (!(title && description && img && time)) {
            return;
        }
        this.editCourse(id, { title, description, img, time});
    }

    editCourse = async (id, params) => {
        const response = await courses.patch(`/courses/${id}`, params);
        console.log(response)
        history.push('/');

    }

    fetchCourse = async (id) => {
        const response = await courses.get(`/courses/${id}`);
        console.log(response);
        this.setState({ course : response.data})
    }


    render() {
        const { title, description, img, time, course, submitted} = this.state;
        return(
            <div>
                <h2>Edit Course Title: </h2>
                <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !title ? ' has-error' : '')}>
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" name="title" value={title} onChange={this.handleChange} />
                            {submitted && !title &&
                                <div className="help-block">Title is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !description ? ' has-error' : '')}>
                            <label htmlFor="description">Description</label>
                            <input type="text" className="form-control" name="description" value={description} onChange={this.handleChange} />
                            {submitted && !description &&
                                <div className="help-block">Description is required</div>
                            } 
                        </div>
                        <div className={'form-group' + (submitted && !img ? ' has-error' : '')}>
                            <label htmlFor="img">ImageURL</label>
                            <input type="text" className="form-control" name="img" value={img} onChange={this.handleChange} />
                            {submitted && !img &&
                                <div className="help-block">ImageURL is required</div>
                            } 
                        </div>
                        <div className={'form-group' + (submitted && !time ? ' has-error' : '')}>
                            <label htmlFor="time">Time</label>
                            <input type="number" className="form-control" name="time" value={time} onChange={this.handleChange} />
                            {submitted && !time &&
                                <div className="help-block">Time is required</div>
                            } 
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" style={{ marginRight: 5 }}>Edit Course</button>
                            <Link to="/" className="btn btn-danger">Cancel</Link>
                            
                        </div>
                    </form>
            </div>
        );
    }
}

export default CourseEdit;