import React from 'react';
import "./login.scss";

import Header from '../header/Header';
import Main from '../main/Main';
import Footer from '../footer/Footer';


class Login extends React.Component{
    render(){
        return(
            <div style={{maxWidth:"100vw"}}>
                <Header></Header>
                <Main>
                    
                </Main>
                <Footer></Footer>
            </div>
        );
    }
}

export default Login;