import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';

export class Wholesale extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div style={{paddingLeft: '5%', paddingRight: '5%'}}>
        <Helmet
          title="Mayoreo de frutas y verduras directo de la central de abasto"
          meta={[
              {"name": "description", "content": "Mayoreo y servicios especiales de entrega de frutas y verduras para industrias, restaurantes, empresas, etc."}
          ]}
        />

        <h1>Mayoreo de frutas, verduras y cualquier producto de la central de abastos</h1>

        <Row>
          <Col sm={12} md={12}>
            <br/>
            <h4>¿Te interesan nuestros servicios de entrega de frutas y verduras en mayoreo?</h4>
            <br/>
            <p style={{color: 'black'}}>
            Escríbenos a <a href="mailto:mayoreo@grontify.com?Subject=Cotizacion" target="_top">mayoreo@grontify.com</a>  o <a href="mailto:contacto@grontify.com?Subject=Cotizacion" target="_top">contacto@grontify.com</a> con tus requerimientos para elaborarte una cotización y comenzar a brindarte nuestros servicios.
            <br/>
            <br/>
            Ofrecemos descuentos, producto de la mejor calidad y entregas especiales.
            </p>
            <br/>
          </Col>
        </Row>

      </div>
    )
  }
}
