import {LOAD_FEED, LOAD_FEED_RESET} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const FEEDS_INITIAL_STATE = {
  byId: {},
  allIds: [],
  loadMore: []
};

function loadFeedReset() {
  return {
    byId: {},
    allIds: [],
    loadMore: []
  };
}

function loadFeed(state, action) {
  const byId = action.feeds.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});
  // 내림차순 정렬
  const newIds = action.feeds.map(item => item.id).sort((a, b) => b - a);
  if (action.reset) {
    const loadMore = [];
    if (action.moreDataPresent) {
      loadMore.push({automatic: true, maxId: newIds[newIds.length - 1] - 1, limit: 5});
    }
    return updateObject(state, {
      byId,
      allIds: newIds,
      loadMore
    });
  }
  const ids = new Set(state.allIds);
  const loadMore = state.loadMore.filter(item => {
    return !(item.sinceId === action.sinceId && item.maxId === action.maxId);
  });
  if (action.moreDataPresent) { // 덜 로드됨
    const val = newIds[newIds.length - 1];
    loadMore.push({
      automatic: Boolean(action.automatic),
      maxId: val - 1,
      sinceId: action.sinceId,
      limit: 5
    });
  }
  for (const id of newIds) {
    ids.add(id);
  }
  return updateObject(state, {
    byId: {...state.byId, ...byId},
    allIds: Array.from(ids).sort((a, b) => b - a),
    loadMore: loadMore.sort((a, b) => b.maxId - a.maxId)
  });
}

export default createReducer(FEEDS_INITIAL_STATE, {
  [LOAD_FEED]: loadFeed,
  [LOAD_FEED_RESET]: loadFeedReset
});
