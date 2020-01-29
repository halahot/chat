import React from 'react';
import {
    connect
} from 'react-redux';
import "./header.scss";

class Header extends React.Component{
  render(){
    console.log('account', this.props.account);
    let {account} = this.props;
    return (
      <div id="header">
        <div>{account.login ? `Здравствуй, ${account.login}` : "Чат-приложение"}</div>
      </div>
    )
  }
}

const mapStateToProps = state =>{
    return {
        account: state.account,
    }
}

export default connect(mapStateToProps)(Header);