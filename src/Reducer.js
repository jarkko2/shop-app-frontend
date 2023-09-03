export function authenticationReducer(state = { email : "" }, action) {
    switch (action.type) {
      case 'SET_EMAIL':
        return {
          ...state,
          email : action.email
        }
      default: return state;
    }
  }
  