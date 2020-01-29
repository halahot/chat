import React from 'react';
import "./chat.scss";

import Main from '../main/Main';
import Header from '../header/Header';
import Footer from '../footer/Footer';

import distanceInWorld from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru'
import { addHours } from 'date-fns';
import { now } from 'moment';

import {
  connect,
} from 'react-redux';

import {
  Redirect,
} from 'react-router-dom';

import {
  Modal,
} from 'antd'

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

    this.state = {
      message: "",
      add_friend_modal: false,
      add_friend: "",
      current_user: {login: "", id: -1,}
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  showModalFriend = e =>{
    this.setState({
      add_friend_modal: true,
    })
  }

  handleAddOk = e => {
    e.preventDefault();

    this.props.my_add_friend(this.state.add_friend);

    this.props.my_get_friend();
    this.setState({
      add_friend_modal: false,
    });
  }

  handleAddCancel = e =>{
    e.preventDefault();

    this.setState({
      add_friend_modal: false,
      add_friend: "",
    })
  }

  handleChangeUser = user => {
    this.setState({
      current_user: user,
    })
  }

  handleSend = e => {
    e.preventDefault();

    if(this.state.current_user.id !== -1 && this.state.message){
      this.props.my_send_message(this.state.message, this.state.current_user.login);

      this.setState({
        message: "",
      })
    }
  }

  render(){

    let rr = "";

    if(!this.props.token){
      rr = <Redirect to={"/login"}/>
    }
    let {users, account, messages} = this.props;

    let i = 0;
    return(
      <div style={{maxWidth:"100vw"}}>
        {rr}
        <Header></Header>
        <Main>
          <div id="chat-page">
            <div id="left-field">
              {users.map(user => {
                return (
                  <div key={i++ + user.login} className={`user${this.state.current_user.id === user.id ? "-selected" : ""}`} onClick={(e) => {
                    e.preventDefault();
                    this.handleChangeUser({login: user.login, id: user.id})
                  }}>
                    <div key={i++} className="delete_user" onClick={e => {
                      e.preventDefault();
                      this.props.my_delete_friend(user.login);
                    }}>&#10006;</div>
                    <div className="user-login" key={i++}>{user.login}</div>

                    
                    <img src="/user.png" width="40px"/> 
                  </div>
                );
              })}

              <button className="btn-add-friend" onClick={this.showModalFriend}>&#10010;</button>
            </div>
            <div id="chat">
              <div id="chat-header">
                <div>
                  {this.state.current_user.login}
                </div>
                {this.state.current_user.id !== -1 ?(
                  <div className="close-header" onClick={e => {
                    e.preventDefault();
                    this.setState({
                      current_user: {login: "", id: -1,}
                    });
                  }}>
                    &#10006;
                  </div>)
                  :
                  ""
                }
              </div>

              <div id="chat-messages">
                {messages
                .filter(element => {
                  return (element.sender_id === this.state.current_user.id && element.to_id === account.id) || (element.sender_id === account.id && element.to_id === this.state.current_user.id); 
                })
                .map(message => {
                  return (
                    <div key={i++} className={message.to_id === account.id ? "not-my-message": "my-message"}>
                      <div key={i++}>
                        <div key={i++}>
                          {message.msg}
                        </div>
                       
                        <div key={i++} className="msg-date">
                          {distanceInWorld(addHours( new Date(message.date), 0), {
                            addSuffix: true,
                            locale: ruLocale,
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
                
              </div>

              <div id="chat-form">
                <input type="text" name="message" onChange={this.handleChange} value={this.state.message}/> <button onClick={this.handleSend}>Send</button>
              </div>
            </div>
          </div>
          
        </Main>
        <Modal
          title={"Добавление друга"}
          visible={this.state.add_friend_modal}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}>
            Логин <br/>
            <input name="add_friend" onChange={this.handleChange} value={this.state.add_friend}/>
        </Modal>
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