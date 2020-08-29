
import { connect } from 'react-redux'
import {fetchWhatsAppFiles} from '../../reducer/actions.js';

import ImageListComponent from './imageListComponent';

const mapStateToProps = state => ({
	images: state.files.images
});

const mapDispatchToProps = {
	fetchWhatsAppFiles
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageListComponent);
