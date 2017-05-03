import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import {Col, Row, Table, Alert} from 'react-bootstrap';

import { handleStatusLabel, handleStatusColor } from '../../../../modules/orderStatusLabels';

import {ShippingAddress} from './ShippingAddress';

export class OrderDetail extends Component {
  render() {
    const {loading, order, currentUser} = this.props;
    return (

      <div className="page-wrapper">

        <div className="catalogue hero-section" data-ix="show-navbar">
          <div className="navbar w-nav" data-animation="over-right" data-collapse="medium" data-duration="400">
            <div className="w-container">
              <Link className="w-nav-brand" to="/"><img className="logo" height="100" src="../images/central-fresh.svg" />
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
            <h1 className="catalogueheading heading-4">Detalle del pedido</h1>
          </div>
        </div>
        <div className="productssection">
          <div className="contactcontainer w-container">

          <div style={{display: 'flex', flexDirection: 'column'}}>

            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Link to="/orders" style={{ marginBottom: '10px', marginTop: '20px', marginRight: '10px'}}>
                <i className="fa fa-chevron-left"></i>
              </Link>
              <h3>Detalle del pedido</h3>
            </div>

            {loading ?
              <h4>Cargando...</h4>
            :
              <div className="order-panel">
                <div>
                  <b>ID</b> {order._id}<br/>
                  <b>Fecha</b> {moment(order.createdAt).format('DD/MM/YYYY HH:mm:ss')}<br/>
                  <b style={{fontSize: '2rem'}}>Estatus <label style={handleStatusColor(order.status)}>{handleStatusLabel(order.status).toUpperCase()}</label></b><br/>
                  <b>Fecha de entrega {moment(order.shippingDate).format('DD/MM/YYYY')}</b>
                </div>

                <div className="prices">
                    <b>Importe</b> <span>{accounting.formatMoney(order.secureSubtotal || order.subtotal)}</span> <br/>
                    <b>Descuento</b> <span>{accounting.formatMoney(order.orderDiscount + order.shippingDiscount || order.orderDiscount)}</span> <br/>
                    <b>Envío</b> <span>{order.shippingType} | {accounting.formatMoney(order.shippingCost)}</span> <br/>
                    <b>Total <span>{accounting.formatMoney(order.total)}</span></b>
                </div>

                <div>
                  <h4>Productos</h4>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                    {order.products.map((product) => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.qty} {product.unit === 'pieza' ? 'pza' : 'kg' }</td>
                        <td>{accounting.formatMoney(product.currentPrice)}</td>
                        <td>{accounting.formatMoney(product.qty * product.currentPrice)}</td>
                      </tr>
                    ))}
                    </tbody>
                  </Table>
                </div>
                <Row>
                  <Col sm={6}>
                    <ShippingAddress shippingAddress={order.shippingAddress} addresses={currentUser.profile.addresses} />
                  </Col>
                  <Col sm={6}>
                    <h4>Método de pago</h4>
                    <div>
                      {order.usedCard.paymentMethod && order.usedCard.paymentMethod === 'efectivo' ?
                        <p>{order.usedCard['payment-description']}</p>
                      :
                        <p>{order.usedCard.bank_name || order.usedCard.brand} {order.usedCard.card_number}</p>
                      }
                    </div>
                  </Col>
                </Row>
              </div>
            }
            <br/>
          </div>

          </div>
        </div>
      </div>



      // {/* <div style={{display: 'flex', flexDirection: 'column'}}>
      //
      //   <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      //     <Link to="/orders" style={{ marginBottom: '10px', marginTop: '20px', marginRight: '10px'}}>
      //       <i className="fa fa-chevron-left"></i>
      //     </Link>
      //     <h3>Detalle de mi mandado</h3>
      //   </div>
      //
      //   {loading ?
      //     <h4>Cargando...</h4>
      //   :
      //     <div className="order-panel">
      //       <div>
      //         <b>ID</b> {order._id}<br/>
      //         <b>Fecha</b> {moment(order.createdAt).format('DD/MM/YYYY HH:mm:ss')}<br/>
      //         <b style={{fontSize: '2rem'}}>Estatus <label style={handleStatusColor(order.status)}>{handleStatusLabel(order.status).toUpperCase()}</label></b><br/>
      //         <b>Fecha de entrega {moment(order.shippingDate).format('DD/MM/YYYY')}</b>
      //       </div>
      //
      //       <div className="prices">
      //           <b>Importe</b> <span>{accounting.formatMoney(order.secureSubtotal || order.subtotal)}</span> <br/>
      //           <b>Descuento</b> <span>{accounting.formatMoney(order.orderDiscount + order.shippingDiscount || order.orderDiscount)}</span> <br/>
      //           <b>Envío</b> <span>{order.shippingType} | {accounting.formatMoney(order.shippingCost)}</span> <br/>
      //           <b>Total <span>{accounting.formatMoney(order.total)}</span></b>
      //       </div>
      //
      //       <div>
      //         <h4>Productos</h4>
      //         <Table responsive hover>
      //           <thead>
      //             <tr>
      //               <th>Producto</th>
      //               <th>Cantidad</th>
      //               <th>Precio Unitario</th>
      //               <th>Total</th>
      //             </tr>
      //           </thead>
      //           <tbody>
      //           {order.products.map((product) => (
      //             <tr key={product._id}>
      //               <td>{product.name}</td>
      //               <td>{product.qty} {product.unit === 'pieza' ? 'pza' : 'kg' }</td>
      //               <td>{accounting.formatMoney(product.currentPrice)}</td>
      //               <td>{accounting.formatMoney(product.qty * product.currentPrice)}</td>
      //             </tr>
      //           ))}
      //           </tbody>
      //         </Table>
      //       </div>
      //       <Row>
      //         <Col sm={6}>
      //           <ShippingAddress shippingAddress={order.shippingAddress} addresses={currentUser.profile.addresses} />
      //         </Col>
      //         <Col sm={6}>
      //           <h4>Método de pago</h4>
      //           <div>
      //             {order.usedCard.paymentMethod && order.usedCard.paymentMethod === 'efectivo' ?
      //               <p>{order.usedCard['payment-description']}</p>
      //             :
      //               <p>{order.usedCard.bank_name || order.usedCard.brand} {order.usedCard.card_number}</p>
      //             }
      //           </div>
      //         </Col>
      //       </Row>
      //     </div>
      //   }
      //   <br/>
      // </div> */}
    )
  }
}

OrderDetail.propTypes = {
  loading: React.PropTypes.bool,
  order: React.PropTypes.object,
  currentUser: React.PropTypes.object,
};
