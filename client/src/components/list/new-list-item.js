import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../../actions/index';
import { Link } from 'react-router';

class ListItem extends Component {
  handleFormSubmit(formProps){
    //call actions creator to sign up the user
    this.props.createPost(formProps);
  }

  render() {
    const { fields: { title, topic, url, content }, handleSubmit } = this.props;
      return(
        <div className="post-form-col col-md-4">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <h3 className="title-header">Create a New Post</h3>

            <fieldset className="form-group">
              <label>Title</label>
              <input className="form-control" {...title} />
            </fieldset>

            <fieldset className="form-group">
              <label>Category</label>
              <input className="form-control" {...topic} />
            </fieldset>

            <fieldset className="form-group">
              <label>URL</label>
              <input className="form-control" {...url} />
            </fieldset>

            <fieldset className="form-group">
              <label>Content</label>
              <textarea type="text" className="form-control text" rows="8" {...content} />
            </fieldset> 

            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/" className="btn btn-danger">Cancel</Link>
          </form>
        </div>
      );
  }
}

export default reduxForm({
  form: 'ListsNewForm',
  fields: ['title', 'topic', 'url', 'content']
}, null, { createPost })(ListItem);




