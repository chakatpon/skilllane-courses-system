import React from 'react';
import { connect } from 'react-redux';
import { createCourse } from '../actions';
import CourseForm from './CourseForm';

class CourseCreate extends React.Component {

    onSubmit = (formValues) => {
        this.props.createCourse(formValues);
    }


    render() {
        return(
            <div>
                <h2>Create Your Course</h2>
                <CourseForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

export default connect(null, {createCourse})(CourseCreate)