import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';

export class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sending: false
    }
  }

  submitMessage(event) {
    event.preventDefault();

    const { refs } = this;
    const name = refs.name.value;
    const email = refs.email.value;
    const phone = refs.phone.value;
    const subject = refs.subject.value;
    const message = refs.message.value;

    this.setState({sending: !this.state.sending});

    Meteor.call('contactMessages.insert', {name, email, phone, subject, message}, (err) => {
      if (!err) {
        swal({
          title: "Mensaje enviado con éxito",
          text: "En breve nos pondremos en contacto contigo.",
          type: "success",
          showConfirmButton: false,
          timer: 3500
        });
      } else {
        swal({
          title: "Error. No se pudo enviar el mensaje",
          text: err.reason,
          type: "error",
          showConfirmButton: false,
          timer: 2500
        });
      }

      this.setState({sending: !this.state.sending});

      refs.name.value = '';
      refs.email.value = '';
      refs.phone.value = '';
      refs.subject.value = '';
      refs.message.value = '';
    });
  }

  render() {
    return (
      // <div style={{paddingLeft: '5%', paddingRight: '5%'}}>
      //   <Helmet
      //     title="Contáctanos"
      //     meta={[
      //         {"name": "description", "content": "Contáctanos. Tienes alguna pregunta, duda o sugerencia. Frutas y verduras a domicilio."}
      //     ]}
      //   />
      //
      //   <h1>Contáctanos</h1>
      //
      //   <Row>
      //     <Col sm={12} md={8}>
      //       <p>Envianos un mensaje y te responderemos a la brevedad, casí siempre en unos minutos.</p>
      //       <form className="cf" onSubmit={this.submitMessage.bind(this)}>
      //         <div className="half left cf">
      //           <input type="text" id="input-name" ref="name" placeholder="Nombre" required/>
      //           <input type="email" id="input-email" ref="email" placeholder="Email" required/>
      //           <input type="text" id="input-phone" ref="phone" placeholder="Teléfono (Opcional)"/>
      //         </div>
      //         <div className="half right cf">
      //           <input type="text" id="input-subject" ref="subject" placeholder="Asunto" required/>
      //           <textarea name="message" id="input-message" ref="message" placeholder="Mensaje"></textarea>
      //         </div>
      //         <button type="submit" id="input-submit" className="btn btn-lg btn-block" disabled={this.state.sending}>{!this.state.sending ? 'Enviar mensaje' : 'Enviando...'}</button>
      //       </form>
      //     </Col>
      //     <Col sm={12} md={4}>
      //       <h3>Datos de contacto</h3>
      //       <h4>Nuestras Oficinas</h4>
      //       <p>Paseo de la Reforma No. 296 Piso 42 Col. Juárez Del. Cuauhtémoc CP. 06600 <br/>México, México</p>
      //       <h4>Teléfono</h4>
      //       <p>55 3119 0224</p>
      //       <h4><i className="fa fa-whatsapp"></i> Whatsapp</h4>
      //       <p>55 3119 0224</p>
      //       <h4>Email</h4>
      //       <p>contacto@grontify.com</p>
      //     </Col>
      //   </Row>
      //
      // </div>


      <div className="page-wrapper">

        <Helmet
          title="Contáctanos"
          meta={[
              {"name": "description", "content": "Contáctanos. Tienes alguna pregunta, duda o sugerencia. Frutas y verduras a domicilio."}
          ]}
        />

        <div className="catalogue hero-section" data-ix="show-navbar">
          <div className="navbar w-nav" data-animation="over-right" data-collapse="medium" data-duration="400">
            <div className="w-container">
              <Link className="w-nav-brand" to="/"><img className="logo" height="90" src="images/central-fresh-logo-white.png" />
              </Link>
              <nav className="fixednavmenu nav-menu w-nav-menu" role="navigation">
              <Link className="nav-link w-nav-link" to="/market">Catálogo</Link>
              <Link className="nav-link w-nav-link" to="/market?category=frutas">Frutas</Link>
              <Link className="nav-link w-nav-link" to="/market?category=verduras">Verduras</Link>
              <Link className="nav-link w-nav-link" to="/contact">Contáctanos</Link>
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
            <h1 className="catalogueheading heading-4">Contáctanos</h1>
          </div>
        </div>
        <div className="productssection">
          <div className="contactcontainer w-container">
            <div className="w-row">
              <div className="w-col w-col-8 w-col-small-small-stack">
                <h2 className="contactheading help">Escríbenos</h2>
                <div className="contactdata help">Mándanos un mensaje y en breve nos pondremos en contacto.</div>
                <div className="w-form">
                  <form name="email-form" onSubmit={this.submitMessage.bind(this)}>
                    <div className="w-row">
                      <div className="column-9 w-col w-col-6">
                        <input className="contactformfield w-input" ref="name" name="name" placeholder="Ingresa tu nombre" type="text" />
                        <input className="contactformfield w-input" ref="email" name="email" placeholder="Ingresa tu email" required="required" type="email" />
                        <input className="contactformfield w-input" ref="phone" name="Phone" placeholder="Ingresa tu teléfono" type="text" />
                      </div>
                      <div className="w-col w-col-6">
                        <input className="contactformfield w-input" ref="subject" name="Subject" placeholder="Asunto" type="text" required="required" />
                        <textarea className="contactformfield message w-input" ref="message" name="Message" placeholder="Ingresa tu mensaje" required="required"></textarea>
                      </div>
                    </div>
                    <input className="submit-button w-button" type="submit" value={!this.state.sending ? 'Enviar mensaje' : 'Enviando...'} disabled={this.state.sending}/>
                  </form>
                </div>
              </div>
              <div className="column-10 w-col w-col-4 w-col-small-small-stack">
                <h2 className="contactheading">Datos de contacto</h2>
                <div className="contactdata"><span className="contactdataspan">Oficinas centrales</span> Paseo de la reforma 296 Piso 42 Col. Juárez México, México CP. 06600</div>
                <div className="contactdata"><span className="contactdataspan">Bodega</span> Nave I Bodega B-003, Mercado de Aves y Cárnicos, Central de Abasto, Ciudad de México, México.</div>
                <div className="contactdata"><span className="contactdataspan">Teléfono / Whatsapp</span> 55 3119 0224</div>
                <div className="contactdata"><span className="contactdataspan">Email</span> contacto@grontify.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
