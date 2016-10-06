import {LOAD_POST, LOAD_INITIAL_POST, SCROLL_POST_LIST_END} from '../actions/actionTypes';

const INITIAL_STATE = {
  data: {
    articles: []
  },
  postNum: 5
};

export default function postList(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_POST: {
      return Object.assign({}, state, {
        data: action.data
      });
    }
    case LOAD_INITIAL_POST: {
      return Object.assign({}, state, {
      });
    }
    case SCROLL_POST_LIST_END: {
      return Object.assign({}, state, {
        postNum: state.post_num + 1
      });
    }
    default: {
      return state;
    }
  }
}
