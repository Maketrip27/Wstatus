
import { connect } from 'react-redux'
import {fetchWhatsAppFiles} from '../../reducer/actions.js';

import InstaPicsComponent from "./instaPicsComponent";

const mapStateToProps = state => ({
	images: state.files.images
});

const mapDispatchToProps = {
	fetchWhatsAppFiles
};

export default connect(mapStateToProps, mapDispatchToProps)(InstaPicsComponent);