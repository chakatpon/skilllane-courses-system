import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { searchCourse, fetchCourses, initCourse } from '../actions'


class CourseList extends React.Component {


    componentWillMount = async () => {
        this.props.initCourse({
            value:  '',
            courses: [],
            filteredCourses: []
        })
        await this.props.fetchCourses();
        await this.props.searchCourse(this.props.courses.value)
    }

    componentDidMount = () => {

    }

    handleInputChange = event => {
        const value = event.target.value;
        this.props.searchCourse(value);
    }


    renderInstructor(course) {
        if (this.props.user.isIns) {
            return (
                <div className="right floated content">
                    <Link to={`/course/edit/${course.id}`} className ="btn btn-primary" style={{ marginRight: 5}}>Edit</Link>
                    <Link to={`/course/delete/${course.id}`} className="btn btn-danger">Deletes</Link>
                </div>
            );
        }
    }


    renderList() {

        
            return this.props.courses.filteredCourses.map(course => {
                return (
                    <div className="list-group-item" key={course.id}>
                        
                        <i className="large middle aligned icon camera" />
                        <div className="content">
                            <Link to={`/course/show/${course.id}`} className="header">
                            <strong>Title: </strong>{course.title}
                            </Link>
                            <div className="discription"><strong>Description: </strong>{course.description}</div>
                            <div><strong>Time: </strong>{course.time} minutes</div>
                            {this.renderInstructor(course)}
                        </div>
                    </div> 
                )
            })
        
    }

    render() {
        
        return(
            <div>
                <h2 className="my-4">Our Courses</h2>
                <form>
                    <div className="input-group mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="filter" 
                            placeholder="Search for..." 
                            value={this.props.courses.value} 
                            onChange={this.handleInputChange} />
                    </div>
                </form>
                
                <ul className="list-group">
                    {this.renderList()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        courses: state.courses
    }
}

export default connect(mapStateToProps, { fetchCourses, searchCourse, initCourse })(CourseList);