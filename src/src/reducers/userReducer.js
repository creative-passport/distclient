export default function(state = [], action) {
  const response = action.response

  switch(action.type) {
  	case 'NEW_USER':
  		return { ...state, response }
    default:
     	return state;
  }
}