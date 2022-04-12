import { HIDE_LOADER, SHOW_LOADER } from '../../constants/ActionTypes'

const INIT_STATE = {
  loader: false,
  callCount: 0
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SHOW_LOADER: {
      return {
        ...state,
        callCount: state.callCount + 1,
        loader: true
      }
    }
    case HIDE_LOADER: {
      const callCount = state.callCount > 1 ? state.callCount - 1 : 0
      return {
        ...state,
        callCount,
        loader: callCount > 0
      }
    }
    default:
      return state
  }
}
