
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import AppIntroComponent from './appIntroComponent';

const mapStateToProps = state => ({
	visible: ""
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(AppIntroComponent);