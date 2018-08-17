import * as imageActions from './actions'
import _ from 'lodash';

const initialState = {
  images: [],
  videos: []
};

export function ImageReducer(state = initialState, action) {
  switch (action.type) {
    case imageActions.UPDATE_IMAGE_LIST: {
      return _.assign( {}, state, { images: action.data.reverse() });
    }
    case imageActions.UPDATE_VIDEO_LIST: {
      return _.assign( {}, state, { videos: action.data.reverse() });
    }
    default:
      return state
  }
}