export class AuthService{
    login(login: string, password: string){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({login, password})
        }
        return fetch('api/identity/login', requestOptions)
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
    
            return user;
        })
    
    }
    
    register(username: string, password: string) {
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
    
    logout(){
        localStorage.removeItem('currentUser')
    }
}


