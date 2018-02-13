import {connect} from 'react-redux';
import * as FirstActionCreators from '../actions/FirstActions';
import FirstComponent from '../components/FirstComponent/FirstComponent'
// import axios from 'axios';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state, ownProps) => {
    return {
        content: state.firstReducer.content
    }
}
  
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        firstActions: bindActionCreators(FirstActionCreators, dispatch),
    }
}

const FirstContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(FirstComponent)

  export default FirstContainer;