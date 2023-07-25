const reducer = (state, action) => {
    switch(action.type) {
        case 'LOG_IN' || 'SIGN_UP':
            let { token, profile } = action.payload
            const newState = {
                    token,
                    name: profile.name,
                    server: state.server,
                    dietaryRestrictions: profile.dietaryRestrictions
            }
            return newState
        case 'LOGOUT':
            return action.payload
        default:
            return state;
    }
 }
 
 export default reducer
 
