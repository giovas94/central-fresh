import React from 'react';
import { Link, browserHistory } from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';

export const Footer = () => (
  // <!-- Page Footer-->
  // <footer className="footer">
  //   <div className="container">
  //     <p>
  //       <i className="fa fa-2x fa-credit-card"></i>&nbsp;
  //       <i className="fa fa-2x fa-cc-mastercard"></i>&nbsp;
  //       <i className="fa fa-2x fa-cc-visa"></i>&nbsp;
  //       <i className="fa fa-2x fa-cc-amex"></i>&nbsp;
  //     </p>
  //     <ul>
  //       <li><Link to="/contact">Contacto</Link></li>
  //       <li><Link to="/legal/terms">Términos de uso</Link></li>
  //       <li><Link to="/legal/privacy">Política de privacidad</Link></li>
  //     </ul>
  //     <p>&copy; 2017 Central Fresh™. Todos los derechos reservados.</p>
  //   </div>
  // </footer>

  // <footer>
  //   <div className="footer-inner">
  //     <div className="newsletter-row">
  //       <Grid>
  //         <Row>
  //           <Col lg={4} md={4} sm={4} xs={12}>
  //             <div className="payment-accept">
  //               <div>
  //                 <img src="images/payment-2.png" alt="payment2"/>
  //                 <img src="images/payment-3.png" alt="payment3"/>
  //                 <img src="images/payment-4.png" alt="payment4"/>
  //               </div>
  //             </div>
  //           </Col>
  //           <Col lg={8} md={8} sm={8} xs={12} className="col1">
  //             <div className="newsletter-wrap" style={{display: "none"}}>
  //               <h4>Suscribete</h4>
  //               <form action="#" method="post" id="newsletter-validate-detail1">
  //                 <div id="container_form_news">
  //                   <div id="container_form_news2">
  //                     <input type="text" name="email" id="newsletter1" title="Suscribete a nuestro boletín" className="input-text required-entry validate-email" placeholder="Introduce tu correo electrónico"/>
  //                     <button type="submit" title="Subscribe" className="button subscribe"><span>Suscribir</span></button>
  //                   </div>
  //                 </div>
  //               </form>
  //             </div>
  //           </Col>
  //         </Row>
  //       </Grid>
  //     </div>
  //
  //     <Grid>
  //       <Row>
  //         <Col lg={4} sm={4} xs={12}>
  //           <div className="co-info">
  //             <div>
  //               <Link to="/home"><img  style={{maxWidth: 200}} src="images/logo_square.png" alt="footer logo"/></Link>
  //             </div>
  //             <address>
  //               <div><em className="icon-location-arrow"></em> <span> Paseo de la Reforma No. 296 Piso 42 Col. Juárez Del. Cuauhtémoc CP. 06600 <br/>Ciudad de México, México </span></div>
  //               <div> <em className="icon-mobile-phone"></em><span> 55-3119-0224</span></div>
  //               <div> <em className="icon-envelope"></em><span>contacto@grontify.com</span></div>
  //             </address>
  //             <div className="social">
  //               <ul className="link">
  //                 <li className="fb pull-left"><a target="_blank" rel="nofollow" href="https://www.facebook.com/CentralFresh/" title="Facebook"></a></li>
  //                 <li className="instagram pull-left"><a target="_blank" rel="nofollow" href="https://www.instagram.com/centralfresh/" title="Instagram"></a></li>
  //               </ul>
  //             </div>
  //           </div>
  //         </Col>
  //
  //         <Col lg={8} sm={8} xs={12}>
  //           <div className="footer-column">
  //             <h4>Información</h4>
  //             <ul className="links">
  //               <li className="first"><Link to="/how-works">¿Cómo funciona?</Link></li>
  //               <li><Link to="/contact">Contacto</Link></li>
  //               <li className="last"><Link href="/legal/terms">Términos y condiciones</Link></li>
  //             </ul>
  //           </div>
  //
  //           <div className="footer-column">
  //             <h4>Mapa de sitio</h4>
  //             <ul className="links">
  //               <li className="first"><a title="Mapa de sitio" href="#">Mapa de sitio</a></li>
  //               <li><a title="Futas y verduras orgánicas" href="#">Frutas y verduras orgánicas</a></li>
  //               <li><a title="Futas y verduras no orgánicas" href="#">Frutas y verduras orgánicas</a></li>
  //               <li><a title="Productos orgánicos" href="#">Productos orgánicos</a></li>
  //             </ul>
  //           </div>
  //         </Col>
  //       </Row>
  //     </Grid>
  //   </div>
  //
  //   <div className="footer-bottom">
  //     <Grid>
  //       <Row>
  //         <Col sm={12} xs={12} className="coppyright">Central Fresh™ 2017</Col>
  //       </Row>
  //     </Grid>
  //   </div>
  // </footer>

  <div className="footer">
    <div className="div-block-2">
      <div className="w-container">
        <div className="row-2 w-row">
          <div className="footer-column w-col w-col-3 w-col-small-small-stack">
            <div>
              <h3 className="footer-contact-heading">Contacto</h3>
              <p className="footer-text">Llámanos, escríbenos o visítanos, estamos para servirte.</p>
              <ul className="w-list-unstyled">
                <li>
                  <div className="list-item-text"><span className="list-item-icon">Dirección</span>&nbsp;Nave I Bodega B-003, Mercado de Aves y Cárnicos, Central de Abasto, Ciudad de México, México.</div>
                  <div className="list-item-text"><span className="list-item-icon">Whatsapp</span>&nbsp;<a href="tel:+5215531190224">55 3119 0224</a></div>
                  <div className="list-item-text"><span className="list-item-icon">Email</span>&nbsp;<a href="mailto:contacto@grontify.com">contacto@grontify.com</a></div>
                </li>
              </ul>
            </div>
            <a className="w-inline-block" href="https://www.facebook.com/CentralFresh/" target="_blank"><img className="image-6" src="images/facebook.svg" width="30" />
            </a>
            <a className="w-inline-block" href="https://www.instagram.com/centralfresh/" target="_blank"><img src="images/instagram.svg" width="30" />
            </a>
          </div>
          <div className="footer-column w-col w-col-3 w-col-small-small-stack">
            <div>
              <h3 className="footer-contact-heading">Información</h3>
              <ul className="w-list-unstyled">
                <li>
                  <div className="list-item-text"><Link className="link-text" to="/market">CATÁLOGO DE PRODUCTOS</Link>
                  </div>
                  <div className="list-item-text"><Link className="link-text" to="/how-works">CÓMO FUNCIONA</Link>
                  </div>
                  <div className="list-item-text"><a className="link-text" href="#">SERVICIO A RESTAURANTES Y HOSPITALES</a>
                  </div>
                  <div className="list-item-text"><Link className="link-text" to="/help">AYUDA</Link>
                  </div>
                  <div className="list-item-text"><Link className="link-text" to="/legal/terms">TÉRMINOS Y CONDICIONES</Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-column w-col w-col-3 w-col-small-small-stack">
            <div>
              <h3 className="footer-contact-heading">Categorías</h3>
              <ul className="w-list-unstyled">
                <li>
                  <div className="list-item-text"><Link className="link-text" to="/market?category=frutas">FRUTAS</Link>
                    <div className="list-item-text"><Link className="link-text" to="/market?category=verduras">VERDURAS</Link>
                    </div>
                    <div className="list-item-text"><Link className="link-text" to="/market?category=otros">OTROS</Link>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-column w-col w-col-3 w-col-small-small-stack">
            <div>
              <h3 className="footer-contact-heading">Tu cuenta</h3>
              <ul className="w-list-unstyled">
                <li>
                  <div className="list-item-text"><Link className="link-text" to="/profile">MI PERFIL</Link>
                  </div>
                  <div className="list-item-text"><Link className="link-text" to="/payment">DATOS DE PAGO</Link>
                  </div>
                  <div className="list-item-text"><Link className="link-text" to="/address">DIRECCIONES DE ENTREGA</Link>
                  </div>
                  <div className="list-item-text"><Link className="link-text" to="/orders">HISTORIAL DE PEDIDOS</Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="div-block-3 w-clearfix">
      <div className="copy">Central Fresh™ 2017</div>
      <div className="payments-block"><img className="image-3" src="images/visa.svg" width="50" /><img className="image-4" src="images/mastercard.svg" width="50" /><img className="image-5" src="images/amex.svg" width="50" />
      </div>
    </div>
  </div>
)
