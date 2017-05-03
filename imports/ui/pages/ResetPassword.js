import React from 'react';
import Alert from 'react-s-alert';
import { Link, browserHistory } from 'react-router';

export class ResetPassword extends React.Component {
  handleSubmit(event) {
    event.preventDefault();

    const password = this.refs.newPassword.value;
    const repeatPassword = this.refs.repeatNewPassword.value;

    if (password !== repeatPassword) {
      return;
    }

    Accounts.resetPassword(this.props.params.token, password, (error) => {
      if (error) {
        Alert.error(error.reason, {
          position: 'top-right',
          effect: 'slide',
          timeout: 3500,
          offset: 100,
        });
        console.log(error.reason);
      } else {
        Alert.success('Password modificado correctamente!', {
          position: 'top-right',
          effect: 'slide',
          timeout: 3500,
          offset: 100,
        });
        browserHistory.push('/');
        console.log('Password reset!');
      }
    });
  }

  render() {
    return (


      <div className="page-wrapper">
        <div className="catalogue hero-section" data-ix="show-navbar">
          <div className="navbar w-nav" data-animation="over-right" data-collapse="medium" data-duration="400">
            <div className="w-container">
              <Link className="w-nav-brand" to="/"><img className="logo" height="90" src="../images/central-fresh-logo-white.png" />
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
            <h1 className="catalogueheading heading-4">Restaurar contraseña</h1>
          </div>
        </div>
        <div className="productssection">
          <h3>Restaura tu contraseña</h3>
          <form ref="resetPassword" onSubmit={ this.handleSubmit.bind(this) }>
            <label htmlFor="newPassword">Nueva contraseña</label>
            <input id="newPassword" ref="newPassword" type="password" placeholder="Nueva contraseña"/>
            <label htmlFor="repeatNewPassword">Repetir nueva contraseña</label>
            <input id="repeatNewPassword" ref="repeatNewPassword" type="password" placeholder="Nueva contraseña"/>
            <button type="submit">Restaurar contraseña &amp; Ingresar</button>
          </form>
        </div>
      </div>


      // <div style={{paddingLeft: '5%', paddingRight: '5%'}}>
      //   <h3>Restaura tu contraseña</h3>
      //   <form ref="resetPassword" onSubmit={ this.handleSubmit.bind(this) }>
      //     <label htmlFor="newPassword">Nueva contraseña</label>
      //     <input id="newPassword" ref="newPassword" type="password" placeholder="Nueva contraseña"/>
      //     <label htmlFor="repeatNewPassword">Repetir nueva contraseña</label>
      //     <input id="repeatNewPassword" ref="repeatNewPassword" type="password" placeholder="Nueva contraseña"/>
      //     <button type="submit">Restaurar contraseña &amp; Ingresar</button>
      //   </form>
      // </div>
    )
  }
}

ResetPassword.propTypes = {
  params: React.PropTypes.object,
};
