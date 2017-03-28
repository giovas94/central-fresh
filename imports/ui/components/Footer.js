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

  <footer>
    <div className="footer-inner">
      <div className="newsletter-row">
        <Grid>
          <Row>
            <Col lg={4} md={4} sm={4} xs={12}>
              <div className="payment-accept">
                <div>
                  <img src="images/payment-2.png" alt="payment2"/>
                  <img src="images/payment-3.png" alt="payment3"/>
                  <img src="images/payment-4.png" alt="payment4"/>
                </div>
              </div>
            </Col>
            <Col lg={8} md={8} sm={8} xs={12} className="col1">
              <div className="newsletter-wrap">
                <h4>Suscribete</h4>
                <form action="#" method="post" id="newsletter-validate-detail1">
                  <div id="container_form_news">
                    <div id="container_form_news2">
                      <input type="text" name="email" id="newsletter1" title="Suscribete a nuestro boletín" className="input-text required-entry validate-email" placeholder="Introduce tu correo electrónico"/>
                      <button type="submit" title="Subscribe" className="button subscribe"><span>Suscribir</span></button>
                    </div>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>

      <Grid>
        <Row>
          <Col lg={4} sm={4} xs={12}>
            <div className="co-info">
              <div>
                <Link to="/home"><img  style={{maxWidth: 200}} src="images/logo_square.png" alt="footer logo"/></Link>
              </div>
              <address>
                <div><em className="icon-location-arrow"></em> <span> Paseo de la Reforma No. 296 Piso 42 Col. Juárez Del. Cuauhtémoc CP. 06600 <br/>Ciudad de México, México </span></div>
                <div> <em className="icon-mobile-phone"></em><span> 55-3119-0224</span></div>
                <div> <em className="icon-envelope"></em><span>contacto@centralfresh.com</span></div>
              </address>
              <div className="social">
                <ul className="link">
                  <li className="fb pull-left"><a target="_blank" rel="nofollow" href="https://www.facebook.com/CentralFresh/" title="Facebook"></a></li>
                  <li className="instagram pull-left"><a target="_blank" rel="nofollow" href="https://www.instagram.com/centralfresh/" title="Instagram"></a></li>
                </ul>
              </div>
            </div>
          </Col>

          <Col lg={8} sm={8} xs={12}>
            <div className="footer-column">
              <h4>Información</h4>
              <ul className="links">
                <li className="first"><Link to="/how-works">¿Cómo funciona?</Link></li>
                <li><Link to="/contact">Contacto</Link></li>
                <li className="last"><a title="Return policy" href="#">Términos y condiciones</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Mapa de sitio</h4>
              <ul className="links">
                <li className="first"><a title="Mapa de sitio" href="#">Mapa de sitio</a></li>
                <li><a title="Futas y verduras orgánicas" href="#">Frutas y verduras orgánicas</a></li>
                <li><a title="Futas y verduras no orgánicas" href="#">Frutas y verduras orgánicas</a></li>
                <li><a title="Productos orgánicos" href="#">Productos orgánicos</a></li>
              </ul>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>

    <div className="footer-bottom">
      <Grid>
        <Row>
          <Col sm={12} xs={12} className="coppyright">Central Fresh™ 2017</Col>
        </Row>
      </Grid>
    </div>
  </footer>
)
