import userId from './userId';
import articleList from './articleList';
import profile from './profile';
import profileForm from './profileForm';
import comment from './comment';
import tag from './tag';
import me from './me';
// import * as types from '../actions/actionTypes';
// import other reducers

// define other reducers

const reducers = {
  profile,
  profileForm,
  articleList,
  comment,
  tag,
  userId,
  me
  // list up all reducers
};

// this file exports a mere object, which is to be combined at app.js later
export default reducers;
