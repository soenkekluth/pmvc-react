import React, { Component } from 'react';
import { EventNames } from '../constants/AppConstants';
import SubViewMediator from './SubViewMediator';
import connect from '../core/view/connect';


class SubView extends Component {

  static propTypes = {
    counterGlobal: React.PropTypes.number
  };


  constructor(props, context) {
    super(props, context);

    this.state = {
      counterLocal: 0
    };
  }

  onClickGlobal() {
    const dispatch = this.props.dispatch;
    dispatch(EventNames.CLICK_GLOBAL_COUNT);
  }

  onClickLocal() {
    const dispatch = this.props.dispatch;
    dispatch(EventNames.SUBVIEW_LOCAL_COUNT);
  }

  render() {

    return (
      <section>
        <h1>Subview</h1>
        <p>global clicked {this.props.counterGlobal}</p>
        <p>local clicked {this.state.counterLocal}</p>
        <p>
          <button onClick={this.onClickGlobal.bind(this)}>click global</button>
          <button onClick={this.onClickLocal.bind(this)}>click local</button>
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


export default connect(mapStateToProps, SubViewMediator)(SubView);
// export default connectView(SubView, mapStateToProps, SubViewMediator);

        //<p>local clicked {this.state.counterLocal}</p>
