import React from 'react';
import { Link } from 'react-router-dom'

import courses from '../apis/courses';

class CourseList extends React.Component {

    state = {
        query: '',
        courses: [],
        filteredData: []
    }

    componentDidMount() {
        
    }

    componentWillMount() {
        this.fetchCourses();
    }

    async fetchCourses() {
        const response = await courses.get('/courses');
        const data = await response.data;
        this.setState({ courses: data})
        const query = this.state.query;
        this.setState(prevState => {
          
            const filteredData = prevState.courses.filter(element => {
              return element.title.toLowerCase().includes(query.toLowerCase());
            });
            console.log(filteredData);
            return {
              query,
              filteredData
            };
          });
        
    }


    handleInputChange = event => {
        const query = event.target.value;
        console.log(query);
    
        this.setState(prevState => {
          
          const filteredData = prevState.courses.filter(element => {
            return element.title.toLowerCase().includes(query.toLowerCase());
          });
          console.log(filteredData);
          return {
            query,
            filteredData
          };
        });
      };




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

        
            return this.state.filteredData.map(course => {
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
                            ref={input => this.search = input} 
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

export default CourseList