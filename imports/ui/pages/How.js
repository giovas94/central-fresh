import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

export class How extends Component {

  componentDidMount() {
    var $timeline_block = $('.cd-timeline-block');

  	//hide timeline blocks which are outside the viewport
  	$timeline_block.each(function(){
  		if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
  			$(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
  		}
  	});

  	//on scolling, show/animate timeline blocks when enter the viewport
  	$(window).on('scroll', function(){
  		$timeline_block.each(function(){
  			if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
  				$(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
  			}
  		});
  	});
  }

  render() {
    return (


      <div className="page-wrapper">

        <Helmet
          title="Cómo funciona"
          meta={[
              {"name": "description", "content": "¡Descubre como funciona Central Fresh! Entrega de frutas y verduras a domicilio. Ordena frutas y verduras y recibe en 1 hora o menos."}
          ]}
        />

        <div className="catalogue hero-section" data-ix="show-navbar">
          <div className="navbar w-nav" data-animation="over-right" data-collapse="medium" data-duration="400">
            <div className="w-container">
              <Link className="w-nav-brand" to="/"><img className="logo" height="90" src="images/central-fresh-logo-white.png" />
              </Link>
              <nav className="fixednavmenu nav-menu w-nav-menu" role="navigation">
              <Link className="nav-link w-nav-link" to="/">Inicio</Link>
              {/* <Link className="nav-link w-nav-link" to="/profile">Perfil</Link>
              <Link className="nav-link w-nav-link" to="/payment">Datos de pago</Link>
              <Link className="nav-link w-nav-link" to="/address">Direcciones</Link>
              <Link className="nav-link w-nav-link" to="/orders">Pedidos</Link> */}
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
            <h1 className="catalogueheading heading-4">¿Cómo funciona Central Fresh?</h1>
          </div>
        </div>
        <div className="productssection">
          <div className="contactcontainer w-container">

          <Helmet
            title="Cómo funciona"
            meta={[
                {"name": "description", "content": "Entrega de frutas y verduras a domicilio. Ordena frutas y verduras y recibe en 1 hora o menos."}
            ]}
          />

          {/* <center><h1>¿Cómo funciona Central Fresh?</h1></center> */}

          <section id="cd-timeline" className="cd-container">
        		<div className="cd-timeline-block">
        			<div className="cd-timeline-img cd-picture">
        				<i className="fa fa-user-plus fa-lg"></i>
        			</div>

        			<div className="cd-timeline-content">
        				<h2>Regístrate</h2>
        				<p>Para comenzar a utilizar Central Fresh ingresa a <Link to="/login">login</Link>. El proceso es muy sencillo, ingresa tu nombre y apellidos, correo electónico y una contraseña. Una vez ingresado serás redireccionado al panel "Catálogo" para que puedas comenzar a realizar tus pedidos.</p><br/>
                <img src="images/login.png" width="100%" alt="Central Fresh crear cuenta"/>
        			</div>
        		</div>

        		<div className="cd-timeline-block">
        			<div className="cd-timeline-img cd-movie">
        				<i className="fa fa-apple fa-lg"></i>
        			</div>

        			<div className="cd-timeline-content">
        				<h2>"Catálogo" y buscar productos</h2>
        				<p>Después de hacer login ingresarás al Catálogo, en el podrás hacer tus pedidos, ver y editar tu perfil, datos de pago, direcciones de entrega, historial de mandados y solicitar soporte en la sección de ayuda.<br/>
                En la sección hacer el mandado, busca productos y elige la cantidad deseada.</p>
                <img src="images/catalog.png" width="100%" alt="Central Fresh mi central"/>
        			</div>
        		</div>

        		<div className="cd-timeline-block">
        			<div className="cd-timeline-img cd-picture">
        				<i className="fa fa-shopping-basket fa-lg"></i>
        			</div>

        			<div className="cd-timeline-content">
        				<h2>Checa tu canasta de productos</h2>
                <img src="images/cart.png" width="70%" alt="Central Fresh cesta"/>
        				<p>En la parte inferior derecha del catálogo de productos en la sección "Mi pedido" encontrarás la cesta de productos, presiona para abrir. Verifica los productos y cantidades seleccionadas.</p>
        			</div>
        		</div>

        		<div className="cd-timeline-block">
        			<div className="cd-timeline-img cd-location">
        				<i className="fa fa-truck fa-lg"></i>
        			</div>

        			<div className="cd-timeline-content">
        				<h2>Elige tu tipo de envío</h2>
        				<p>En la cesta de productos selecciona el tipo de envío que deseas, puede ser envío <b>Estándar</b>, recibe al siguiente día antes de las 13:00 horas; o <b>Programado</b>, selecciona la fecha de entrega de tu pedido.</p>
                <p>Si tu pedido es de más de $650, el envío Estándar o Programado es GRATIS</p>
        			</div>
        		</div>

        		<div className="cd-timeline-block">
        			<div className="cd-timeline-img cd-location">
        				<i className="fa fa-credit-card fa-lg"></i>
        			</div>

        			<div className="cd-timeline-content">
        				<h2>Agrega o Selecciona tu método de pago y dirección de entrega</h2>
        				<p>En la cesta de productos selecciona tu método de pago y dirección de entrega, si no tiene ninguna registrada te aparecerá un link para agregarla.</p>
        			</div>
        		</div>

        		<div className="cd-timeline-block">
        			<div className="cd-timeline-img cd-movie">
        				<i className="fa fa-dollar fa-lg"></i>
        			</div>

        			<div className="cd-timeline-content">
        				<h2>Verifica el total de tu pedido</h2>
        				<p>Checa el total de tu pedido y costo de envío.</p>
        			</div>
        		</div>

            <div className="cd-timeline-block">
        			<div className="cd-timeline-img cd-picture">
        				<i className="fa fa-thumbs-up fa-lg"></i>
        			</div>

        			<div className="cd-timeline-content">
        				<h2>Confirma el pedido</h2>
        				<p>Si estás satisfecho con los productos que seleccionaste, presiona en <b>"Ordenar ahora"</b> y confirma.</p>
                <p>Serás redireccionado al historial de pedidos donde podrás monitorear el estatus de tu orden, realizar cambios, confirmar la recepción, calificar el servicio y descargar tus facturas.</p>
        			</div>
        		</div>

            <div className="cd-timeline-block">
        			<div className="cd-timeline-img cd-movie">
        				<i className="fa fa-check fa-lg"></i>
        			</div>

        			<div className="cd-timeline-content">
        				<h2>Terminamos, tu pedido llegará pronto!</h2>
        				<p>Excelente haz realizado tu pedido. Tus frutas y verduras llegarán pronto.</p>
        			</div>
        		</div>
        	</section>

          </div>
        </div>
      </div>

      //
      // <div style={{paddingLeft: '5%', paddingRight: '5%'}}>
      //   <Helmet
      //     title="Cómo funciona"
      //     meta={[
      //         {"name": "description", "content": "Entrega de frutas y verduras a domicilio. Ordena frutas y verduras y recibe en 1 hora o menos."}
      //     ]}
      //   />
      //
      //   <center><h1>¿Cómo funciona Central Fresh?</h1></center>
      //
      //   <section id="cd-timeline" className="cd-container">
      // 		<div className="cd-timeline-block">
      // 			<div className="cd-timeline-img cd-picture">
      // 				<i className="fa fa-user-plus fa-lg"></i>
      // 			</div>
      //
      // 			<div className="cd-timeline-content">
      // 				<h2>Regístrate</h2>
      // 				<p>Para comenzar a utilizar Central Fresh ingresa a <Link to="/login">login</Link>. El proceso es muy sencillo, ingresa tu nombre y apellidos, correo electónico y una contraseña. Una vez ingresado serás redireccionado al panel "Mi central" para que puedas comenzar a realizar tus mandados.</p><br/>
      //         <img src="images/login.png" width="100%" alt="Central Fresh crear cuenta"/>
      // 			</div>
      // 		</div>
      //
      // 		<div className="cd-timeline-block">
      // 			<div className="cd-timeline-img cd-movie">
      // 				<i className="fa fa-apple fa-lg"></i>
      // 			</div>
      //
      // 			<div className="cd-timeline-content">
      // 				<h2>Panel "Mi Central" y buscar productos</h2>
      // 				<p>Después de hacer login ingresarás al panel 'Mi Central', en el podrás hacer tus mandados, ver y editar tu perfil, datos de pago, direcciones de entrega, historial de mandados y solicitar soporte en la sección de ayuda.<br/>
      //         En la sección hacer el mandado, busca productos y elige la cantidad deseada.</p>
      //         <img src="images/catalog.png" width="100%" alt="Central Fresh mi central"/>
      // 			</div>
      // 		</div>
      //
      // 		<div className="cd-timeline-block">
      // 			<div className="cd-timeline-img cd-picture">
      // 				<i className="fa fa-shopping-basket fa-lg"></i>
      // 			</div>
      //
      // 			<div className="cd-timeline-content">
      // 				<h2>Checa tu canasta de productos</h2>
      //         <img src="images/cart.png" width="70%" alt="Central Fresh cesta"/>
      // 				<p>En la parte inferior derecha del catálogo de productos en la sección "Hacer el mandado" encontrarás la cesta de productos, presiona para abrir. Verifica los productos y cantidades seleccionadas.</p>
      // 			</div>
      // 		</div>
      //
      // 		<div className="cd-timeline-block">
      // 			<div className="cd-timeline-img cd-location">
      // 				<i className="fa fa-truck fa-lg"></i>
      // 			</div>
      //
      // 			<div className="cd-timeline-content">
      // 				<h2>Elige tu tipo de envío</h2>
      // 				<p>En la cesta de productos selecciona el tipo de envío que deseas, puede ser envío <b>Estándar</b>, recibe al siguiente día antes de las 13:00 horas; o <b>Programado</b>, selecciona la fecha de entrega de tu pedido.</p>
      //         <p>Si tu mandado es de más de $650, el envío Estándar o Programado es GRATIS</p>
      // 			</div>
      // 		</div>
      //
      // 		<div className="cd-timeline-block">
      // 			<div className="cd-timeline-img cd-location">
      // 				<i className="fa fa-credit-card fa-lg"></i>
      // 			</div>
      //
      // 			<div className="cd-timeline-content">
      // 				<h2>Agrega o Selecciona tu método de pago y dirección de entrega</h2>
      // 				<p>En la cesta de productos selecciona tu método de pago y dirección de entrega, si no tiene ninguna registrada te aparecerá un link para agregarla.</p>
      // 			</div>
      // 		</div>
      //
      // 		<div className="cd-timeline-block">
      // 			<div className="cd-timeline-img cd-movie">
      // 				<i className="fa fa-dollar fa-lg"></i>
      // 			</div>
      //
      // 			<div className="cd-timeline-content">
      // 				<h2>Verifica el total de tu mandado</h2>
      // 				<p>Checa el total de tu mandado y costo de envío.</p>
      // 			</div>
      // 		</div>
      //
      //     <div className="cd-timeline-block">
      // 			<div className="cd-timeline-img cd-picture">
      // 				<i className="fa fa-thumbs-up fa-lg"></i>
      // 			</div>
      //
      // 			<div className="cd-timeline-content">
      // 				<h2>Confirma el mandado</h2>
      // 				<p>Si estás satisfecho con los productos que seleccionaste, presiona en <b>"Ordenar ahora"</b> y confirma el mandado.</p>
      //         <p>Serás redireccionado al historial de mandados donde podrás monitorear el estatus de tu orden, realizar cambios, confirmar la recepción, calificar el servicio y descargar tus facturas.</p>
      // 			</div>
      // 		</div>
      //
      //     <div className="cd-timeline-block">
      // 			<div className="cd-timeline-img cd-movie">
      // 				<i className="fa fa-check fa-lg"></i>
      // 			</div>
      //
      // 			<div className="cd-timeline-content">
      // 				<h2>Terminamos, tu mandado llegará pronto!</h2>
      // 				<p>Excelente haz realizado tu mandado. Tus frutas y verduras llegarán pronto.</p>
      // 			</div>
      // 		</div>
      // 	</section>
      //
      // </div>
    )
  }
}
