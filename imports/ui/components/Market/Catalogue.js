import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Alert from 'react-s-alert';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import {Row, Col, Grid, FormGroup, InputGroup, FormControl, ControlLabel, HelpBlock, Button, PanelGroup, Panel, Modal} from 'react-bootstrap';
import moment from 'moment';

import NumericInput from 'react-numeric-input';
import {Loader} from 'react-loaders';

import 'moment/locale/es.js';
moment.locale('es');

import catalogue from '../../../startup/client/fake_data.js';

import { OrderSummary } from './OrderSummary';
import { Product } from './Product';
import { NoProduct } from './NoProduct';

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

export class Catalogue extends Component {
  constructor(props) {
    super(props);

    this.state= {
      catalogue,
      currentOrder: this.props.currentOrder ? this.props.currentOrder : JSON.parse(localStorage.getItem('currentOrder-null')),
      shippingType: null, //ID
      shippingCost: null, //Price
      shippingTypeName: null, //Name
      // shippingType: 'express',
      // shippingCost: 90,
      shippingDate: moment(),
      shippingAddress: null,
      paymentMethod: null,
      currentOrderSubtotal: 0,
      loadingCardsList: false,
      cards: [],
      creatingOrder: false,
      showModalNoProduct: false,
      currentOrderComments: '',
    }

    this.loadInterval = false;
  }

