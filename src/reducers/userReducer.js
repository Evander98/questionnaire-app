const INITIAL_STATE = {
  id: 0,
  fullName: '',
  email: '',
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...INITIAL_STATE,
        id: action.payload.id,
        fullName: action.payload.full_name,
        email: action.payload.email
      };
    case 'ERROR_MESSAGE':
      return {...INITIAL_STATE, error: action.payload};
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
};
