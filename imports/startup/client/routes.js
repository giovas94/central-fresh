import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReactGA from 'react-ga';

import App from '../../ui/layouts/App.js';
import Alert from 'react-s-alert';
// import Market from '../../ui/layouts/Market.js';

// import { Home } from '../../ui/pages/Home.js';
import { NotFound } from '../../ui/pages/NotFound.js';
import { How } from '../../ui/pages/How.js';
import { ContactUs } from '../../ui/pages/ContactUs.js';
import { ServiceArea } from '../../ui/pages/ServiceArea.js';
import { Wholesale } from '../../ui/pages/Wholesale.js';
import { Login } from '../../ui/pages/Login.js';
import { Signup } from '../../ui/pages/Signup.js';
import { RecoverPassword } from '../../ui/pages/RecoverPassword.js';
import { ResetPassword } from '../../ui/pages/ResetPassword.js';
import { VerifyEmail } from '../../ui/pages/VerifyEmail.js';
import { Terms } from '../../ui/pages/Legal/Terms.js';
import { Privacy } from '../../ui/pages/Legal/Privacy.js';

import HomeContainer from '../../ui/containers/HomeContainer.js';
import MarketContainer from '../../ui/containers/MarketContainer.js';
import CatalogueContainer from '../../ui/containers/CatalogueContainer.js';
import ProfileContainer from '../../ui/containers/ProfileContainer.js';
import AddressesContainer from '../../ui/containers/AddressesContainer.js';
import AddressDetailContainer from '../../ui/containers/AddressDetailContainer.js';
import OrdersContainer from '../../ui/containers/OrdersContainer.js';
import OrderDetailContainer from '../../ui/containers/OrderDetailContainer.js';

import { Payment } from '../../ui/pages/Central/Payment.js';
import { Help } from '../../ui/pages/Central/Help.js';
import { Address } from '../../ui/pages/Central/Address.js';

import { AddressForm } from '../../ui/components/Market/Addresses/AddressForm.js';


import './webflow';

function initiateWebflow() {
  setTimeout(function(){ $(Webflow.ready()) }, 500);
}

function reInitiateWebflow() {
  $(Webflow.destroy());
}

ReactGA.initialize('UA-89652373-1');

const fireTracking = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    Alert.warning(`Inicia sesión para ver está página.`, {
      position: 'top-right',
      effect: 'slide',
      timeout: 3500,
      offset: 100,
      html: true,
    });
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const redirectIfLoggedIn = (nextState, replace, next) => {
  if (Meteor.userId()) {
    replace('/market');
  }

  next();
};


const onEnterLogin = (nextState, replace, next) => {
  initiateWebflow();
  redirectIfLoggedIn(nextState, replace, next);
}

const onEnterWithRequiedAuth = (nextState, replace) => {
  initiateWebflow();
  requireAuth(nextState, replace);
}


export const renderRoutes = () => (
  <Router onUpdate={fireTracking} history={browserHistory}>
    <Route name="verify-email" path="/verify-email/:token" component={ VerifyEmail } />
    <Route path="/" component={App} onEnter={initiateWebflow} onLeave={reInitiateWebflow}
    onChange={(prevState, nextState) => {
      if (nextState.location.action !== "POP") {
        window.scrollTo(0, 0);
      }
    }}>
      <IndexRoute name="home" component={HomeContainer} onEnter={initiateWebflow} onLeave={reInitiateWebflow} />
      <Route name="login" path="login" component={Login} onEnter={onEnterLogin} onLeave={reInitiateWebflow} />
      <Route name="register" path="register" component={Signup} onEnter={onEnterLogin} onLeave={reInitiateWebflow} />
      <Route name="recover-password" path="recover-password" component={RecoverPassword} onEnter={onEnterLogin} onLeave={reInitiateWebflow} />
      <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } onEnter={initiateWebflow} onLeave={reInitiateWebflow} />
      <Route name="how" path="how-works" component={How} onEnter={initiateWebflow} onLeave={reInitiateWebflow} />
      <Route name="contact" path="contact" component={ContactUs} onEnter={initiateWebflow} onLeave={reInitiateWebflow} />
      <Route name="service-area" path="service-area" component={ServiceArea} onEnter={initiateWebflow} onLeave={reInitiateWebflow} />
      <Route name="servicios-especiales" path="servicios-especiales" component={Wholesale} onEnter={initiateWebflow} onLeave={reInitiateWebflow} />
      <Route name="market" path="market" component={MarketContainer} >
        <IndexRoute name="catalogue" component={CatalogueContainer} onEnter={initiateWebflow} onLeave={reInitiateWebflow} />
        <Route name="profile" path="/profile" component={ProfileContainer} onEnter={onEnterWithRequiedAuth} onLeave={reInitiateWebflow} />
        <Route name="payment" path="/payment" component={Payment} onEnter={onEnterWithRequiedAuth} onLeave={reInitiateWebflow} />
        <Route name="address" path="/address" component={AddressesContainer} onEnter={onEnterWithRequiedAuth} onLeave={reInitiateWebflow} />
        <Route name="newAddress" path="/address-new" component={AddressForm} onEnter={onEnterWithRequiedAuth} onLeave={reInitiateWebflow} />
        <Route name="editAddress" path="/address/:id" component={AddressDetailContainer} onEnter={onEnterWithRequiedAuth} onLeave={reInitiateWebflow} />
        <Route name="orders" path="/orders" component={OrdersContainer} onEnter={onEnterWithRequiedAuth} onLeave={reInitiateWebflow} />
        <Route name="order" path="/order/:_id" component={OrderDetailContainer} onEnter={onEnterWithRequiedAuth} onLeave={reInitiateWebflow} />
        <Route name="help" path="/help" component={Help} onEnter={onEnterWithRequiedAuth} onLeave={reInitiateWebflow} />
      </Route>
      <Route name="terms" path="/legal/terms" component={Terms} onEnter={initiateWebflow} onLeave={reInitiateWebflow} />
      <Route name="privacy" path="/legal/privacy" component={Privacy} onEnter={initiateWebflow} onLeave={reInitiateWebflow} />
    </Route>
    <Route path="*" component={NotFound} onEnter={initiateWebflow} onLeave={reInitiateWebflow} />
  </Router>
)
