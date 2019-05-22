import React from 'react';
import { connect } from 'react-redux';
import { fetchCourse, editCourse } from '../actions';
import CourseForm from './CourseForm';
import _ from 'lodash';

class CourseEdit extends React.Component {

    componentDidMount() {
        this.props.fetchCourse(this.props.match.params.id);
    }

    
    onSubmit = (formValues) => {
        this.props.editCourse(this.props.match.params.id , formValues)
    }


    render() {
        console.log(this.props.course)
        return(
            <div>
                <h2>Edit a Course</h2>
                <CourseForm 
                    initialValues={_.pick(this.props.course, 'title','description', 'img','time')}
                    onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("onw Props : ", ownProps)
    return { course: state.courses.courses[ownProps.match.params.id-1]}
}

export default connect(mapStateToProps, { fetchCourse, editCourse})(CourseEdit);