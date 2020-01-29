import React from 'react';
import "./chat.scss";

import Main from '../main/Main';
import Header from '../header/Header';
import Footer from '../footer/Footer';

import {
  connect,
} from 'react-redux';

import {
  Redirect,
} from 'react-router-dom';

import {
  get_account,
  get_friends,
  get_messages,
  send_message,
  add_friend,
  delete_friend,
  check_token,
} from '../../common/api/index';

class Chat extends React.Component{
  constructor(props){
    super(props);

    this.props.my_get_friend();
    this.props.my_get_account();
    this.props.my_get_messages();
  }


  render(){

    let rr = "";

    if(!this.props.token){
      rr = <Redirect to={"/login"}/>
    }
    let {users, account, messages} = this.props;
    
    this.props.my_check();

    return(
      <div style={{maxWidth:"100vw"}}>
        {rr}
        <Header></Header>
        <Main>
          <div id="chat-page">
            <div id="left-field">
            
            </div>
            <div id="chat">
              <div id="chat-header">

              </div>

              <div id="chat-messages">
                
              </div>

              <div id="chat-form">
                <input type="text"/> <button>GO</button>
              </div>
            </div>
          </div>
          
        </Main>
        <Footer></Footer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    messages: state.messages,
    users: state.users,
    account: state.account,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    my_get_friend: () => {
      dispatch(get_friends());
    },
    my_get_account: () => {
      dispatch(get_account());
    },
    my_get_messages: () => {
      dispatch(get_messages());
    },
    my_add_friend: (log) => {
      dispatch(add_friend(log));
    },
    my_delete_friend: (log) => {
      dispatch(delete_friend(log))
    },
    my_send_message: (msg, to) => {
      dispatch(send_message(msg, to));
    },
    my_check: () => {
      dispatch(check_token());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Chat);