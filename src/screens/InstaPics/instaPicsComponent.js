import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import WithContainer from '../../component/Container';
import { BACK_ARROW } from "../../config/icons";
import AdMopub from '../../component/AdMopub';
import Ad from '../../config/mopubAds';
import SliderEntry from "../../component/Slider";
import InstaStatus from '../../config/instaStatus';
import Loading from '../../component/loading.js';

export default class InstaPicsComponent extends Component {
  constructor(props){
    super(props);
    this.state={
      loading: true
    }
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({loading: false})
    }, 500)
  }
  render() {
    const { navigation } = this.props;
    const { data, title } = navigation.state.params
    return (
      <WithContainer
        title={title || "Share Status"}
        leftClick={() => navigation && navigation.goBack()}
        leftIcon={BACK_ARROW}
        contentStyle={{ flex: 1, padding: 0, margin: 0, backgroundColor: "white" }}
        content={true}
      >
         <View style={styles.container} >
          {
            this.state.loading ? <Loading message={`Please wait fetching ${title}`}/>:
            InstaStatus[data].map((item, index) => {
              return (
                <SliderEntry
                  cols={2}
                  key={"status" + index}
                  data={{ ...item, index }}
                  index={index}
                  onClickItem={(item) => navigation && navigation.push(item.path, { ...item })}
                />
              )
            })
          }
      </View >
        <AdMopub unitId={Ad.dailyStatus} />
      </WithContainer >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  }
});
