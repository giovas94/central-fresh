import React from 'react';
import {Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import {CustomNumericInput} from '../CustomNumericInput';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin({
  shouldRejectClick: function (lastTouchEventTimestamp, clickEventTimestamp) {
    return true;
  }
});


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

export const Product = ({product, currentOrder, handleProduct, handleCurrentOrderSubtotal}) => (
  // <Col xs={6} sm={3} md={2} className="product-card">
  //   <div className="product-image">
  //     <img src={product.imageURL} />
  //   </div>
  //   <div className="product-info">
  //     <h5>{product.name}</h5>
  //     <h6>{accounting.formatMoney(product.currentPrice)}<br/><small>por <b>{product.unit}</b></small></h6>
  //     <NumericInput min={0} max={20} step={product.unit === 'pieza' || product.unit === 'manojo' ? 1 : .5} precision={1} mobile readOnly
  //       value={_.find(currentOrder, ['name', product.name]) ? _.find(currentOrder, ['name', product.name]).qty : 0}
  //       onChange={valueAsNumber => {handleProduct(valueAsNumber, product); handleCurrentOrderSubtotal()}}
  //       className="numericInput"
  //     />
  //   </div>
  // </Col>

  //New Product Card Design
  // <Col xs={12} sm={6} md={4} style={styles.product}>
  //   <div style={styles.spacer}>
  //     <Col xs={6} sm={5}>
  //       <img src={product.imageURL} />
  //     </Col>
  //     <Col xs={6} sm={7}>
  //       <h5>{product.name}</h5>
  //       <h6>{accounting.formatMoney(product.currentPrice)} <small>por <b>{product.unit}</b></small></h6>
  //       <p style={{fontSize: '1rem', color: '#777'}}>{product.description}</p>
  //       <NumericInput min={0} max={20} step={product.unit === 'pieza' || product.unit === 'manojo' ? 1 : .5} precision={1} mobile readOnly
  //         value={_.find(currentOrder, ['name', product.name]) ? _.find(currentOrder, ['name', product.name]).qty : 0}
  //         onChange={valueAsNumber => {handleProduct(valueAsNumber, product); handleCurrentOrderSubtotal()}}
  //         className="numericInput"
  //       />
  //     </Col>
  //   </div>
  // </Col>

            // <li className="item col-lg-4 col-md-3 col-sm-4 col-xs-6">
            //   <div className="item-inner">
            //     <div className="item-img">
            //       <div className="item-img-info"><a href="#" title={product.name} className="product-image"><img style={{height: '267px'}} src={product.imageURL} alt={product.name}/></a>
            //         <div className="item-box-hover">
            //           <div className="box-inner">
            //           </div>
            //         </div>
            //       </div>
            //     </div>
            //     <div className="item-info">
            //       <div className="info-inner">
            //         <div className="item-title"><a href="product-detail.html" title={product.name}>{product.name}</a> </div>
            //         <div className="item-description">{product.description}</div>
            //         <div className="item-content">
            //           <div className="item-price">
            //             <div className="price-box"><span className="regular-price" id="product-price-1"><span className="price">{accounting.formatMoney(product.currentPrice)}</span> <small>por <b>{product.unit}</b></small></span> </div>
            //           </div>
            //                 <NumericInput mobile={true} min={0} max={20} step={product.unit === 'domo' || product.unit === 'pieza' || product.unit === 'manojo' ? 1 : .5} precision={1} mobile
            //                   value={_.find(currentOrder, ['name', product.name]) ? _.find(currentOrder, ['name', product.name]).qty : 0}
            //                   onChange={valueAsNumber => {handleProduct(valueAsNumber, product); handleCurrentOrderSubtotal()}}
            //                   className="numericInput"
            //                 />
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // </li>

  //Central fresh product design

  <div className="w-col w-col-4 w-col-stack">
    <div className="productcard">
      <div className="row-4 w-row">
        <div className="column-8 w-col w-col-6"><img className="productimage" src={product.imageURL} width="250" />
        </div>
        <div className="column-7 w-col w-col-6">
          <h3 className="heading-9">{product.name}</h3>
          <div className="productdescription">{product.description}</div>
          <div className="productprice">{accounting.formatMoney(product.currentPrice)}</div>
          <div className="producttext">por <span className="text-span-2">{product.unit}</span>
          </div>
          <div className="inputblock">
            {/* <div className="form-wrapper w-form">
              <a className="button-2 w-button" href="#">-</a>
                <input className="productqty w-input" placeholder="0" type="number" />
              <a className="productbutton w-button" href="#">+ Agregar</a>
            </div> */}
            {/* <NumericInput mobile={true} min={0} max={20} step={product.unit === 'domo' || product.unit === 'pieza' || product.unit === 'manojo' ? 1 : .5} precision={1} readOnly
              value={_.find(currentOrder, ['name', product.name]) ? _.find(currentOrder, ['name', product.name]).qty : 0}
              onChange={valueAsNumber => {handleProduct(valueAsNumber, product); handleCurrentOrderSubtotal()}}
              className="numericInput"
            /> */}
            <CustomNumericInput
              step={product.grams ? 50 : product.unit === 'domo' || product.unit === 'pieza' || product.unit === 'manojo' ? 1 : .5}
              value={_.find(currentOrder, ['name', product.name]) ? product.grams ? _.find(currentOrder, ['name', product.name]).qty * 1000 : _.find(currentOrder, ['name', product.name]).qty : 0}
              onChange={valueAsNumber => {handleProduct(valueAsNumber, product); handleCurrentOrderSubtotal()}}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)
