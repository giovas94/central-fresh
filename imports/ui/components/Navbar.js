import React from 'react';
import Alert from 'react-s-alert';
import { Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => {
  Alert.success('Hasta mañana!', {
    position: 'top-right',
    effect: 'slide',
    timeout: 3500,
    offset: 100,
  });

  $zopim(function() {
    $zopim.livechat.window.hide();
    $zopim.livechat.endChat();
  })

  Meteor.logout(() => browserHistory.push('/'));
};

export const Navbar = ({currentRoute, isLoginPage}) => (
  // <header className="cd-auto-hide-header">
  //   <div className="header-banner">
  //
  //  </div>
  //
  // 	<div className="logo"><Link to="/"><img height="50px" width="auto" src="https://res.cloudinary.com/grontify/image/upload/v1476989047/logo/grontify-logo-HQ.png" alt="grontify"/></Link></div>
  //
  // 	<nav className="cd-primary-nav">
  // 		<a href="#cd-navigation" className="nav-trigger">
  // 			<span>
  // 				<em aria-hidden="true"></em>
  // 				Menu
  // 			</span>
  // 		</a>
  //
  // 		<ul id="cd-navigation">
  //       <li><Link to="/" className={currentRoute[1].name === 'home' ? 'active' : ''}>Inicio</Link></li>
  //       <li><Link to="/market" activeClassName="active"><i className="fa fa-shopping-basket" aria-hidden="true"></i> Mi Central</Link></li>
  //       <li><Link to="/how-works" activeClassName="active">Cómo funciona</Link></li>
  //       <li><Link to="/contact" activeClassName="active">Contáctanos</Link></li>
  //       <li><Link to="/service-area" activeClassName="active">Área de Servicio</Link></li>
  //       <li><Link to="/servicios-especiales" activeClassName="active">Mayoreo y Servicios Especiales</Link></li>
  //       <li>{!Meteor.userId() ?
  //         <Link to="/login" activeClassName="active">Inicia Sesión / Regístrate</Link>
  //       :
  //         <a href="#" onClick={handleLogout}><i className="fa fa-sign-out" aria-hidden="true"></i> Salir</a>
  //       }</li>
  // 		</ul>
  // 	</nav>
  //
  //   {currentRoute[1].name === 'market' ?
  //   <nav className="cd-secondary-nav">
  //     <ul>
  //       <li><Link to="/market" className={currentRoute[2].name === 'catalogue' ? 'active' : ''}>Hacer el mandado</Link></li>
  //       <li><Link to="/profile" className={currentRoute[2].name === 'profile' ? 'active' : ''}>Mi perfil</Link></li>
  //       <li><Link to="/payment" className={currentRoute[2].name === 'payment' ? 'active' : ''}>Datos de pago</Link></li>
  //       <li><Link to="/address" className={currentRoute[2].name === 'address' ? 'active' : ''}>Direcciones</Link></li>
  //       <li><Link to="/orders" className={currentRoute[2].name === 'orders' ? 'active' : ''}>Historial de mandados</Link></li>
  //       <li><Link to="/help" className={currentRoute[2].name === 'help' ? 'active' : ''}>Ayuda</Link></li>
  //     </ul>
  //   </nav>
  //   : '' }
  // </header>

<div id="page">
  <header>

  <div className="header-banner">
   <div className="assetBlock">
     <div style={{height: 20, overflow: "hidden"}} id="slideshow">
       <p style={{display: "block"}}>Recibe <span>20%</span> de descuento en tu primer orden</p>
     </div>
    </div>
  </div>

  <div id="header">
      <div className="header-container container">
          <div className="row">
              <div className="logo">
                <Link to="/"><div><img src="images/logo.png" alt="Central Fresh" /></div></Link>
              </div>
              <div className="fl-nav-menu">
                  <nav>
                      <div className="mm-toggle-wrap">
                          <div className="mm-toggle">
                              <i className="icon-align-justify"></i><span className="mm-label">Menu</span>
                          </div>
                      </div>
                      <div className="nav-inner">
                          <ul id="nav" className="hidden-xs {currentRoute[1].name === 'Inicio' ? 'nav-active' : ''}">
                              <li><Link to="/" className="level-top"><span>Inicio</span></Link></li>
                              <li><Link to="/market" activeClassName="nav-active" className="level-top"><span>Productos</span></Link></li>
                              <li><Link to="/how-works" activeClassName="nav-active" className="level-top"><span>¿Cómo funciona?</span></Link></li>
                              <li><Link to="/contact" activeClassName="nav-active" className="level-top"><span>Contacto</span></Link></li>
                          </ul>
                      </div>
                  </nav>
              </div>

              <div className="fl-header-right">
                  <div className="fl-links">
                      <div className="no-js">
                          <a className="clicker"></a>
                          <div className="fl-nav-links">
                            {Meteor.userId() ?
                                <ul className="links">
                                  <li><Link to="/profile">Mi perfil</Link></li>
                                  <li><Link to="/payment">Datos de pago</Link></li>
                                  <li><Link to="/address">Direcciones</Link></li>
                                  <li className="last"><Link to="/orders">Historial</Link></li>
                                  <li><a href="#" onClick={handleLogout}><span>Cerrar sesión</span></a></li>
                                </ul>
                              :
                                <ul className="links">
                                  <li><Link to="/login"><span>Inicia Sesión / Regístrate</span></Link></li>
                                </ul>
                              }
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  </header>

</div>
)
