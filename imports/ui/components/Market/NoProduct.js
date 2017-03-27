import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Alert from 'react-s-alert';
import { Meteor } from 'meteor/meteor';
import {Row, Col, FormGroup, InputGroup, FormControl, ControlLabel, HelpBlock, Button, PanelGroup, Panel} from 'react-bootstrap';
import moment from 'moment';

import NumericInput from 'react-numeric-input';

import 'moment/locale/es.js';
moment.locale('es');

const styles = {
  product: {
    marginTop: '1rem',
  },
  spacer: {
    display: 'table',
    padding: '1rem',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
};

export class NoProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productNameValidation: null,
      productQtyValidation: null,
    };
  }

  //Agregar producto que no esta en el catálogo
  _handleAddNoProduct() {
    const name = ReactDOM.findDOMNode(this.refs.no_product_name).value
    const price = parseFloat(ReactDOM.findDOMNode(this.refs.no_product_price).value) || 0
    const unit = ReactDOM.findDOMNode(this.refs.no_product_unit).value
    const qty = parseFloat(ReactDOM.findDOMNode(this.refs.no_product_qty).value)
    const notes = ReactDOM.findDOMNode(this.refs.no_product_notes).value

    const product = { _id: name.toUpperCase(), name, currentPrice: price, unit, notes };

    if (!name) {
      this.setState({productNameValidation: 'error'});
      return;
    } else {
      this.setState({productNameValidation: null});
    }

    if (!qty) {
      this.setState({productQtyValidation: 'error'});
      return;
    } else {
      this.setState({productQtyValidation: null});
    }

    this.props.handleProduct(qty, product);
    this.props.handleCurrentOrderSubtotal();
    Alert.success('<h4>Producto agregado a la cesta!</h4>', {
      position: 'top-right',
      effect: 'slide',
      timeout: 3500,
      offset: 100,
      html: true,
    });

    ReactDOM.findDOMNode(this.refs.no_product_name).value = null;
    ReactDOM.findDOMNode(this.refs.no_product_price).value = null;
    ReactDOM.findDOMNode(this.refs.no_product_qty).value = null;
    ReactDOM.findDOMNode(this.refs.no_product_notes).value = null;

    this.props.closeNoProductModal();
  }

  render() {
    return (
      <Col sm={12}>
            <FormGroup controlId="formControlsProductName" validationState={this.state.productNameValidation}>
              <ControlLabel>Producto</ControlLabel>
              <FormControl placeholder="¿Qué producto requieres?" type="text" ref="no_product_name" />
            </FormGroup>

            <FormGroup controlId="formControlsProductQty" validationState={this.state.productQtyValidation}>
              <ControlLabel>Cantidad solicitada</ControlLabel>
              <FormControl placeholder="Cantidad solicitada" type="number" step=".01" min="0" ref="no_product_qty" />
            </FormGroup>

            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Unidad</ControlLabel>
              <FormControl componentClass="select" placeholder="Selecciona" ref="no_product_unit">
                <option value="kilogramo">kilogramo</option>
                <option value="pieza">pieza</option>
                <option value="manojo">manojo</option>
              </FormControl>
            </FormGroup>

            <FormGroup>
              <ControlLabel>Precio en que lo compras regularmente</ControlLabel>
              <InputGroup>
                <InputGroup.Addon>$</InputGroup.Addon>
                <FormControl placeholder="Precio frecuente" type="number" step=".01" min="0" ref="no_product_price"/>
              </InputGroup>
              <HelpBlock>Opcional, el precio real te lo diremos a la entrega.</HelpBlock>
            </FormGroup>

            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Notas/Observaciones</ControlLabel>
              <FormControl componentClass="textarea" ref="no_product_notes" placeholder="Características del producto o notas adicionales" />
            </FormGroup>


            <Button bsStyle="success" block onClick={this._handleAddNoProduct.bind(this)}>Agregar producto a la cesta</Button>
      </Col>
    )
  }
}
