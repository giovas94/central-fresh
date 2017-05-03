import React, { Component, PropTypes } from 'react';
import Alert from 'react-s-alert';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import { Tooltip, ButtonToolbar, OverlayTrigger } from 'react-bootstrap';

import { handleUserEmails } from '../../../modules/handleUserEmails';

import {Loader} from 'react-loaders';

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const currentPassword = this.refs.currentPassword.value;
    const newPassword = this.refs.newPassword.value;
    const confirmNewPassword = this.refs.confirmNewPassword.value;

    if (newPassword !== confirmNewPassword) {
      Alert.error(`Las contraseñas no coinciden!`, {
        position: 'top-right',
        effect: 'slide',
        timeout: 3500,
        offset: 100,
        html: true,
      });
      return;
    }

    if (newPassword === currentPassword) {
      Alert.error(`La nueva contraseña no puede ser igual a la actual`, {
        position: 'top-right',
        effect: 'slide',
        timeout: 3500,
        offset: 100,
        html: true,
      });
      return;
    }

    Accounts.changePassword(currentPassword, newPassword, (err) => {
      if (err) {
        Alert.error(`<h4>Error, ${err.reason}!</h4>`, {
          position: 'top-right',
          effect: 'slide',
          onShow: function () {
              console.log(err.reason)
          },
          timeout: 3500,
          offset: 100,
          html: true,
        });
      } else {
        Alert.success('<h4>Password modificado!</h4>', {
          position: 'top-right',
          effect: 'slide',
          onShow: function () {
              console.log('Password modificado con éxito!')
          },
          timeout: 3500,
          offset: 100,
          html: true,
        });
      }
    });
  }

  setPhone(event) {
    event.preventDefault();

    if (event.target.value.length === 10) {
      Meteor.call('users.phone', {phone: event.target.value}, (err) => {
        if (!err) {
          Alert.success('Teléfono modificado!', {
            position: 'top-right',
            effect: 'slide',
            timeout: 3500,
            offset: 100,
            html: true,
          });
          console.log('Teléfono modificado.');
        } else {
          Alert.error(err.reason, {
            position: 'top-right',
            effect: 'slide',
            timeout: 3500,
            offset: 100,
            html: true,
          });
        }
      });
    } else {
      Alert.error('Deben ser 10 dígitos!', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3500,
        offset: 100,
      });
    }

    this.setState({editMode: !this.state.editMode});
  }

  render() {
    const tooltip = (
      <Tooltip id="tooltip">Te enviaremos un mensaje cuando tu mandado este llegando!</Tooltip>
    );
    const {currentUser} = this.props;
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
            <h1 className="catalogueheading heading-4">Perfil</h1>
          </div>
        </div>
        <div className="productssection">
          <div className="contactcontainer w-container">

        {
          !currentUser ?
            <div style={{margin: '20px', position: 'absolute', left: '50%'}}>
              <Loader type="ball-scale-multiple" active={true} />
            </div>
          :
            <Row>
              <Col xs={12} md={6}>
                <h3>Mi Perfil</h3>
                <div className="profile">
                  <b>Nombre</b> {currentUser.profile.name} {!currentUser.emails ? '' : <b>Apellido(s)</b>} {currentUser.profile.last_name}
                  <br/>
                  <b>Email</b> {!currentUser.emails ? 'Ingreso con facebook' : currentUser.emails[0].address}
                  <br/>
                  <b>Móvil</b>&nbsp;
                  {!this.state.editMode ?
                      <span onClick={() => this.setState({editMode: !this.state.editMode})}>
                      {!currentUser.profile.phone ?
                        <span>No hay teléfono registrado
                          <Tooltip placement="bottom" className="in" id="tooltip-bottom">
                            Da click para ingresar tu móvil
                          </Tooltip>
                        </span>
                      :
                        currentUser.profile.phone
                      }
                      </span>
                    :
                      <input type="text" ref="phone" placeholder="Tu móvil (10 dígitos)"
                      onBlur={this.setPhone.bind(this)} autoFocus/>
                  }
                  &nbsp;
                  <OverlayTrigger placeholder="top" overlay={tooltip}>
                    <i className="fa fa-question-circle-o"></i>
                  </OverlayTrigger>
                </div>
              </Col>
              {currentUser.emails ?
                <Col xs={12} md={6}>
                  <h3>Cambiar contraseña</h3>
                  <form ref="changePassword" onSubmit={this.handleSubmit.bind(this)}>

                    <Row>
                      <Col sm={12} md={12}>
                        <FormGroup
                          controlId="formChangePassword">
                          <ControlLabel>Contraseña actual</ControlLabel>
                          <FormControl
                            type="password"
                            ref="currentPassword"
                            placeholder="Contraseña actual"
                          />
                        </FormGroup>
                      </Col>
                      <Col sm={12} md={6}>
                        <FormGroup>
                          <ControlLabel>Nueva contraseña</ControlLabel>
                          <FormControl
                            type="password"
                            ref="newPassword"
                            placeholder="Nueva contraseña"
                          />
                        </FormGroup>
                      </Col>
                      <Col sm={12} md={6}>
                        <FormGroup>
                          <ControlLabel>Confirmar nueva contraseña</ControlLabel>
                          <FormControl
                            type="password"
                            ref="confirmNewPassword"
                            placeholder="Confirmar contraseña"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Button type="submit" block>Cambiar de contraseña</Button>

                  </form>
                </Col>
              : ''}
            </Row>
          }

          </div>
        </div>
      </div>



      // <div>
      //   {
      //   !currentUser ?
      //     <div style={{margin: '20px', position: 'absolute', left: '50%'}}>
      //       <Loader type="ball-scale-multiple" active={true} />
      //     </div>
      //   :
      //     <Row>
      //       <Col xs={12} md={6}>
      //         <h3>Mi Perfil</h3>
      //         <div className="profile">
      //           <b>Nombre</b> {currentUser.profile.name} {!currentUser.emails ? '' : <b>Apellido(s)</b>} {currentUser.profile.last_name}
      //           <br/>
      //           <b>Email</b> {!currentUser.emails ? 'Ingreso con facebook' : currentUser.emails[0].address}
      //           <br/>
      //           <b>Móvil</b>&nbsp;
      //           {!this.state.editMode ?
      //               <span onClick={() => this.setState({editMode: !this.state.editMode})}>
      //               {!currentUser.profile.phone ?
      //                 <span>No hay teléfono registrado
      //                   <Tooltip placement="bottom" className="in" id="tooltip-bottom">
      //                     Da click para ingresar tu móvil
      //                   </Tooltip>
      //                 </span>
      //               :
      //                 currentUser.profile.phone
      //               }
      //               </span>
      //             :
      //               <input type="text" ref="phone" placeholder="Tu móvil (10 dígitos)"
      //               onBlur={this.setPhone.bind(this)} autoFocus/>
      //           }
      //           &nbsp;
      //           <OverlayTrigger placeholder="top" overlay={tooltip}>
      //             <i className="fa fa-question-circle-o"></i>
      //           </OverlayTrigger>
      //         </div>
      //       </Col>
      //       {currentUser.emails ?
      //         <Col xs={12} md={6}>
      //           <h3>Cambiar contraseña</h3>
      //           <form ref="changePassword" onSubmit={this.handleSubmit.bind(this)}>
      //
      //             <Row>
      //               <Col sm={12} md={12}>
      //                 <FormGroup
      //                   controlId="formChangePassword">
      //                   <ControlLabel>Contraseña actual</ControlLabel>
      //                   <FormControl
      //                     type="password"
      //                     ref="currentPassword"
      //                     placeholder="Contraseña actual"
      //                   />
      //                 </FormGroup>
      //               </Col>
      //               <Col sm={12} md={6}>
      //                 <FormGroup>
      //                   <ControlLabel>Nueva contraseña</ControlLabel>
      //                   <FormControl
      //                     type="password"
      //                     ref="newPassword"
      //                     placeholder="Nueva contraseña"
      //                   />
      //                 </FormGroup>
      //               </Col>
      //               <Col sm={12} md={6}>
      //                 <FormGroup>
      //                   <ControlLabel>Confirmar nueva contraseña</ControlLabel>
      //                   <FormControl
      //                     type="password"
      //                     ref="confirmNewPassword"
      //                     placeholder="Confirmar contraseña"
      //                   />
      //                 </FormGroup>
      //               </Col>
      //             </Row>
      //
      //             <Button type="submit" block>Cambiar de contraseña</Button>
      //
      //           </form>
      //         </Col>
      //       : ''}
      //     </Row>
      //   }
      // </div>
    )
  }
}

Profile.propTypes = {
  currentUser: PropTypes.object,
};
