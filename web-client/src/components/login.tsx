import React from 'react';

import '../styles/login.scss'

export default class Login extends React.Component{
    render(){
        return(<>
        <div className="container">
            <div className="loginContainer">
                <div className="imgContainer">

                </div>
                <div className="formContainer">
                    <p>SignIn</p>
                    <form action="">
                        <input type="text" placeholder="login" />
                        <input type="text" placeholder="password" />
                        <button >Enter</button>
                    </form>
                </div>
            </div>
        </div>
        </>
        )
    }
}