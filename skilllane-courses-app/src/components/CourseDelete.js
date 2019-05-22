import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCourse, deleteCourse} from '../actions'
import history from '../history'



class CourseDelete extends React.Component {

    componentDidMount() {
        this.props.fetchCourse(this.props.match.params.id);
    }

    renderAction() {

        const { id } = this.props.match.params;

        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteCourse(id)} className="btn btn-danger" style={{ marginRight:5 }}>Delete</button>
                <Link to="/" className="btn btn-primary">Cancel</Link>
            </React.Fragment>
        );

    }

    renderContent() {
        if (!this.props.course) {
            return 'Are you sure you want to delete this course?'
        }
        return `Are you sure you want to delete the course with name: ${this.props.course.title}`
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

const mapStateToProps = (state, ownProps) => {
    return { course: state.courses.courses[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { fetchCourse, deleteCourse })(CourseDelete);