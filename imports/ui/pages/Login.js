import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Alert from 'react-s-alert';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { _ } from 'meteor/underscore';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logginIn: false
    }
  }

  componentDidMount() {
    $('.message a').click(function(){
       $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });
  }

  _loginFacebook(event) {
    event.preventDefault();

    const { location } = this.props;

    Meteor.loginWithFacebook({}, (err) => {
      if (err) {
        console.log('errorMessage', err.reason || 'Unknown error');
      } else {
        if (location.state && location.state.nextPathname) {
          browserHistory.push(location.state.nextPathname);
        } else {
          browserHistory.push('/market');
        }

      }
    });
  }

  _handleSignin(event) {
    event.preventDefault();
    const errors = {}

    const email = this.refs.login_email.value;
    const password = this.refs.login_password.value;

    this.setState({logginIn: !this.state.logginIn});

    if (!email) {
      errors.email = 'Email requerido'
    }

    if (!password) {
      errors.password = 'Contraseña requerida'
    }

    if (Object.keys(errors).length) {
      this.setState({logginIn: false});
      _.values(errors).map((error, index) => (
        Alert.error(error, {
          position: 'top',
          effect: 'flip',
          timeout: 3000,
        })
      ));
      return;
    }

    Meteor.call('users.findUserByEmail', {email} , (err, result) => {
      if (!err) {
        if (result) {
          Meteor.loginWithPassword(email, password, (error) => {
            if (error) {
              Alert.error(error.reason, {
                position: 'top-right',
                effect: 'slide',
                timeout: 3500,
                offset: 100,
              });

              this.setState({logginIn: false});
            } else {
              Alert.success('Bienvenido de vuelta!', {
                position: 'top-right',
                effect: 'slide',
                timeout: 3500,
                offset: 100,
              });

              const { location } = this.props;
              if (location.state && location.state.nextPathname) {
                browserHistory.push(location.state.nextPathname);
              } else {
                browserHistory.push('/market');
              }
            }
          });
        } else {
          Alert.error(`<h4>Usuario no encontrado</h4>`, {
            position: 'top-right',
            effect: 'slide',
            timeout: 3500,
            offset: 100,
            html: true,
          })
          this.setState({logginIn: false});
        }
      } else {
        Alert.error(err.reason, {
          position: 'top-right',
          effect: 'slide',
          timeout: 3500,
          offset: 100,
        })
        this.setState({logginIn: false});
      }
    });
  }

  _handleSignup(event) {
    event.preventDefault();
    const errors = {};
    let options = {};

    const name = this.refs.name.value;
    const last_name = this.refs.last_name.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    this.setState({logginIn: !this.state.logginIn});

    if (!name || !last_name) {
      errors.name = 'Nombre(s) y Apellido(s) son requeridos';
    }
    if (!email) {
      errors.email = 'Email es requerido';
    }
    if (!password) {
      errors.password = 'Ingresa una contraseña';
    }

    if (Object.keys(errors).length) {
      this.setState({logginIn: false});
      _.values(errors).map((error, index) => (
        Alert.error(error, {
          position: 'top',
          effect: 'flip',
          timeout: 3000,
        })
      ));
      return;
    }
    options = {
      name,
      last_name,
      email,
      password
    }

    Meteor.call('users.insert', options, (err, result) => {
      if(!err) {
        console.log('Usuario creado');

        Meteor.loginWithPassword(email, password, (error) => {
          if (error) {
            Alert.error(error.reason, {
              position: 'top-right',
              effect: 'slide',
              timeout: 3500,
              offset: 100,
            });
            this.setState({logginIn: false});
          } else {
            Alert.success('Bienvenido!', {
              position: 'top-right',
              effect: 'slide',
              timeout: 3500,
              offset: 100,
            });

            const { location } = this.props;
            if (location.state && location.state.nextPathname) {
              browserHistory.push(location.state.nextPathname);
            } else {
              browserHistory.push('/market');
            }
          }
        });
      } else {
        Alert.error(err.reason, {
          position: 'top-right',
          effect: 'slide',
          timeout: 3500,
          offset: 100,
        })
        this.setState({logginIn: false});
      }

      this.setState({logginIn: false});
    });
  }

  renderErrors() {
    return _.values(this.state.errors).map((error, index) => (
      <li key={index}>{error}</li>
    ));
  }

  render() {
    return (


      <div className="page-wrapper">

        <Helmet
          title="Login"
          meta={[
              {"name": "description", "content": "Ingresa a Central Fresh y empieza a recibir frutas y verduras premium hasta la puerta de tu hogar."}
          ]}
        />

        <div className="hero-section" data-ix="show-navbar">
          <div className="background-video w-background-video" data-autoplay="data-autoplay" data-loop="data-loop" data-poster-url="https://daks2k3a4ib2z.cloudfront.net/58cb198e4d198bcc429dae6e/58e539708991d7054c3c6f95_central fresh-poster-00001.jpg" data-video-urls="https://daks2k3a4ib2z.cloudfront.net/58cb198e4d198bcc429dae6e/58e539708991d7054c3c6f95_central fresh-transcode.webm,https://daks2k3a4ib2z.cloudfront.net/58cb198e4d198bcc429dae6e/58e539708991d7054c3c6f95_central fresh-transcode.mp4" data-wf-ignore="data-wf-ignore">
            <div className="navbar w-nav" data-animation="over-right" data-collapse="medium" data-duration="400">
              <div className="w-container">
                <Link className="w-nav-brand" to="/">
                  <img className="logo" height="90" src="images/central-fresh-logo-white.png" />
                </Link>
                <nav className="fixednavmenu nav-menu w-nav-menu" role="navigation">
                  <Link className="nav-link w-nav-link" to="/">Inicio</Link>
                  <Link className="nav-link w-nav-link" to="/market">Catálogo</Link>
                  <Link className="nav-link w-nav-link" to="/market?category=frutas">Frutas</Link>
                  <Link className="nav-link w-nav-link" to="/market?category=verduras">Verduras</Link>
                  <Link className="nav-link w-nav-link" to="/contact">Contáctanos</Link>
                </nav>
                <div className="menu-button-2 w-nav-button">
                  <div className="w-icon-nav-menu"></div>
                </div>
              </div>
            </div>
            <div className="contentblock">
              <h1 className="heading-4">Frutas y verduras premium a domicilio</h1>
              <h2 className="heading-5">CENTRAL FRESH</h2>
              <div className="div-block-4 w-clearfix">
                <h3 className="heading-10">Inicia Sesión</h3><a className="loginfb w-button" href="#" onClick={this._loginFacebook.bind(this)}>Ingresa con facebook</a>
                <div className="div-block-5"></div>
                <div className="div-block-5 left"></div>
                {/* <div className="text-block-4">o</div> */}
                <div className="w-form">
                  <form data-name="Email Form" id="email-form" name="email-form" onSubmit={this._handleSignin.bind(this)}>
                    <input className="formfield w-input" ref="login_email" placeholder="Email" required="required" type="email" />
                    <input className="formfield w-input" ref="login_password" placeholder="Contraseña" required="required" type="password" />
                    <input className="loginbutton w-button" type="submit" value={!this.state.logginIn ? 'Inicia Sesión' : 'Ingresando...'} disabled={this.state.logginIn} />
                  </form>
                </div>
                <div className="logintext">¿No tienes cuenta? <Link to="/register" className="logintextlink">Regístrate ahora</Link>
                </div>
                <div className="logintext">Olvide mi contraseña&nbsp;<Link to="/recover-password" className="logintextlink">Recuperala aquí</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




      // <!-- Page Contents-->
      // {/* <div>
      //   <Helmet
      //     title="Login"
      //     meta={[
      //         {"name": "description", "content": "Ingresa o regístrate para la entrega de frutas y verduras a domicilio"}
      //     ]}
      //   />
      //
      //   <video autoPlay muted loop poster="Comfy/Snapshots/Comfy.jpg" id="bgvideo">
      //     <source src="Comfy/WEBM/Comfy.webm"/>
      //     <source src="Comfy/MP4/Comfy.mp4"/>
      //   </video>
      //
      //   <div className="form-container">
      //     <div className="info">
      //       <h1>Inicia Sesión o Regístrate</h1><span style={{'fontSize': '2rem', 'color': '#00a6a6'}}>Del productor a tu mesa.</span>
      //     </div>
      //   </div>
      //   <div className="form">
      //     <div><center><img className="img-responsive" style={{maxWidth: 150}} src="images/logo_square.png"/></center></div>
      //     <div>
      //       <a className="btn btn-block btn-social btn-facebook" onClick={this._loginFacebook.bind(this)}>
      //         <span className="fa fa-facebook"></span> Ingresa con facebook
      //       </a>
      //     </div>
      //     <div style={{marginTop: '1rem'}}>o</div>
      //     <form className="register-form" onSubmit={this._handleSignup.bind(this)}>
      //       <input type="text" ref="name" placeholder="Nombre(s)"/>
      //       <input type="text" ref="last_name" placeholder="Apellido(s)"/>
      //       <input type="email" ref="email" placeholder="Email"/>
      //       <input type="password" ref="password" placeholder="Contraseña"/>
      //
      //       <button type="submit" disabled={this.state.logginIn} style={{'fontSize': '2rem'}}>{!this.state.logginIn ? 'Regístrate' : 'Procesando...'}</button>
      //       <p className="message" style={{'fontSize': '1.5rem'}}>¿Ya estas registrado? <b><a href="#">Inicia sesión</a></b></p>
      //     </form>
      //     <form className="login-form" onSubmit={this._handleSignin.bind(this)}>
      //       <input type="email" ref="login_email" placeholder="Email"/>
      //       <input type="password" ref="login_password" placeholder="Contraseña"/>
      //       <button type="submit" disabled={this.state.logginIn} style={{'fontSize': '2rem'}}>{!this.state.logginIn ? 'Inicia Sesión' : 'Ingresando...'}</button>
      //       <p className="message" style={{'fontSize': '1.6rem'}}>¿No tienes cuenta? <b><a href="#">Regístrate</a></b></p>
      //       <p className="message">Olvide mi contraseña <b><Link to="/recover-password">Recuperar contraseña</Link></b></p>
      //     </form>
      //   </div>
      //
      // </div> */}
    )
  }
}
