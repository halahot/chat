import React from 'react';
import {
    connect
} from 'react-redux';
import "./header.scss";
import { Redirect } from 'react-router-dom';

class Header extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      redirect: "",
    }
  }

  render(){
    console.log('account', this.props.account);
    let {account} = this.props;
    let res = "Чат-приложение";
    let link = "";
    if(account.login){
      res = `Здравствуй, ${account.login}`;
      link = <button id="logout_but" className="my-btn" onClick={e => {
        e.preventDefault();
        this.props.reset_token();

        this.setState({
          redirect: <Redirect to={"/login"}/>
        })
      }}> Выйти </button>
    }
    return (
      <div id="header">
        {this.state.redirect}
        <div>{res}</div>
        {link}
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    account: state.account,
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    reset_token: () =>{
      dispatch({type:"RESET"});
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);