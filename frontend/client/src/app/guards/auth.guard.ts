import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import jwt_decode from "jwt-decode";



@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    
    constructor(private router: Router){}

    canActivate(){
        if(localStorage.getItem('currentUser') != null){
            let tokenInfo: any = jwt_decode(localStorage.getItem('currentUser'));
            if(tokenInfo.is_staff){
                return true;
            }
            
        }

        
        return this.router.createUrlTree(['/login', {message: 'You are not authorized'}])
    }
}