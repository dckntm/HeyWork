import React from 'react';

import '../styles/register.scss'

export default class Register extends React.Component{
    render(){
        return(<>
        <div className="container">
            <div className="registerContainer">
                <div className="imgContainer">
                    <img src="https://images.unsplash.com/photo-1596859078550-bd3cb376aaa3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80" className="img"/>
                </div>
                <div className="formContainer">
                    <p>SignUp</p>
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