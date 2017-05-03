import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import {Row, Col} from 'react-bootstrap';

export class Help extends Component {
  constructor(props) {
    super(props);
  }

  handleChat() {
    $zopim(function() {
      $zopim.livechat.setName(Meteor.user().profile.name);
      $zopim.livechat.setEmail(Meteor.user().emails ? Meteor.user().emails[0].address : '');
      $zopim.livechat.window.show();
    });
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
              <Link className="nav-link w-nav-link" to="/">Inicio</Link>
              <Link className="nav-link w-nav-link" to="/profile">Perfil</Link>
              <Link className="nav-link w-nav-link" to="/payment">Datos de pago</Link>
              <Link className="nav-link w-nav-link" to="/address">Direcciones</Link>
              <Link className="nav-link w-nav-link" to="/orders">Pedidos</Link>
              {/* <Link className="nav-link w-nav-link" to="/market?category=frutas">Frutas</Link>
              <Link className="nav-link w-nav-link" to="/market?category=verduras">Verduras</Link>
              <Link className="nav-link w-nav-link" to="/contact">Contáctanos</Link> */}


              {/* <Link className="nav-link w-nav-link" to="/login">Regístrate</Link>
                <div className="w-dropdown" data-delay="0" data-hover="1">
                  <div className="login-dropdown nav-link w-dropdown-toggle">
                    <div>Tu cuenta</div>
                    <div className="w-icon-dropdown-toggle"></div>
                  </div>
                  <nav className="logindropdownlist w-dropdown-list">
                  <Link className="dropdownlink w-dropdown-link" to="/profile">Mi perfil</Link>
                  <Link className="dropdownlink w-dropdown-link" to="/orders">Pedidos</Link>
                  <Link className="dropdownlink w-dropdown-link" to="/payment">Datos de pago</Link>
                  <Link className="dropdownlink w-dropdown-link" to="/address">Direcciones</Link>
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
            <h1 className="catalogueheading heading-4">Direcciones de entrega</h1>
          </div>
        </div>
        <div className="productssection">
          <div className="contactcontainer w-container">

            <p>
              Tienes alguna pregunta, problema o simplemente quieres comentarnos algo.<br/>
              <button className="btn btn-default btn-lg" onClick={this.handleChat.bind(this)}><i className="fa fa-comments-o"></i> Abrir chat de soporte para clientes!</button>
            </p>

          </div>
        </div>
      </div>



      // {/* <div>
      //   <h2>Ayuda</h2>
      //   <p>
      //     Tienes alguna pregunta, problema o simplemente quieres comentarnos algo.<br/>
      //     <button className="btn btn-default btn-lg" onClick={this.handleChat.bind(this)}><i className="fa fa-comments-o"></i> Abrir chat de soporte para clientes!</button>
      //   </p>
      // </div> */}
    )
  }
}