  componentDidMount() {
    this._handleCurrentOrderSubtotal();

    if (!this.state.currentOrder.length) {
      this._handleShippingType('');
    }

    this.setState({loadingCardsList: !this.state.loadingCardsList});

    this.loadInterval = setInterval(
      Meteor.call('listCards', (error, response) => {
        if ( error ) {
          console.log(error);
        } else {
          myCards = _.map(response, function(card) {
            card.value = card['id'];
            card.label = card['card_number'] + ' - ' + card['bank_name'];
            return card;
          });
          // this.loadInterval && this.setState({cards: _.concat(myCards)});
          this.loadInterval && this.setState({cards: _.concat(myCards, {value: 'efectivo', label: 'Pago en efectivo a la entrega.'})});
        }
        this.loadInterval &&  this.setState({loadingCardsList: !this.state.loadingCardsList});
      })
    , 500);

    var $L = 1200,
    		$cart_trigger = $('#cd-cart-trigger'),
    		$lateral_cart = $('#cd-cart'),
    		$shadow_layer = $('#cd-shadow-layer');

    	//open cart
    	$cart_trigger.on('click', function(event){
    		event.preventDefault();
        //close lateral menu (if it's open)
    		this.toggle_panel_visibility($lateral_cart, $shadow_layer, $('body'));
    	}.bind(this));

      //close lateral cart
    	$shadow_layer.on('click', function(){
    		$shadow_layer.removeClass('is-visible');
    		// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
    		if( $lateral_cart.hasClass('speed-in') ) {
    			$lateral_cart.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
    				$('body').removeClass('overflow-hidden');
    			});
    		} else {
    			$lateral_cart.removeClass('speed-in');
    		}
    	}.bind(this));
  }

  toggle_panel_visibility($lateral_panel, $background_layer, $body) {
    if( $lateral_panel.hasClass('speed-in') ) {
  		// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
  		$lateral_panel.removeClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
  			$body.removeClass('overflow-hidden');
  		});
  		$background_layer.removeClass('is-visible');

  	} else {
  		$lateral_panel.addClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
  			$body.addClass('overflow-hidden');
  		});
  		$background_layer.addClass('is-visible');
  	}
  }

  componentWillUnmount () {
    this.props.searchQuery.set('');
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
  }

  _handleProduct(value, product) {
    console.log("Handle Product Called!",value,product);
    let myOrder = this.props.currentOrder;
    const {_id, name, currentPrice, unit, notes, grams} = product;
    let orderProduct = {};

    orderProduct._id = _id;
    orderProduct.name = name;
    orderProduct.currentPrice = currentPrice;
    orderProduct.unit = unit;

    if (grams) {
      orderProduct.qty = value / 1000;
    } else {
      orderProduct.qty = value;
    }

    //Notas del producto en la orden
    if (notes) {
      orderProduct.notes = notes
    }

    let productExist = _.some(myOrder, (element) => {
      return element.name === orderProduct.name;
    });

    if(!productExist) {
      if (!orderProduct.qty) {
        return;
      }
      myOrder.push(orderProduct)
      localStorage.setItem(`currentOrder-${Meteor.userId()}`, JSON.stringify(myOrder))
      this.setState({currentOrder: myOrder})
    } else {
      let productIndex = _.findIndex(myOrder, (element) => {
        return element.name === name;
      });

      myOrder[productIndex].qty = orderProduct.qty;

      let newOrder = _.pullAllBy(myOrder, [{ 'qty': 0 }], 'qty');

      localStorage.setItem(`currentOrder-${Meteor.userId()}`, JSON.stringify(newOrder));
      this.setState({currentOrder: newOrder});
    }

    if (!myOrder.length) {
      this._handleShippingType('');
    }
  }

  _removeOrderProduct(product) {
    let myOrder = this.state.currentOrder;
    let productIndex = _.findIndex(myOrder, (element) => {
      return element.name === product.name;
    });

    _.pullAt(myOrder, productIndex);

    localStorage.setItem(`currentOrder-${Meteor.userId()}`, JSON.stringify(myOrder));
    if (Meteor.userId()) {
        localStorage.setItem(`currentOrder-null`, JSON.stringify(myOrder));
    }
    this.setState({currentOrder: myOrder});

    if (!myOrder.length) {
      this._handleShippingType('');
    }

    this._handleCurrentOrderSubtotal();
  }

  _handleShippingType(selectedShippingType) {
    this.setState({shippingType: selectedShippingType});

    let type = _.find(this.props.shippingTypes, (type) => {
      return type._id === selectedShippingType
    });
    this.setState({shippingCost: type ? type.currentCost : 0, shippingTypeName: type ? type.name : ''});
    switch (type ? type.name : '') {
      case 'Estándar':
        this.setState({shippingDate: moment()});
        break;
      case 'Programado':
        this.setState({shippingDate: moment().add(2, 'd')});
        break;
      case 'Express':
        this.setState({shippingDate: moment()});
        break;
      default:
        this.setState({shippingDate: moment()});
    }
  }

  _handleCurrentOrderSubtotal() {
    let currentOrderSubtotal = 0;
    if (this.state.currentOrder.length) {
      currentOrderSubtotal = _.reduce(this.state.currentOrder, function(sum, n){
          return { currentPrice: sum.currentPrice + n.currentPrice * n.qty }
        }, { currentPrice: 0 }).currentPrice;
    }

    this.setState({currentOrderSubtotal});
  }

  _handleShippingDate(shippingDate) {
    this.setState({ shippingDate });
  }

  _handlePaymentMethod(paymentMethod) {
    this.setState({ paymentMethod });
  }

  _handleShippingAddress(shippingAddress) {
    this.setState({ shippingAddress });
  }

  _handleOrderComments(currentOrderComments) {
    this.setState({ currentOrderComments });
  }

  _createOrder() {
    const {currentOrder, shippingType, shippingAddress, shippingCost, shippingDate, currentOrderSubtotal, paymentMethod, currentOrderComments} = this.state;
    this.setState({creatingOrder: !this.state.creatingOrder});

    Meteor.call('orders.insert', {products: currentOrder, shippingType, shippingAddress,
    shippingCost, shippingDate: shippingDate.toDate(), subtotal: currentOrderSubtotal, paymentMethod,
    device_session_id: this.props.device_session_id, comments: currentOrderComments}, (err, result) => {
      if (!err) {
        console.log(result);

        if (result && result.error) {
          Alert.error(`<h4>${result.error.description} ${result.error.error_code}</h4>`, {
            position: 'top-right',
            effect: 'slide',
            onShow: function () {
                console.log('Error al crear orden!')
            },
            timeout: 2000,
            offset: 100,
            html: true,
          });
          this.setState({creatingOrder: false});
          Meteor.call('orders.remove', {orderId: result.orderId});
        } else {
          localStorage.setItem(`currentOrder-${Meteor.userId()}`, JSON.stringify([]));
          localStorage.removeItem(`currentOrder-null`);
          Alert.success('<h4>Excelente, orden generada!</h4>', {
            position: 'top-right',
            effect: 'slide',
            onShow: function () {
                console.log('Orden creada con éxito!')
            },
            timeout: 3500,
            offset: 100,
            html: true,
          });

          // localStorage.setItem(`currentOrder-${Meteor.userId()}`, JSON.stringify([]))
          // localStorage.setItem(`currentOrder-null`, JSON.stringify([]))

          this.setState({currentOrder: []});

          browserHistory.push(`/order/${result.orderId || result.order_id}`);
        }
      } else {
        Alert.error(`<h4>${err.reason}</h4>`, {
          position: 'top-right',
          effect: 'slide',
          onShow: function () {
              console.log('Error al crear orden!')
          },
          timeout: 2000,
          offset: 100,
          html: true,
        });
        this.setState({creatingOrder: false});
      }
    });

    this.setState({creatingOrder: !this.state.creatingOrder});
  }

  closeNoProductModal() {
    this.setState({ showModalNoProduct: false });
  }

  handleLogout() {
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
  }

  openCart(event) {
    event.preventDefault();
    //close lateral menu (if it's open)
    this.toggle_panel_visibility($('#cd-cart'), $('#cd-shadow-layer'), $('body'));
  }

  render() {
    return (
      <div>
        <OrderSummary {...this.state}
          fistOrderDiscount={this.state.currentOrderSubtotal >= 200 && this.props.ordersCount === 0 ? this.state.currentOrderSubtotal*0.20 : 0}
          shippingDiscount={this.state.currentOrderSubtotal >= 650 && this.state.shippingTypeName !== 'Express' ? this.state.shippingTypeName === 'Estándar' ? 60 : 40 : 0 }
          handleShippingType={this._handleShippingType.bind(this)}
          handleShippingAddress={this._handleShippingAddress.bind(this)}
          handleOrderComments={this._handleOrderComments.bind(this)}
          removeOrderProduct={this._removeOrderProduct.bind(this)}
          handleShippingDate={this._handleShippingDate.bind(this)}
          shippingTypes={this.props.shippingTypes}
          handlePaymentMethod={this._handlePaymentMethod.bind(this)}
          addresses={!this.props.currentUser ? [] : this.props.currentUser.profile.addresses}
          createOrder={this._createOrder.bind(this)}/>

          {/* <div id="cd-cart-trigger" className="fixed-br"> */}
          <div id="cd-cart-trigger">
              <div className="fixedcart"><img src="images/upermarket.svg" width="40" />
                <div className="cartamount">{accounting.formatMoney(this.state.currentOrderSubtotal)}</div>
              </div>
              {/* <div className="mini-cart" >
                  <div className="basket"> <a href="#"><span>{this.state.currentOrder.length}</span></a> </div>
                  <div className="cart-total"><span>{accounting.formatMoney(this.state.currentOrderSubtotal)}</span></div>
              </div> */}
          </div>

          <div className="page-wrapper">
            <div className="catalogue hero-section" data-ix="show-navbar">
              <div className="navbar w-nav" data-animation="over-right" data-collapse="medium" data-duration="400">
                <div className="w-container">
                  <Link className="w-nav-brand" to="/"><img className="logo" height="90" src="images/central-fresh-logo-white.png" />
                  </Link>
                  <nav className="fixednavmenu nav-menu w-nav-menu" role="navigation">
                    <Link className="nav-link w-nav-link" to="/">Inicio</Link>
                    <Link className="nav-link w-nav-link" to="/market">Catálogo</Link>
                    <Link className="nav-link w-nav-link" to="/market?category=frutas">Frutas</Link>
                    <Link className="nav-link w-nav-link" to="/market?category=verduras">Verduras</Link>
                    <Link className="nav-link w-nav-link" to="/contact">Contáctanos</Link>


                    {this.props.currentUser ?
                      <div className="w-dropdown" data-delay="0" data-hover="1">
                        <div className="login-dropdown nav-link w-dropdown-toggle">
                          <div>Tu cuenta</div>
                          <div className="w-icon-dropdown-toggle"></div>
                        </div>
                        <nav className="logindropdownlist w-dropdown-list">
                          <a className="dropdownlink w-dropdown-link" href="#" onClick={this.openCart.bind(this)}>Mi cesta</a>
                          <Link className="dropdownlink w-dropdown-link" to="/profile">Mi perfil</Link>
                          <Link className="dropdownlink w-dropdown-link" to="/orders">Pedidos</Link>
                          <Link className="dropdownlink w-dropdown-link" to="/payment">Datos de pago</Link>
                          <Link className="dropdownlink w-dropdown-link" to="/address">Direcciones</Link>
                          <a className="dropdownlink w-dropdown-link" href="#" onClick={this.handleLogout}>Salir</a>
                        </nav>
                      </div>
                    :
                      <Link className="nav-link w-nav-link" to="/register">Regístrate</Link>
                    }

                  </nav>
                  <div className="menu-button-2 w-nav-button">
                    <div className="w-icon-nav-menu"></div>
                  </div>
                </div>
              </div>
              <div className="w-container">
                <h1 className="catalogueheading heading-4">Catálogo de productos</h1>
              </div>
            </div>
            <div className="filtersection">
              <div className="filtercontainer w-container">
                <div className="w-form">
                    <input className="searchfield w-input" maxLength="256" name="Search" placeholder="Busca un producto" type="text" ref="search"
                    onChange={(e) => { this.props.searchQuery.set(e.target.value) }} />
                </div>
                <div className="filtertext">Filtros</div>
                <Link className="filterlink" style={this.props.filterQuery.get() === "frutas" ? {color: '#ed6663'} : {}} to="/market?category=frutas" >Frutas</Link>
                <Link className="filterlink" style={this.props.filterQuery.get() === "verduras" ? {color: '#ed6663'} : {}} to="/market?category=verduras" >Verduras</Link>
                <Link className="filterlink" style={this.props.filterQuery.get() === "" ? {color: '#ed6663'} : {}} to="/market" >Todos</Link>
              </div>
            </div>
            <div className="productssection">
              <div className="productscontainer w-container">
                <div className="w-row">

                  {this.props.loading ?
                    <div style={{paddingBottom: '20px', paddingLeft: '50%'}}>
                      <Loader type="ball-scale-multiple" active={true} />
                    </div>
                  :

                    !this.props.catalogue.length ?
                      <div>
                        {/* <p>¿No encuentras el producto que buscas? No hay problema
                        <a href="#" onClick={() => this.setState({showModalNoProduct: true})}>da clic aquí</a>, llena el formulario con los datos del producto requerido y te lo llevamos.</p> */}
                        <p>Producto no encontrado!</p>
                      </div>
                    :
                      this.props.catalogue.map(product => {
                        if (product.productStatus === 'activo') {
                            return <Product key={product._id} product={product} currentOrder={this.state.currentOrder}
                            handleProduct={this._handleProduct.bind(this)}
                            handleCurrentOrderSubtotal={this._handleCurrentOrderSubtotal.bind(this)}/>
                        }
                      })
                  }

                </div>
              </div>
            </div>
          </div>

          <div id="cd-shadow-layer"></div>

      </div>
    )
  }
}


