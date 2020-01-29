import React from 'react';
import "./register.scss";

import Header from '../header/Header';
import Main from '../main/Main';
import Footer from '../footer/Footer';

import {
  Modal,
} from 'antd'

import {
  Link, Redirect,
} from 'react-router-dom';

import {
  connect
} from 'react-redux';

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
      visible: false,
    }
  }

  handleChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleClick = (e) =>{
    e.preventDefault();

    let {login, password, confirm, name} = this.state;

    if(password === confirm && login && name){
      this.props.my_register(login, password, name);
      this.setState({
        login: "",
        password: "",
        confirm: "",
        name: "",
      });
    }
  }

  showModal = () => {
    this.props.remake();
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  render(){
    if(this.props.register.success){
      setTimeout(() =>{
        this.showModal();

        
      }, 100)
    }
    return(
      <div style={{maxWidth:"100vw"}}>
        {this.props.token ? <Redirect to="main"/>: ""}
        <Header></Header>
        <Main>
          <div className="auth-form">
          <Modal
            title="Регистрация"
            visible={this.state.visible}
            onOk={this.hideModal}
            onCancel={this.hideModal}
            okText="OK"
            cancelText="CANCEL"
          >
            <p>Вы успешно зарегистрировались</p>
          </Modal>
            <form>
              <p className="error">{this.props.register.error}</p>

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
                <input type="text" value={this.state.name} name="name" onChange={this.handleChange}/>
              </label>
              <br/>

              <button className="my-btn" onClick={this.handleClick}>Зарегистрироваться</button>

              <p className="nav-link">Уже есть аккаунт? <Link to={"/login"}>ВОЙТИ</Link></p>
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
        my_register: (login, password, name) =>{
            dispatch(register(login, password, name));
        },
        remake: () =>{
          dispatch({type: "REGISTRATOR_REMAKE"})
        }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Register);