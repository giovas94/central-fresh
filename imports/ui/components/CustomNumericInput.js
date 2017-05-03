import React, { Component, PropTypes } from 'react';

export class CustomNumericInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: parseFloat(this.props.value) || 0
    }

  }

  increase(e) {
    e.preventDefault();

    if (this.props.value < (this.props.step === 50 ? 10000 : 20)) {
      console.log('Increase')
      this.setState({value: this.state.value + this.props.step})

      this.props.onChange(parseFloat(this.props.value) + parseFloat(this.props.step))
    }
  }

  decrease(e) {
    e.preventDefault();

    if (this.props.value > 0) {
      console.log('Decrease')
      this.setState({value: this.state.value - this.props.step})

      this.props.onChange(parseFloat(this.props.value) - parseFloat(this.props.step))
    }
  }
  render() {
    return (
      // <div className="form-wrapper w-form">
      //   <button className="button-2 w-button" onClick={this.decrease.bind(this)} disabled={this.props.value === 0}>-</button>
      //     <input className="productqty w-input"
      //       placeholder="0"
      //       readOnly min='0' type="text"
      //       value={this.props.value}
      //       />
      //   <button className="productbutton w-button" onClick={this.increase.bind(this)} disabled={this.props.value === 20}>+ Agregar</button>
      // </div>


      <div>
        <div className="productprice qty">{this.props.value}</div>
        <div className="w-clearfix">
          <a className="removebutton w-button" href="#" onClick={this.decrease.bind(this)} disabled={this.props.value === 0}>-</a>
          <a className="productbutton w-button" href="#" onClick={this.increase.bind(this)} disabled={this.props.value === (this.props.step=== 50 ? 10000 : 20)}>+</a>
        </div>
      </div>
    )
  }
}

CustomNumericInput.propTypes = {
  step: PropTypes.number,
  // onChange: PropTypes.function,
};
