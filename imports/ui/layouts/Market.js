import React from 'react';
import Helmet from 'react-helmet';
import { CustomerMenu } from '../components/CustomerMenu';

export class Market extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentOrder: JSON.parse(localStorage.getItem(`currentOrder-${Meteor.userId()}`)) || [],
    }
  }

  render() {
    return (
      <div style={{paddingLeft: '5%', paddingRight: '5%'}}>
        <Helmet
            title="Mi Central"
            meta={[
                {"name": "description", "content": "Pide ahora tus frutas y verduras a domicilio. De la central a tu hogar."}
            ]}
        />

        {/* <CustomerMenu /> */}
        <h1>Mi central</h1>
        {this.props.children && React.cloneElement(this.props.children, { currentOrder: this.state.currentOrder})}
      </div>
    )
  }
}
