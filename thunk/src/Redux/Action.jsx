
export const fetchUserData=(user)=>({
    type:"FETCH_DATA", payload:user
})

export const showErr =(error)=>({type:"ERROR",payload:error})