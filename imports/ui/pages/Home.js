import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Alert from 'react-s-alert';
import { Link, browserHistory } from 'react-router';
import {Row, Col, Grid} from 'react-bootstrap';


let showAreaAlert = new ReactiveVar(true);

export class Home extends Component {
  componentDidMount() {
    // if (showAreaAlert.get()) {
    //   swal({
    //     imageUrl: "images/logo_square.png",
    //     title: "Área de servicio",
    //     text: "Actualmente nuestro servicio se proporciona en la Ciudad de México y el municipio de Huixquilucan Edo. Méx.",
    //     timer: 4500,
    //     showConfirmButton: true
    //   });
    //   showAreaAlert.set(false);
    // }
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

  render() {
    return (
      // <div className="content">
      //
      //   <Helmet
      //       title="Inicio"
      //       meta={[
      //           {"name": "description", "content": "Frutas y verduras a domicilio."}
      //       ]}
      //   />
      //
      //   <Grid fluid="true" style={{padding: 0}}>
      //     <section>
      //       <img className="img-responsive" src="images/slider/slide1.jpg"/>
      //     </section>
      //   </Grid>
      //
      //
      //   <div className="header-background bg-image">
      //     <div className="container" style={{textAlign: 'center'}}>
      //       <h1 style={{color: '#88be4c'}}>Central Fresh</h1>
      //       <h2>Frutas y verduras a domicilio. Del agricultor a la puerta de tu hogar.</h2>
      //       {/* <Link to="how-works" className="btn btn-default btn-lg">¿Cómo lo utilizo?</Link> */}
      //       <Link to="/login" className="btn btn-success btn">Regístrate y haz tu pedido ahora</Link>
      //     </div>
      //   </div>
      //
      //   <div className="our-features-box wow bounceInUp animated animated">
      //     <div className="container">
      //       <ul>
      //         <li>
      //           <div className="feature-box free-shipping">
      //             <div className="icon-truck"></div>
      //             <div className="content" style={{fontSize: '12px'}}>Entregas GRATIS en ordenes mayores a MXN $650</div>
      //           </div>
      //         </li>
      //         <li>
      //           <div className="feature-box need-help">
      //             <div className="icon-support"></div>
      //             <div className="content">¿Necesitas ayuda? <br/>55-3119-0224</div>
      //           </div>
      //         </li>
      //         <li>
      //           <div className="feature-box payment-methods">
      //             <div className="icon-card"></div>
      //             <div className="content">Paga con tarjeta de crédito o débito</div>
      //           </div>
      //         </li>
      //         <li className="last">
      //           <div className="feature-box first-discount last">
      //             <div className="icon-coupon"></div>
      //             <div className="content" style={{fontSize: '10px'}}>Recibe 20% de descuento en tu primer orden mayor a $200</div>
      //           </div>
      //         </li>
      //       </ul>
      //     </div>
      //   </div>
      //
      //   <section className="section">
      //     <div className="container">
      //       <div className="col-7 details">
      //         <h3>¿Por qué Central Fresh es la mejor opción?</h3>
      //         <ul>
      //           <li>Solo frutas y verduras de primera calidad</li>
      //           <li>Al mejor precio garantizado</li>
      //           <li>Haz tu pedido ahora y recibe mañana a la puerta de tu hogar</li>
      //           <li>Entregas GRATIS en ordenes mayores a MXN $650</li>
      //         </ul>
      //       </div>
      //     </div>
      //   </section>
      //
      // </div>

      // <div>
      //   <Helmet
      //       title="Homepage"
      //       meta={[
      //           {"name": "description", "content": "Frutas y verduras a domicilio. De la central a tu hogar"}
      //       ]}
      //   />
      //
      //   <div className="header-background bg-image">
      //     <div className="container">
      //       <h1>Grontify</h1>
      //       <h2>Frutas y verduras a domicilio. De la central a tu hogar</h2>
      //       <Link to="how-works" className="btn btn-default btn-lg">¿Cómo lo utilizo?</Link>
      //     </div>
      //   </div>
      //
      //
      //   <section className="section">
      //     <div className="container">
      //       <div className="col-3 text--center">
      //         <img src="https://res.cloudinary.com/grontify/image/upload/v1477066907/mascot/grontify-mascot-HQ.png" alt="" className="details-img--ball"/>
      //       </div>
      //       <div className="col-7 details">
      //         <h3>¿Por qué Grontify es genial?</h3>
      //         <ul>
      //           <li>Frutas y verduras de primera</li>
      //           <li>A precios de la central</li>
      //           <li>Si así lo prefieres, recibe en menos de una hora</li>
      //           <li>Entregas GRATIS en ordenes mayores a MXN $550</li>
      //         </ul>
      //       </div>
      //     </div>
      //   </section>
      //
      //
      //   <section className="section section--primary">
      //     <div className="container">
      //       <div className="col-3 features">
      //         <i className="fa fa-bolt"></i>
      //         <p>
      //           Entrega express. Recibe en menos de una hora o programa tu entrega, como tu prefieras!
      //         </p>
      //       </div>
      //       <div className="col-3 features">
      //         <i className="fa fa-credit-card"></i>
      //         <p>
      //           Paga con tarjeta de crédito o débito. No te realizamos ningún cargo hasta que recibas tu pedido!
      //         </p>
      //       </div>
      //       <div className="col-3 features">
      //         <i className="fa fa-heart"></i>
      //         <p>
      //           Invita a tus amigos a utilizar Grontify. Obtén entregas GRATIS y descuentos en tus mandados!
      //         </p>
      //       </div>
      //     </div>
      //   </section>
      //
      //   <section className="section section--primary--alt">
      //     <div className="container">
      //       <h3>Realiza tu primer mandado ahora y</h3>
      //       <p style={{color: '#e0d5b1', textAlign: 'center'}}>obtén $150.00 de bonificación para tus frutas y verduras.</p>
      //     </div>
      //   </section>
      //
      //   <section className="section section--primary--light">
      //     <div className="container">
      //       <h3>No sólo te hacemos el mandado al mejor precio y calidad</h3>
      //       <p style={{color: '#00a6a6', textAlign: 'center'}}>te ofrecemos tiempo para lo importante, para tí y tu familia</p>
      //     </div>
      //   </section>
      //
      //
      //   <section style={{padding: '5rem 0'}} className="section section--primary--alt bg-image bg-image-2">
      //     <div className="container text--center">
      //       <h3 style={{fontSize: '4rem'}}>Beneficios de utilizar Grontify</h3>
      //       <div className="col-5 text--left">
      //         <ul>
      //           <li>Te proporcionamos tiempo para las cosas importantes</li>
      //           <li>Realiza tu mandado en cualquier momento</li>
      //           <li>Frutas y verduras de primera, garantizado</li>
      //         </ul>
      //       </div>
      //       <div className="col-5 text--left">
      //         <ul>
      //           <li>A precios de la central de abastos</li>
      //           <li>Te urge algo, recibe en menos de 1hr</li>
      //           <li>Garantizamos entrega a tiempo</li>
      //           <li>Sin pedidos mínimos y entregas GRATIS</li>
      //         </ul>
      //       </div>
      //     </div>
      //   </section>
      //
      //   <section className="text--center">
      //     <div className="container">
      //       <h3>¿Aún sigues aquí?</h3>
      //       <Link to="/market" className="btn btn-success btn-lg">Haz tu mandado ahora!</Link>
      //     </div>
      //   </section>
      // </div>

      <div>

      <Helmet
          title="Inicio"
          meta={[
              {"name": "description", "content": "Frutas y verduras premium a domicilio."}
          ]}
      />

      <div className="news" style={{display: 'none'}}>
        <div className="newstext">Por ser día feriado oficial, este 1 de mayo no se realizarán entregas. Los pedidos programados para dicha fecha se entregarán el martes 2 de mayo de 2017</div>
      </div>
      <div className="page-wrapper">
        <div className="hero-section" data-ix="show-navbar">
          <div className="background-video w-background-video" data-autoplay="data-autoplay" data-loop="data-loop" data-poster-url="https://daks2k3a4ib2z.cloudfront.net/58cb198e4d198bcc429dae6e/58e539708991d7054c3c6f95_central fresh-poster-00001.jpg" data-video-urls="https://daks2k3a4ib2z.cloudfront.net/58cb198e4d198bcc429dae6e/58e539708991d7054c3c6f95_central fresh-transcode.webm,https://daks2k3a4ib2z.cloudfront.net/58cb198e4d198bcc429dae6e/58e539708991d7054c3c6f95_central fresh-transcode.mp4" data-wf-ignore="data-wf-ignore">
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

                  {Meteor.user() && this.props.currentUser ?
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
            <div className="title-block">
              <h1 className="heading-4">Frutas y verduras premium a domicilio</h1>
              <h2 className="heading-5">CENTRAL FRESH</h2>
              <h3 className="heading-6">Te llevamos las frutas y verduras &nbsp;más frescas de calidad premium directamente del agricultor hasta la puerta de tu casa</h3>
              <h4>Haz tu pedido antes de las 7 pm y recibe al siguiente día</h4>
              <Link className="order-now-button w-button" to="/login">HAZ TU PEDIDO AHORA!</Link>
            </div>
          </div>
        </div>
        <div className="categories-section">
          <h2 className="section-heading">Categorías principales</h2>
          <div className="categories-text">Presiona en una categoría y checa los productos que tenemos para ti</div>
          <div className="w-row">
            <div className="category-column w-col w-col-6 w-col-small-6 w-col-tiny-6">
              <Link className="link-block w-inline-block" to="/market?category=frutas">
                <img className="image-link" height="60" src="images/41d000_72704b3d048edff9bf342d198c47eb46.png" />
                <h3 className="category-header">Frutas</h3>
              </Link>
            </div>
            <div className="category-column w-col w-col-6 w-col-small-6 w-col-tiny-6">
              <Link className="link-block w-inline-block" to="/market?category=verduras">
                <img className="image-link" height="60" sizes="(max-width: 479px) 35px, 66.3125px" src="images/broccoli-1450274_640.png" srcSet="images/broccoli-1450274_640-p-500x.png 500w, images/broccoli-1450274_640.png 640w" />
                <h3 className="category-header">Verduras</h3>
              </Link>
            </div>
          </div>
        </div>
        <div className="free-shipping-section">
          <div className="free-shipping-container w-container">
            <h3 className="heading-2">ENVÍO GRATIS EN TUS PEDIDOS DE $650.00 O MÁS</h3>
            <div className="text-block">VÁLIDO EN TODOS NUESTROS PRODUCTOS EN ENTREGAS ESTÁNDAR Y PROGRAMADAS</div>
          </div>
        </div>
      </div>
      <div className="featured-products-section">
        <div className="w-container">
          <div className="row w-row">
            <div className="choose-us-col w-col w-col-6 w-col-small-small-stack"><img className="image" sizes="(max-width: 479px) 48vw, (max-width: 767px) 49vw, 345px" src="images/41d000_113ac45eb5bc7cb50aa5cf71b21c29b4.png" srcSet="images/41d000_113ac45eb5bc7cb50aa5cf71b21c29b4-p-500x418.png 500w, images/41d000_113ac45eb5bc7cb50aa5cf71b21c29b4.png 690w" width="345" />
            </div>
            <div className="column-4 w-col w-col-6 w-col-small-small-stack">
              <h3 className="section-heading">¿Por qué elegirnos?</h3>
              <ul className="w-list-unstyled">
                <li className="list-item"><img className="image-2" height="50" src="images/diamond.svg" />
                  <div className="div-block">
                    <h4 className="heading-3">Productos premium</h4>
                    <div className="text-block-2">Sólo productos de la mejor calidad. Nuestros expertos se ocupan de seleccionar los mejores productos para ti.</div>
                  </div>
                </li>
                <li className="list-item"><img height="50" src="images/lower-prices.svg" />
                  <div className="div-block">
                    <h4 className="heading-3">el mejor precio</h4>
                    <div className="text-block-2">Precio justo y calidad excepcional en todos tus productos. Tenemos el mejor precio en cada producto.</div>
                  </div>
                </li>
                <li className="list-item"><img height="50" src="images/paper-plane.svg" />
                  <div className="div-block">
                    <h4 className="heading-3">Entrega a tiempo</h4>
                    <div className="text-block-2">Hasta la puerta de tu hogar recibe producto del día y fresco. Recibe a tiempo y ocúpate de tus actividades importantes.</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="service-section">
        <div className="w-container">
          <div className="w-row">
            <div className="w-col w-col-4">
              <div className="service-card"><img height="45" src="images/giftbox.svg" />
                <h5 className="heading-7">Promociones y Regalos</h5>
                <div className="text-block-3">Recibe regalos en tus pedidos y mantente al tanto de promociones en productos seleccionados</div>
              </div>
            </div>
            <div className="w-col w-col-4">
              <div className="service-card"><img height="45" src="images/credit-card.svg" />
                <h5 className="heading-7">Pago sencillo</h5>
                <div className="text-block-3">Paga de forma segura con tu tarjeta de crédito o débito. También puedes pagar en efectivo a la entrega.</div>
              </div>
            </div>
            <div className="w-col w-col-4">
              <div className="service-card"><img height="45" src="images/exchange-1.svg" />
                <h5 className="heading-7">Cambios y devoluciones</h5>
                <div className="text-block-3">Si algún producto no es de la calidad esperada te lo cambiamos.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="discount free-shipping-section">
        <div className="free-shipping-container w-container">
          <h3 className="heading-2">RECIBE <span className="text-span">20%</span> DE DESCUENTO EN TU PRIMERA ORDEN</h3>
          <div className="text-block">MAYOR A $200.00 MXN</div>
        </div><Link className="black order-now-button w-button" to="/login">Empieza ahora!</Link>
      </div>

      </div>
    )
  }
}
