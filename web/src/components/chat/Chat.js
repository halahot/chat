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

  render(){

    let rr = "";

    if(!this.props.token){
      rr = <Redirect to={"/login"}/>
    }
    let {users, account, messages} = this.props;
    
    console.log('users', users);
    

    //this.props.my_check();

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
                  <div key={i++ + user.login} className="user">
                    {user.login}
                  </div>
                );
              })}

              <button className="btn-add-friend" onClick={this.showModalFriend}>+</button>
            </div>
            <div id="chat">
              <div id="chat-header">
                Header
              </div>

              <div id="chat-messages">
                
              </div>

              <div id="chat-form">
                <input type="text" name="message" onChange={this.handleChange} value={this.state.message}/> <button>Send</button>
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