import React, { Component } from 'react';
import NoData from '../../component/noData';
import { NavigationActions } from "react-navigation";
import _ from 'lodash';
import WithContainer from '../../component/Container';
import { BACK_ARROW } from "../../config/icons";
import { FlatList } from 'react-native';
import { VideoFeed } from '../../component/videoFeed.js';

// import AdMopub from '../../component/AdMopub';
// import Ad from '../../config/mopubAds';
// import PintrestVideo from "../../component/pintrestVideo";

export default class App extends Component {
  _navigate = (name, params = {}) => {
    const navigate = NavigationActions.navigate({
      routeName: name,
      params: params
    });
    this.props.navigation.dispatch(navigate);
  }

  render() {
    let length = this.props.videos.length;
    const { navigation, videos } = this.props;
    return (
      <React.Fragment>
        <WithContainer
          title={"Video Status"}
          leftClick={() => navigation && navigation.goBack()}
          leftIcon={BACK_ARROW}
          contentStyle={{ padding: 0, margin: 0, backgroundColor: "white" }}
          content={true}
        >
          {length > 0 ?
            <FlatList
              numColumns={2}
              data={this.props.videos}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => {
                return (<VideoFeed video_url={item} id={index} navigate={this._navigate} isUrl={false} />)
              }} /> :
            <NoData message="No video status available." />}
          {/* {length > 0 ?
            <PintrestVideo
              data={videos.map((v) => ({ image: v, code: null }))}
              isUrl={false}
              navigate={this._navigate}
            /> : <NoData message="No video status available." />
          } */}
          {/* <AdMopub unitId={Ad.videoList} /> */}
        </WithContainer>
      </React.Fragment>
    );
  }
}
