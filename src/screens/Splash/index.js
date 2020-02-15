
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {fetchWhatsAppFiles} from '../../reducer/actions.js';

import SplashComponent from './splashComponent';

const mapStateToProps = state => ({
	appointment: ""
});

const mapDispatchToProps = {
	fetchWhatsAppFiles
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashComponent);