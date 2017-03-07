import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import postsReducer from './reducer_posts';
  
const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  posts: PostsReducer
});

export default rootReducer;