//
// <h2>Catálogo</h2>
// <Row>
//   <Col sm={12} md={6}>
//     <PanelGroup accordion>
//       <Panel header={<strong style={{cursor: 'pointer'}}><i className="fa fa-info" aria-hidden="true"></i> Información</strong>} bsStyle="info" style={{fontSize: '1.2rem'}} eventKey="1">
//         El precio de los productos es aproximado, el total real de tu mandado te será notificado a la entrega y mediante email o whatsapp.<br/>
//       </Panel>
//     </PanelGroup>
//   </Col>
//   <Col sm={12} md={6}>
//     <FormGroup>
//       <FormControl bsSize="large" placeholder="Buscar producto" type="text" ref="search"
//         onChange={(e) => { this.props.searchQuery.set(e.target.value) }}/>
//     </FormGroup>
//     {/* <a href="#" onClick={() => this.setState({showModalNoProduct: true})} style={{float: 'right'}}>
//       <i className="fa fa-exclamation-circle" aria-hidden="true"></i> No encuentro el producto que busco
//     </a> */}
//   </Col>
//   <Col xs={12} className="products">
//
//   </Col>
// </Row>
//
// <section className="main-container col2-left-layout bounceInUp animated">
// <Grid>
//   <Row>
//
//   <aside className="col-left sidebar col-sm-3 col-xs-12 wow bounceInUp animated animated animated animated" style={{visibility: "visible"}}>
//     <div className="side-nav-categories">
//       <div className="block-title"> Filtrar </div>
//       <div className="box-content box-category">
//         <ul>
//           <li><a style={this.props.filterQuery.get() === "" ? {color: '#ed6663'} : {}} onClick={() => { this.props.filterQuery.set("") }}>Todos</a> <span className="subDropdown minus"></span>
//             {/* <ul className="level0_415" style={{display:"block"}}>
//               <li> <a href="#"> Orgánicas </a> <span className="subDropdown plus"></span></li>
//               <li> <a href="#"> No orgánicas </a> <span className="subDropdown plus"></span></li>
//             </ul> */}
//           </li>
//           <li><a style={this.props.filterQuery.get() === "frutas" ? {color: '#ed6663'} : {}} onClick={() => { this.props.filterQuery.set("frutas") }}>Frutas&lrm;</a>
//             {/* <ul className="level0_415" style={{display:"block"}}>
//               <li> <a href="#"> Orgánicas </a> <span className="subDropdown plus"></span></li>
//               <li> <a href="#"> No orgánicas </a> <span className="subDropdown plus"></span></li>
//             </ul> */}
//           </li>
//           <li><a style={this.props.filterQuery.get() === "verduras" ? {color: '#ed6663'} : {}} onClick={() => { this.props.filterQuery.set("verduras") }}>Verduras&lrm;</a></li>
//         </ul>
//       </div>
//     </div>
//
//     <div className="custom-slider" style={{display: "none"}}>
//       <div>
//         <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
//           <ol className="carousel-indicators">
//             <li className="active" data-target="#carousel-example-generic" data-slide-to="0"></li>
//             <li data-target="#carousel-example-generic" data-slide-to="1" className=""></li>
//             <li data-target="#carousel-example-generic" data-slide-to="2" className=""></li>
//           </ol>
//           <div className="carousel-inner">
//             <div className="item active"><img src="images/blog-banner.png" alt="slide3"/>
//               <div className="carousel-caption">
//                 <h3><a title=" Sample Product" href="product-detail.html">50% OFF</a></h3>
//                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//                 <a className="link" href="#">Buy Now</a></div>
//             </div>
//             <div className="item"><img src="images/blog-banner.png" alt="slide1"/>
//               <div className="carousel-caption">
//                 <h3><a title=" Sample Product" href="product-detail.html">Hot collection</a></h3>
//                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//               </div>
//             </div>
//             <div className="item"><img src="images/blog-banner.png" alt="slide2"/>
//               <div className="carousel-caption">
//                 <h3><a title=" Sample Product" href="product-detail.html">Summer collection</a></h3>
//                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//               </div>
//             </div>
//           </div>
//           <a className="left carousel-control" href="#carousel-example-generic" data-slide="prev"> <span className="sr-only">Previous</span> </a> <a className="right carousel-control" href="#carousel-example-generic" data-slide="next"> <span className="sr-only">Next</span> </a></div>
//       </div>
//     </div>
//
//   </aside>
//
//     <div className="col-main col-sm-9 col-xs-12 product-grid">
//       <div className="pro-coloumn">
//         <article className="col-main">
//           <div className="category-products">
//             <ul className="products-grid">
//             {this.props.loading ?
//               <div style={{marginTop: '20px'}}>
//                 <Loader type="ball-scale-multiple" active={true} />
//               </div>
//             :
//
//               !this.props.catalogue.length ?
//                 <div>
//                   {/* <p>¿No encuentras el producto que buscas? No hay problema
//                   <a href="#" onClick={() => this.setState({showModalNoProduct: true})}>da clic aquí</a>, llena el formulario con los datos del producto requerido y te lo llevamos.</p> */}
//                   <p>Producto no encontrado!</p>
//                 </div>
//               :
//                 this.props.catalogue.map(product => {
//                   if (product.productStatus === 'activo') {
//                       return <Product key={product._id} product={product} currentOrder={this.state.currentOrder}
//                       handleProduct={this._handleProduct.bind(this)}
//                       handleCurrentOrderSubtotal={this._handleCurrentOrderSubtotal.bind(this)}/>
//                   }
//                 })
//             }
//             </ul>
//           </div>
//         </article>
//       </div>
//     </div>
//
//   </Row>
// </Grid>
// </section>
//
// <div id="cd-shadow-layer"></div>
// <Modal show={this.state.showModalNoProduct} onHide={this.closeNoProductModal.bind(this)}>
//   <Modal.Header closeButton>
//     <Modal.Title>Agregar producto a la cesta</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <h4>Frutas o verduras que no están en el catálogo</h4>
//     <p>Agrega la fruta o verdura que quieres y no encontraste en el catálogo</p>
//
//     <hr/>
//
//     <Row>
//       <NoProduct
//         handleProduct={this._handleProduct.bind(this)}
//         handleCurrentOrderSubtotal={this._handleCurrentOrderSubtotal.bind(this)}
//         closeNoProductModal={this.closeNoProductModal.bind(this)}
//       />
//     </Row>
//   </Modal.Body>
// </Modal>





Catalogue.propTypes = {
  loading: PropTypes.bool,
  catalogue: PropTypes.array,
  shippingTypes: PropTypes.array,
  ordersCount: PropTypes.number,
  currentUser: PropTypes.object,
  device_session_id: PropTypes.string,
};
