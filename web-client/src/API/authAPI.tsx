

export function login(username: string, password: string){
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    }
    return fetch('api/identity/login', requestOptions)
    .then(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));

        return user;
    })

}

export function register(username: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    }
    return fetch('api/identity/register', requestOptions)
    .then(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));

        return user;
    })
    
}

export function logout(){
    localStorage.removeItem('currentUser')
}
