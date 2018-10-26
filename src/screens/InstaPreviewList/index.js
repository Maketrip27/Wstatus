import React, {Component} from 'react';
import {StyleSheet, Dimensions, RefreshControl, StatusBar} from 'react-native';
import {Feed} from '../../component/feed.js';
import { Container, Content,Button,Icon,Header, Left, Body, Right,Title } from 'native-base';
import { NavigationActions } from "react-navigation";
import NoData from '../../component/noData';
import { containerStyle} from '../../utils/helper.js';
// import Ad from '../../config/ad';
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import Loading from '../../component/loading.js';
import CONFIG from '../../config/config.js';
import AdMopub from '../../component/AdMopub';
import Ad from '../../config/mopubAds';
const {height, width} = Dimensions.get('window');

export default class ImageListComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      images: [],
      refreshing: false
    }
    StatusBar.setBackgroundColor(CONFIG.themeColor, true);
  }
  
  componentWillMount(){
    this.getMediaFromTag()
  }

  getMediaFromTag(){
    let {tag} = this.props.navigation.state.params;
    fetch("https://www.instagram.com/explore/tags/"+tag+"/?__a=1&page=1", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
        }).then((response) => response.json())
        .then((responseData) =>
        {
            let onlyImage = responseData.graphql.hashtag.edge_hashtag_to_media.edges;
            onlyImage = onlyImage.filter(node=> node.node.is_video === false)
            this.setState({images: onlyImage, loading:false, refreshing: false })
        })
        .catch(()=> {
            this.setState({loading:false,refreshing: false })
        });
  }
  componentDidMount() {
  }
  
  componentWillUnmount() {
  }
  
  _navigate = (name, params) => {
    const navigate = NavigationActions.navigate({
      routeName: name,
      params: params
    });
    this.props.navigation.dispatch(navigate);
  }
  _onRefresh() {
    this.setState({refreshing: true});
    this.getMediaFromTag()
  }

  render() {
      const {title} = this.props.navigation.state.params;
    return (
      <Container>
          <Header style={{ backgroundColor: CONFIG.themeColor}}> 
            <Left>
                <Button 
                    transparent 
                    onPress={() => {
                      this.props.navigation.goBack();
                    }}
                >
                <Icon name='arrow-back' />
                </Button>
            </Left>
            <Body>
                <Title>{title}</Title>
            </Body>
            <Right/>
          </Header>
        {(this.state.loading)? <Loading message={"Please wait fetching "+ title + " status."}/> :
            <Content 
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }
              contentContainerStyle = {containerStyle(this.state.images)}>
              <AdMopub unitId={Ad.instaPics}/>
            {this.state.images.length > 0 ?
            <OptimizedFlatList
                contentContainerStyle={styles.list}
                data={this.state.images}
                numColumns={3}
                keyExtractor={(item, index) => item.id}
                renderItem={({item,index}) => {
                    return  (<Feed for_key="Insta" image_url={item.node.display_url} id={index} navigate={this._navigate} isUrl={true}/>)
            }}/> :
            <NoData message={"No "+ title + " status available."} whatsApp={true}/>}
            <AdMopub unitId={Ad.instaPics}/>
        </Content>}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    margin: 2
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
