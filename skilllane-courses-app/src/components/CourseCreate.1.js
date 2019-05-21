import React from 'react';
import { Link } from 'react-router-dom';


import courses from '../apis/courses';
import history from '../history';

class CourseCreate extends React.Component {
    state = {
        title: '',
        description: '',
        img: '',
        time: '',
        submitted: false
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { title, description, img, time, submitted } = this.state;

        // stop here if form is invalid
        if (!(title && description && img && time)) {
            return;
        }
        this.createCourse({ title, description, img, time});
    }

    createCourse = async (params) => {
        const response = await courses.post('/courses', params);
        console.log(response)
        history.push('/');

    }


    render() {
        const { title, description, img, time, submitted} = this.state;
        return(
            <div>
                <h2>Create Your Course</h2>
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
                            <button type="submit" className="btn btn-success" style={{ marginRight: 5 }}>Create Course</button>
                            <Link to="/" className="btn btn-primary">Cancel</Link>
                            
                        </div>
                    </form>
            </div>
        );
    }
}

export default CourseCreate ;