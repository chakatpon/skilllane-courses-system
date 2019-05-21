import React from 'react';
import {Field, reduxForm} from 'redux-form'
import { Link } from 'react-router-dom';

class CourseForm extends React.Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className={'alert alert-danger my-2'}>{error}</div>
            )
        }

    }

    renderInput = ({ input , label, meta, type}) => {
        const className = `form-group ${meta.error && meta.touched ? 'has-error': ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input type={type} {...input} className="form-control" autoComplete='off'/>
                {this.renderError(meta)}
            </div>
        );
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
     }

    render() {
        return(
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field component={this.renderInput} name="title" type="text" label="Enter Title"/>
                <Field component={this.renderInput} name="description" type="text" label="Enter Description"/>
                <Field component={this.renderInput} name="img" type="text" label="Enter ImageURL"/>
                <Field component={this.renderInput} name="time" type="number" label="Enter Time"/>
                <button type="submit" className="btn btn-success mr-2">Submit</button>
                <Link to="/" className="btn btn-danger">Exit</Link>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {}

    if(!formValues.title){
        errors.title = "You must enter title.";
    }

    if(!formValues.description){
        errors.description = "You must enter description."
    }

    if(!formValues.img){
        errors.img = "You must enter image URL.";
    }

    if(!formValues.time){
        errors.time = "You must enter time."
    }
    return errors
}

export default reduxForm({
    form: "courseForm",
    validate
})(CourseForm)