import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Alert from 'react-s-alert';
import { Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import {Row, Col, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

export class AddressForm extends Component {
  constructor(props) {
    super(props);


    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();

    const { refs } = this;
    const street = ReactDOM.findDOMNode(refs.street).value;
    const noInt = ReactDOM.findDOMNode(refs.noInt).value;
    const noExt = ReactDOM.findDOMNode(refs.noExt).value;
    const line1 = ReactDOM.findDOMNode(refs.line1).value;
    const line2 = ReactDOM.findDOMNode(refs.line2).value;
    const state = ReactDOM.findDOMNode(refs.state).value;
    const postalCode = ReactDOM.findDOMNode(refs.postalCode).value;
    const references = ReactDOM.findDOMNode(refs.references).value;
    const address = { street, noInt, noExt, line1, line2, state, postalCode, references };

    Meteor.call('address.insert', {address}, (err) => {
      if (!err) {
        Alert.success(`<h4>Dirección guardada!</h4>`, {
          position: 'top-right',
          effect: 'slide',
          timeout: 3500,
          offset: 100,
          html: true,
        });

        if (this.props.location.state && this.props.location.state.fromOrder) {
          browserHistory.push('/market');
        } else {
          browserHistory.push('/address');
        }
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

    refs.street.value = null;
    refs.noInt.value = null;
    refs.noExt.value = null;
    refs.line1.value = null;
    refs.line2.value = null;
    refs.state.value = null;
    refs.postalCode.value = null;
    refs.references.value = null;
  }

  render() {
    return (

      <div className="page-wrapper">

        <div className="catalogue hero-section" data-ix="show-navbar">
          <div className="navbar w-nav" data-animation="over-right" data-collapse="medium" data-duration="400">
            <div className="w-container">
              <Link className="w-nav-brand" to="/"><img className="logo" height="100" src="images/central-fresh.svg" />
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
            <h1 className="catalogueheading heading-4">Nueva dirección</h1>
          </div>
        </div>
        <div className="productssection">
          <div className="contactcontainer w-container">

            <Col>
              <form onSubmit={this.handleSubmit}>
                <Col xs={12}>
                  <FormGroup>
                    <ControlLabel>Calle</ControlLabel>
                    <FormControl type="text" ref="street" placeholder="Calle" />
                  </FormGroup>
                </Col>

                <Col xs={6} md={4}>
                  <FormGroup>
                    <ControlLabel>Número exterior</ControlLabel>
                    <FormControl type="text" ref="noExt" placeholder="# exterior" />
                  </FormGroup>
                </Col>

                <Col xs={6} md={4}>
                  <FormGroup>
                    <ControlLabel>Número interior</ControlLabel>
                    <FormControl type="text" ref="noInt" placeholder="# interior" />
                  </FormGroup>
                </Col>

                <Col xs={6} md={4}>
                  <FormGroup>
                    <ControlLabel>Código postal</ControlLabel>
                    <FormControl type="text" ref="postalCode" placeholder="Código postal" />
                  </FormGroup>
                </Col>

                <Col xs={6} md={4}>
                  <FormGroup>
                    <ControlLabel>Colonia</ControlLabel>
                    <FormControl type="text" ref="line1" placeholder="Colonia" />
                  </FormGroup>
                </Col>

                <Col xs={6} md={4}>
                  <FormGroup>
                    <ControlLabel>Del/Mun</ControlLabel>
                    <FormControl type="text" ref="line2" placeholder="Delegación/Municipio" />
                  </FormGroup>
                </Col>

                <Col xs={6} md={4}>
                  <FormGroup>
                    <ControlLabel>Estado</ControlLabel>
                    <FormControl componentClass="select" ref="state" placeholder="select">
                      <option value="">selecciona</option>
                      <option value="cdmx">Ciudad de México</option>
                      <option value="edomex">Estado de México</option>
                    </FormControl>
                  </FormGroup>
                </Col>

                <Col xs={12}>
                <FormGroup>
                  <ControlLabel>Referencias</ControlLabel>
                  <FormControl type="text" ref="references" placeholder="Referencias" />
                </FormGroup>
                </Col>

                <Col xs={12} style={{textAlign: 'right'}}>
                  <Button onClick={() => browserHistory.goBack()}>Cancelar</Button>
                  {' '}
                  <Button type="submit" bsStyle="primary">Agregar</Button>
                </Col>
              </form>
            </Col>

          </div>
        </div>
      </div>

    )
  }
}


AddressForm.contextTypes = {
  router: React.PropTypes.object
};
