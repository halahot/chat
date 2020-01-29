import React from 'react';
import "./register.scss";

import Header from '../header/Header';
import Main from '../main/Main';
import Footer from '../footer/Footer';

import {
  Link,
} from 'react-router-dom';

import {
    register,
} from '../../common/api/registrator_api';

class Register extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      login: "",
      password: "",
      confirm: "",
      name: "",
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
              <label>
                Пароль <br/>
                <input type="password" value={this.state.password} name="password" onChange={this.handleChange}/>
              </label>
              <br/>

              <label>
                Подтверждение пароля <br/>
                <input type="password" value={this.state.confirm} name="confirm" onChange={this.handleChange}/>
              </label>
              <br/>
              <label>
                Имя <br/>
                <input type="password" value={this.state.name} name="name" onChange={this.handleChange}/>
              </label>
              <br/>

              <button className="my-btn" onClick={this.handleClick}>Зарегистрироваться</button>

              <p className="nav-link"><Link to={"/login"}>ВОЙТИ</Link></p>
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
    }
  }
  
const mapDispatchToProps = dispatch =>{
    return {
        my_register: (login, password, name) =>{
            dispatch(register(login, password, name));
        }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Register);