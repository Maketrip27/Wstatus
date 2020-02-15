
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {fetchWhatsAppFiles} from '../../reducer/actions.js';

import PriviewComponent from './priviewComponent';

const mapStateToProps = state => ({});

const mapDispatchToProps = {
	fetchWhatsAppFiles
};

export default connect(mapStateToProps, mapDispatchToProps)(PriviewComponent);