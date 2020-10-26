import React from 'react';

import '../styles/login.scss'

export default class Login extends React.Component{
    state = {
        username: "",
        password: ""
    }

    onUsernameChange=(event: { target: { value: any; }; })=>{
        this.setState({username: event.target.value})
    }

    onPasswordChange=(event: { target: { value: any; }; })=>{
        this.setState({password: event.target.value})
    }

    render(){
        return(<>
        <div className="container">
            <div className="loginContainer">
                <div className="imgContainer">

                </div>
                <div className="formContainer">
                    <p>SignIn</p>
                    <form action="" onSubmit = {this.handleSubmit}>
                        <input type="text" placeholder="login" value={this.state.username} onInput={this.onUsernameChange}/>
                        <input type="text" placeholder="password" value={this.state.password} />
                        <input type="submit button" value="SignIn" />
                    </form>
                </div>
            </div>
        </div>
        </>
        )
    }
}