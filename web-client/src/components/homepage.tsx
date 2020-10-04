import React from 'react'
import Header from './header'

import '../styles/homepage.scss'

export default class Homepage extends React.Component{

    render(){
        return(<>
            <div className = "containerHome">
                <div className="header">
                    <Header/>
                </div>
                <div className="homePage">
                    <div className="textPlate">
                        <p className="bold">The best way to get started <br/> is to stop talking <br/> and start doing.</p>
                        <p>HeyWork will help you to find people for your projects</p>
                    </div>
                    <div className="imgContainer">
                        <img src="https://www.blacode.fr/wp-content/uploads/2018/04/hub-business-center.jpg" alt="" className="img"/>
                    </div>
                </div>             
            </div>
            </>
        )
    }
}