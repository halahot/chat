import React from 'react';
import "./login.scss";

import Header from '../header/Header';
import Main from '../main/Main';
import Footer from '../footer/Footer';

import {
  connect
} from 'react-redux';


import {
  login,
} from '../../common/api/registrator_api';

import {
  init,
} from '../../common/api/index';

import {
  Link,
  Redirect,
} from 'react-router-dom';


class Login extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      login: "",
      password: "",
    }
  }

  handleChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleClick = (e) =>{
    e.preventDefault();

    this.props.my_login(this.state.login, this.state.password);
  }

  render(){
    let rr = "";

    if(this.props.token){
      rr = <Redirect to="main"/>;

      this.props.my_init(this.props.token, this.state.login);
    }
    return(
      <div style={{maxWidth:"100vw"}}>
         {rr}
        <Header></Header>
        <Main>
          <div className="auth-form">
            <form>
              <p className="error"></p>

              <label>
                Логин <br/>
                <input type="text" value={this.state.login} name="login" onChange={this.handleChange}/>
              </label>

              <br/>
              <label>
                Пароль <br/>
                <input type="password" value={this.state.password} name="password" onChange={this.handleChange}/>
              </label>

              <br/>

              <button className="my-btn" onClick={this.handleClick}>Войти</button>

              <p className="nav-link">Нет аккаунта? <Link to={"/register"}>ЗАРЕГИСТРИРОВАТЬСЯ</Link></p>
            </form>
          </div>
        </Main>
        <Footer></Footer>
    </div>
  );
  }
}

const mapStateToProps = state =>{
  return {
    register: state.register,
    token: state.token
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    my_login: (logi, password) =>{
      dispatch(login(logi, password));
    },
    my_init: (tok, log) =>{
      dispatch(init(tok, log));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);