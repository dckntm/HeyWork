import React from 'react';
import { register } from '../API/authAPI';

import '../styles/register.scss'


export default class Register extends React.Component<{}, {login: string, password: string, name: string, secondName: string}>{
    constructor(props: any) {
        super(props);
        this.state = {
            login: '',
            password: '',
            name: '',
            secondName: ''
        };

        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.register = this.register.bind(this)
    }

    onChangeLogin(event: any){
        this.setState({login: event.target.value})
    }

    onChangePassword(event: any){
        this.setState({password: event.target.value})
    }

    onChangeName = (event: any) => {
        this.setState({name: event.target.value})
    }

    onChangeSecondName = (event: any) => {
        this.setState({secondName: event.target.value})
    }

    register = (event: any) => {
        event.preventDefault();
        return register(this.state.login, this.state.password, this.state.name, this.state.secondName)
    }

    render(){
        return(<>
        <div className="container">
            <div className="loginContainer">
                <div className="formContainer">
                    <form onSubmit={this.register}>
                        <div className="formGroup">
                            <p className="inputDescription">Логин</p>
                            <input className="input" type="text" name="login" value={this.state.login}onChange={this.onChangeLogin}/>
                        </div>
                        <div className="formGroup">
                            <p className="inputDescription">Пароль</p>
                            <input className="input" type="password" name="password" value={this.state.password}onChange={this.onChangePassword}/>
                        </div>
                        <div className="formGroup">
                            <p className="inputDescription">Имя</p>
                            <input type="text" className="input" name="name" value = {this.state.name} onChange = {this.onChangeName}/>
                        </div>
                        <div className="formGroup">
                            <p className="inputDescription">Фамилия</p>
                            <input type="text" className="input" name="secondName" value = {this.state.secondName} onChange = {this.onChangeSecondName}/>
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