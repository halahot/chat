import React from 'react';
import "./chat.scss";

import Main from '../main/Main';
import Header from '../header/Header';
import Footer from '../footer/Footer';

class Chat extends React.Component{
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

export default Chat;