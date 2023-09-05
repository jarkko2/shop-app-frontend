export function authenticationReducer(state = { email: "" }, action) {
  switch (action.type) {
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.email
      }
    case 'SET_ROLE':
      return {
        ...state,
        role: action.role
      }
    default: return state;
  }
}
