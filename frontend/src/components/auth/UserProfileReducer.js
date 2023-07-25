const reducer = (state, action) => {
    console.log({ state, action })
    switch(action.type) {
        case 'LOG_IN' || 'SIGN_UP':
            let { token, profile } = action.payload
            console.log('reducer', { token, profile })
            const newState = {
                    token,
                    name: profile.name,
                    server: state.server,
                    dietaryRestrictions: profile.dietaryRestrictions
            }
            console.log({newState})
            return newState
        case 'LOGOUT':
            console.log('logout case')
            return action.payload
        default:
            console.log('default case')
            return state;
    }
 }
 
 export default reducer
 
