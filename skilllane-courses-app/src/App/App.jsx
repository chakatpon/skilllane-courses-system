import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
// import { LoginPage } from '../LoginPage';
import LoginPage from '../LoginPage/LoginPage';
import history from '../history';

import CourseCreate from '../components/CourseCreate';
import CourseEdit from '../components/CourseEdit';
import CourseDelete from '../components/CourseDelete';
import CourseShow from '../components/CourseShow';



class App extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        <Router history={history}>
                            <div>
                                
                                <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute exact path="/course/new" component={CourseCreate}/>
                                <PrivateRoute exact path="/course/edit/:id" component={CourseEdit}/>
                                <PrivateRoute exact path="/course/delete/:id" component={CourseDelete}/>
                                <PrivateRoute exact path="/course/show/:id" component={CourseShow}/>
                                <Redirect from="/course/new" to="/course/new"/>
                                <Route path="/login" component={() => <LoginPage/>} />
                                </Switch> 
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export { App }; 