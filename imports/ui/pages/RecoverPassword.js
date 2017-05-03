import React, { Component } from 'react';
import Alert from 'react-s-alert';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Link,browserHistory } from 'react-router';

export class RecoverPassword extends Component {
  handleSubmit(event) {
    event.preventDefault();

    Accounts.forgotPassword({
      email: this.refs.email.value
    }, (err) => {
      if (!err) {

        this.refs.email.value = ''

        Alert.success('Enviamos un correo con tu contraseña!', {
          position: 'top-right',
          effect: 'slide',
          timeout: 3500,
          offset: 100,
        });
      } else {
        Alert.error(err.reason, {
          position: 'top-right',
          effect: 'slide',
          timeout: 3500,
          offset: 100,
        });
      }
    })
  }
  render() {
    return (

      <div className="page-wrapper">
        <div className="catalogue hero-section" data-ix="show-navbar">
          <div className="navbar w-nav" data-animation="over-right" data-collapse="medium" data-duration="400">
            <div className="w-container">
              <Link className="w-nav-brand" to="/"><img className="logo" height="90" src="images/central-fresh-logo-white.png" />
              </Link>
              <nav className="fixednavmenu nav-menu w-nav-menu" role="navigation">
                <Link className="nav-link w-nav-link" to="/market">Catálogo</Link>
                <Link className="nav-link w-nav-link" to="/market?category=frutas">Frutas</Link>
                <Link className="nav-link w-nav-link" to="#">Verduras</Link>
                <Link className="nav-link w-nav-link" to="#">Contáctanos</Link>
                <Link className="nav-link w-nav-link" to="/login">Inicia Sesión</Link>
                {/* <div className="w-dropdown" data-delay="0" data-hover="1">
                  <div className="login-dropdown nav-link w-dropdown-toggle">
                    <div>Tu cuenta</div>
                    <div className="w-icon-dropdown-toggle"></div>
                  </div>
                  <nav className="logindropdownlist w-dropdown-list">
                    <a className="dropdownlink w-dropdown-link" href="#">Mi perfil</a>
                    <a className="dropdownlink w-dropdown-link" href="#">Pedidos</a>
                    <a className="dropdownlink w-dropdown-link" href="#">Datos de pago</a>
                    <a className="dropdownlink w-dropdown-link" href="#">Direcciones</a>
                    <a className="dropdownlink w-dropdown-link" href="#">Salir</a>
                  </nav>
                </div> */}
              </nav>
              <div className="menu-button-2 w-nav-button">
                <div className="w-icon-nav-menu"></div>
              </div>
            </div>
          </div>
          <div className="w-container">
            <h1 className="catalogueheading heading-4">Recuperar contraseña</h1>
          </div>
        </div>
        <div className="productssection">
          <div className="recoverpasswordcontainer w-container">
            <div className="w-form">
              <form data-name="Email Form" id="email-form" name="email-form" onSubmit={ this.handleSubmit.bind(this) }>
                <input className="formfield w-input" data-name="Email" id="email" ref="email" name="email" placeholder="Ingresa tu email" required="required" type="email" />
                <input className="loginbutton w-button" data-wait="Please wait..." type="submit" value="Recuperar contraseña" />
              </form>
            </div>
          </div>
        </div>
      </div>


      // {/* <div style={{paddingLeft: '5%', paddingRight: '5%'}}>
      //   <h1>Recuperar contraseña</h1>
      //   <form id="recoverPassword" onSubmit={ this.handleSubmit.bind(this) }>
      //     <label htmlFor="email">Ingresa tu email</label>
      //     <input id="email" ref="email" type="email" placeholder="Email"/>
      //     <button type="submit">Recuperar contraseña</button>
      //   </form>
      // </div> */}
    )
  }
}
