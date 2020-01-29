import React from 'react';
import "./login.scss";

import Header from '../header/Header';
import Main from '../main/Main';
import Footer from '../footer/Footer';

import {
  Link,
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
  }

  render(){
    return(
      <div style={{maxWidth:"100vw"}}>
        <Header></Header>
        <Main>
          <div class="auth-form">
            <form>
              <p className="error"></p>

              <label>
                Логин <br/>
                <input type="text" value={this.state.login} name="login" onChange={this.handleChange}/>
              </label>

              <br/>
              <br/>
              <label>
                Пароль <br/>
                <input type="password" value={this.state.password} name="password" onChange={this.handleChange}/>
              </label>

              <br/>

              <button className="my-btn" onClick={this.handleClick}>Войти</button>

              <p className="nav-link"><Link to={"/register"}>ЗАРЕГИСТРИРОВАТЬСЯ</Link></p>
            </form>
          </div>
        </Main>
        <Footer></Footer>
    </div>
  );
  }
}

export default Login;