import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link, browserHistory } from 'react-router';
import {Row, Col, Grid} from 'react-bootstrap';


let showAreaAlert = new ReactiveVar(true);

export class Home extends Component {
  componentDidMount() {
    if (showAreaAlert.get()) {
      swal({
        imageUrl: "images/logo_square.png",
        title: "Área de servicio",
        text: "Actualmente nuestro servicio se proporciona en la Ciudad de México, el municipio de Huixquilucan y Naucalpan Edo. Méx.",
        timer: 4500,
        showConfirmButton: true
      });
      showAreaAlert.set(false);
    }
  }
  render() {
    return (
      <div className="content">

        <Helmet
            title="Inicio"
            meta={[
                {"name": "description", "content": "Frutas y verduras a domicilio. De la central a tu hogar"}
            ]}
        />

        <Grid fluid="true" style={{padding: 0}}>
          <section>
            <img className="img-responsive" src="images/slider/slide1.jpg"/>
          </section>
        </Grid>

        <div className="our-features-box wow bounceInUp animated animated">
          <div className="container">
            <ul>
              <li>
                <div className="feature-box free-shipping">
                  <div className="icon-truck"></div>
                  <div className="content">Entregas GRATIS en ordenes mayores a MXN $650</div>
                </div>
              </li>
              <li>
                <div className="feature-box need-help">
                  <div className="icon-support"></div>
                  <div className="content">¿Necesitas ayuda? <br/>55-3119-0224</div>
                </div>
              </li>
              <li>
                <div className="feature-box payment-methods">
                  <div className="icon-card"></div>
                  <div className="content">Paga con tarjeta de crédito o débito</div>
                </div>
              </li>
              <li className="last">
                <div className="feature-box first-discount last">
                  <div className="icon-coupon"></div>
                  <div className="content">Recibe 20% de descuento en tu primer orden mayor a $200</div>
                </div>
              </li>
            </ul>
          </div>
        </div>



      </div>

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
    )
  }
}
