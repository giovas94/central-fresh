import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import Loader from 'react-loaders';

import {AddressDetail} from '../../components/Market/Addresses/AddressDetail.js';

export class Address extends Component {
  constructor(props) {
    super(props);
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

          {!this.props.loading ?
            <div>
              <AddressDetail address={_.find(this.props.myAddress.profile.addresses, { 'id': this.props.params.id })}/>
            </div>
          :
            <div style={{margin: '20px', position: 'absolute', left: '50%', marginRight: '-50%'}}>
              <Loader type="ball-scale-multiple" active={true} />
            </div>
          }

          </div>
        </div>
      </div>



      // {/* <div>
      //   {!this.props.loading ?
      //     <div>
      //       <h3>Editar dirección</h3>
      //       <div>
      //         <AddressDetail address={_.find(this.props.myAddress.profile.addresses, { 'id': this.props.params.id })}/>
      //       </div>
      //     </div>
      //   :
      //     <div style={{margin: '20px', position: 'absolute', left: '50%', marginRight: '-50%'}}>
      //       <Loader type="ball-scale-multiple" active={true} />
      //     </div>
      //   }
      // </div> */}
    )
  }
}

Address.propTypes = {
  loading: React.PropTypes.bool,
  myAddress: React.PropTypes.object,
};
