
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
// import {fetchAppointmentList} from './appointmentActions';

import VideoListComponent from './videoListComponent';

const mapStateToProps = state => ({
	videos: state.files.videos
});


const mapDispatchToProps = {
	// fetchAppointmentList
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoListComponent);