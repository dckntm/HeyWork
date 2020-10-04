import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/header.scss';

export default class Header extends React.Component{
    render(){
        return(<>
            <div className="containerHeader">
                <div className="title">
                    <p className="Hey">Hey</p>
                    <p className="work">Work</p>
                </div>
                <div className="inputContainer">
                    <input type="text" className="search input search-input" placeholder = "search by name"/>
                </div>               
                <Link to="/login" className = "text">SignIn</Link>
                <Link to="/register" className = "text">SignUp</Link>             
            </div>
            </>
        )
    }
}