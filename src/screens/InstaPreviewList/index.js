import React, { Component } from 'react';
import { RefreshControl, StatusBar } from 'react-native';
import { Container, Content, Button, Icon, Header, Left, Body, Right, Title } from 'native-base';
import { NavigationActions } from "react-navigation";
import NoData from '../../component/noData';
import { containerStyle } from '../../utils/helper.js';
// import Ad from '../../config/ad';
import Loading from '../../component/loading.js';
import CONFIG from '../../config/config.js';
import PintestView from "../../component/pintrestView";

export default class InstaPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      images: [],
      refreshing: false
    }
    StatusBar.setBackgroundColor(CONFIG.themeColor, true);
  }

  componentWillMount() {
    this.getMediaFromTag()
  }

  getMediaFromTag() {
    let { tag } = this.props.navigation.state.params;
    fetch("https://www.instagram.com/explore/tags/" + tag + "/?__a=1&page=1", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
      .then((responseData) => {
        let onlyImage = responseData.graphql.hashtag.edge_hashtag_to_media.edges;
        onlyImage = onlyImage.filter(node => node.node.is_video === false).map(({ node: { display_url } }) => display_url)
        this.setState({ images: onlyImage, loading: false, refreshing: false })
      })
      .catch(() => {
        this.setState({ loading: false, refreshing: false })
      });
  }

  _navigate = (name, params) => {
    const navigate = NavigationActions.navigate({
      routeName: name,
      params: params
    });
    this.props.navigation.dispatch(navigate);
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.getMediaFromTag()
  }

  render() {
    const { title } = this.props.navigation.state.params;
    return (
      <Container>
        <Header style={{ backgroundColor: CONFIG.themeColor }}>
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
          <Right />
        </Header>
        {(this.state.loading) ? <Loading message={"Please wait fetching " + title + " status."} /> :
          <Content
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
            contentContainerStyle={containerStyle(this.state.images)}>
            {/* <AdMopub unitId={Ad.instaPics} /> */}
            {/* {this.state.images.length > 0 ?
              <FlatList
                contentContainerStyle={styles.list}
                data={this.state.images}
                numColumns={2}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => {
                  return (<Feed for_key="Insta" image_url={item.node.display_url} id={index} navigate={this._navigate} isUrl={true} />)
                }} /> :
              <NoData message={"No " + title + " status available."} whatsApp={true} />} */}
            {/* <AdMopub unitId={Ad.instaPics}/> */}
            {this.state.images.length > 0 ? <PintestView
              data={this.state.images}
              isUrl={true}
              navigate={this._navigate}
            /> : <NoData message={"No " + title + " status available."} whatsApp={true} />}
          </Content>}
      </Container>
    );
  }
}
