import React, {Component} from 'react';
import {StyleSheet, Text,FlatList,AppState,Dimensions,TouchableOpacity} from 'react-native';
import {Feed} from '../../component/feed.js';
import { Container, Content,  Body,Left,Right,Header,Title,Button,Icon } from 'native-base';
import { NavigationActions } from "react-navigation";
import NoData from '../../component/noData';
import { containerStyle } from '../../utils/helper.js';
const {height, width} = Dimensions.get('window');

export default class ImageListComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      isActionButtonVisible: true
    }
  }
  componentWillMount(){
    console.log(this.props.images)
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
    console.log('App has come to the foreground!',nextAppState)
    this.props.fetchWhatsAppFiles()
  }
  _navigate = (name) => {
    const navigate = NavigationActions.navigate({
      routeName: name,
      params: {}
    });
    this.props.navigation.dispatch(navigate);
  }
  _onScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y
    const direction = (currentOffset > 0 && currentOffset > this._listViewOffset)
      ? 'down'
      : 'up'
    const isActionButtonVisible = direction === 'up'
    if (isActionButtonVisible !== this.state.isActionButtonVisible) {
      this.setState({ isActionButtonVisible })
    }
    this._listViewOffset = currentOffset
  }
  render() {
    return (
      <Container>
        {(this.state.isActionButtonVisible && this.props.images.length > 0) ? <Button style={styles.floatButton} onPress = {()=>this._navigate("Priview")}>
          <Icon name='ios-expand' style={{fontSize:20,fontWeight:'bold'}}/>
          <Text style={{right:8,color:"#fff",fontWeight:'bold'}}>Full Screen</Text>
        </Button> : null}
        <Content 
          onScroll={this._onScroll}
          contentContainerStyle = {containerStyle(this.props.images)}>
        {this.props.images.length > 0 ?
          <FlatList
              contentContainerStyle={styles.list}
              data={this.props.images}
              keyExtractor={(item, index) => item.id}
              renderItem={(item) => {
                return  (<Feed image_url={item.item}/>)
          }}/> :
          <NoData message="No status available."/>}
       </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
   list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  floatButton:{
    width: 120,
    height: 30,
    justifyContent: 'center',   
    backgroundColor: 'rgba(1, 119, 106,0.8)',                                    
    position: 'absolute',                                          
    bottom: 10,                                                    
    right: (width/2)-60,
    borderRadius: 30,
    zIndex: 1
  }
});
