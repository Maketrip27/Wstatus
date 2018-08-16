
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
// import {fetchAppointmentList} from './appointmentActions';

import AppIntroComponent from './appIntroComponent';

const mapStateToProps = state => ({
	visible: ""
});

const mapDispatchToProps = {
	// fetchAppointmentList
};

export default connect(mapStateToProps, mapDispatchToProps)(AppIntroComponent);