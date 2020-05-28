import React, { Component } from 'react';
import NoData from '../../component/noData';
import { NavigationActions } from "react-navigation";
import _ from 'lodash';
import WithContainer from '../../component/Container';
import { BACK_ARROW } from "../../config/icons";
import PintrestVideo from "../../component/pintrestVideo";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

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
          title={"Whats App Video Status"}
          leftClick={() => navigation && navigation.goBack()}
          leftIcon={BACK_ARROW}
          contentStyle={{ padding: 0, margin: 0, backgroundColor: "white" }}
          content={true}
        >
          {length > 0 ?
            <PintrestVideo
              data={videos.map((v) => ({ image: v, code: null }))}
              isUrl={false}
              navigate={this._navigate}
            /> : <NoData message="No video status available." />
          }
          {/* <AdMopub unitId={Ad.videoList} /> */}
        </WithContainer>
      </React.Fragment>
    );
  }
}

