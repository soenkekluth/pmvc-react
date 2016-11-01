import React, { Component } from 'react';
import {EventNames} from '../constants/AppConstants'
import connect from '../core/view/connect';

class MainView extends Component {

  static propTypes = {
    counterGlobal: React.PropTypes.number
  };

  onClick(){
    const dispatch = this.props.dispatch;
    dispatch(EventNames.CLICK_GLOBAL_COUNT);
  }

  render() {
    const {counterGlobal} = this.props;

    return (
      <section>
        <h1>Main View</h1>

        <p>global clicked {counterGlobal}</p>
        <p>
          <button onClick={this.onClick.bind(this)}>Click me</button>
        </p>
      </section>
    );
  }
}


function mapStateToProps(state){
  return {
    counterGlobal: state.counterGlobal.count
  }
}

export default connect(mapStateToProps)(MainView);

