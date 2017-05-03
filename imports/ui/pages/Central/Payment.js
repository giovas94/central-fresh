import React, { Component, PropTypes } from 'react';
import Alert from 'react-s-alert';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import {Row, Col} from 'react-bootstrap';

import {Loader} from 'react-loaders';

import { CreditCard } from '../../components/Market/Payment/CreditCard.js';
import { List } from '../../components/Market/Payment/List.js';

const device_session_id = OpenPay.deviceData.setup();

export class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingCardsList: false,
      savingCard: false,
      cards: []
    }

    this.loadInterval = false;
  }

  componentDidMount() {
    this.setState({loadingCardsList: !this.state.loadingCardsList});

    this.loadInterval = setInterval(
      Meteor.call('listCards', (error, response) => {
        if ( error ) {
          Alert.error(error.reason, {
            position: 'top-right',
            effect: 'slide',
            timeout: 3500,
            offset: 100,
            html: true,
          });
        } else {
          this.loadInterval && this.setState({cards: response});
        }
        this.loadInterval &&  this.setState({loadingCardsList: !this.state.loadingCardsList});
      })
    , 500);
  }

  componentWillUnmount () {
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
  }

  _newCard(card) {
    this.setState({savingCard: true});
    OpenPay.token.create(card, (response) => {
      console.log(response)

      const card_req = {
        token_id: response.data.id,
        device_session_id: device_session_id
      };

      Meteor.call('payments.insert', {card_req}, (err, result) => {
        if (!err) {
          Alert.success(`<h4>Tarjeta guardada correctamente!</h4>`, {
            position: 'top-right',
            effect: 'slide',
            timeout: 4500,
            offset: 100,
            html: true,
          });

          if (this.props.location.state && this.props.location.state.fromOrder) {
            browserHistory.push('/market');
          } else {
            this.setState({loadingCardsList: !this.state.loadingCardsList});
            Meteor.call('listCards', (error, response) => {
              if ( error ) {
                Alert.error(error.reason, {
                  position: 'top-right',
                  effect: 'slide',
                  timeout: 3500,
                  offset: 100,
                  html: true,
                });
              } else {
                this.setState({cards: response});
              }
              this.setState({loadingCardsList: !this.state.loadingCardsList});
            });
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
        this.setState({savingCard: false});
      });
    }, (error) => {
      console.log(error.data.description);
      Alert.error(error.data.description, {
        position: 'top-right',
        effect: 'slide',
        timeout: 3500,
        offset: 100,
        html: true,
      });
      this.setState({savingCard: false});
    });
  }

  _deleteCard(cardId) {
    swal({
      title: "¿Estás seguro?",
      text: "Eliminar esta tarjeta!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Sí, quiero eliminarla!",
      cancelButtonText: "No",
      closeOnConfirm: false,
      closeOnCancel: true,
    },
    function(isConfirm){
      if (isConfirm) {
        Meteor.call('payments.delete', {cardId}, (err) => {
          if (!err) {
            swal("Tarjeta eliminada!", "La tarjeta fue eliminada.", "success");

            this.setState({loadingCardsList: !this.state.loadingCardsList});
            Meteor.call('listCards', (error, response) => {
              if ( error ) {
                Alert.error(error.reason, {
                  position: 'top-right',
                  effect: 'slide',
                  timeout: 3500,
                  offset: 100,
                  html: true,
                });
              } else {
                this.setState({cards: response});
              }
              this.setState({loadingCardsList: !this.state.loadingCardsList});
            });
          } else {
            swal('Error!', err.reason, "error");
          }
        });
      }
    }.bind(this));
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
            <h1 className="catalogueheading heading-4">Tarjetas guardadas</h1>
          </div>
        </div>
        <div className="productssection">
          <div className="contactcontainer w-container">

            <Row>
              <Col sm={12} md={6}>
                <h3>Agregar método de pago</h3>
                <p style={{fontSize: 'small'}}>Ingresa los datos exactamente como aparecen en la tarjeta. <br/>Tu tarjeta y pagos son procesados de forma segura por <img src="img/logo_openpay.png" width="55px" alt="Openpay"/> </p>
                {this.state.savingCard ?
                  <div>
                    <br/>
                    <Loader type="ball-pulse" active={true} />
                  </div>
                :
                  <CreditCard newCard={this._newCard.bind(this)} />
                }
              </Col>

              <Col sm={12} md={6}>
                <h3>Mis tarjetas</h3>
                <List loading={this.state.loadingCardsList} cards={this.state.cards} deleteCard={this._deleteCard.bind(this)}/>
              </Col>
            </Row>

          </div>
        </div>
      </div>



    )
  }
}


Payment.contextTypes = {
  router: React.PropTypes.object
};
