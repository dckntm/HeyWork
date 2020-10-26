import React from 'react';

import '../styles/login.scss'
import { login } from '../API/authAPI'

export default class Login extends React.Component<{}, { login: string, password: string }>{
    constructor(props: any) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };

        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.login = this.login.bind(this)
    }

    onChangeLogin(event: any){
        this.setState({login: event.target.value})
    }

    onChangePassword(event: any){
        this.setState({password: event.target.value})
    }

    login = (event: any) =>{
        event.preventDefault();
        return login(this.state.login, this.state.password)
    }

    render(){
        return(<>
        <div className="container">
            <div className="loginContainer">
                <div className="formContainer">
                    <form onSubmit={this.login}>
                        <div className="formGroup">
                            <p className="inputDescription">Логин</p>
                            <input className="input" type="text" name="login" value={this.state.login}onChange={this.onChangeLogin}/>
                        </div>
                        <div className="formGroup">
                            <p className="inputDescription">Пароль</p>
                            <input className="input" type="password" name="password" value={this.state.password}onChange={this.onChangePassword}/>
                        </div>
                        <p><input className = "subButton" type="submit" value="Submit" /></p>
                    </form>
                </div>
            </div>
        </div>
        </>
        )
    }
}