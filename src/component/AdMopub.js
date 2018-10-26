import React, { Component } from 'react';
import { MoPubBanner } from 'react-native-mopub';


export default class AdMopub extends Component {
    render() {
        let {unitId} = this.props;
        return(null)
        // return (
        //     <MoPubBanner
        //         adUnitId={unitId}
        //         autoRefresh={true}
        //         onLoaded={(event)=>{console.log("load", event)}}
        //         onFailed={(event)=>{console.log("fail", event)}}
        //         onClicked={(event)=>{console.log("click", event)}}
        //     />
        // );
    }
}