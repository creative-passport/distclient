export default function(state = [], action) {
  const response = action.response

  switch(action.type) {
    case 'UNCONFIRMED_PROFILE':
     	return { ...state, response }
    case 'CONFIRMED_PROFILE':
     	return { ...state, response }
    default:
     	return state;
  }
}