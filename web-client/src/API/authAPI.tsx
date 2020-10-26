
    export function login(email: string, password: string){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        }
        return fetch('api/identity/login', requestOptions)
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
    
            return user;
        })
    
    }
    
    export async function register(email: string, password: string, name: string, secondName: string) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password, name, secondName})
        }
        return await fetch('api/identity/register', requestOptions)
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
    
            return user;
        })
        
    }
    
    export function logout(){
        localStorage.removeItem('currentUser')
    }



