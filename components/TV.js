import React, { Component } from 'react';
import { SafeAreaView, ScrollView, ActivityIndicator, Text, View , TouchableHighlight } from 'react-native';
import Video from 'react-native-video';
import { Icon } from 'react-native-elements'

import {styles} from '../assets/styles/styles';

export class TV extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isLoading: false,
        favorite: false,
        favoriteData: []
      };

      this.storage = props.route.params.storage;
    }
    
    addToFavorites = (item) => {
      const { favorite, favoriteData } = this.state;
      let newData = [];
      const storage = this.storage;

      if(favorite == false){
        newData = favoriteData.concat([item.id]);
        storage.save({
          key: 'favorites',
          data: newData
        });
        this.setState({ favorite: true, favoriteData: newData });
      }else{
        newData = favoriteData.filter(function(i) {
          return i !== item.id
        });
        storage.save({
          key: 'favorites',
          data: newData
        });
        this.setState({ favorite: false, favoriteData: newData });
      }
    }
  
    componentDidMount = () => {
      const storage = this.storage;
      storage.load({
        key: 'favorites',
      })
      .then(ret => {
        if(ret.includes(this.props.route.params.item.id)){
          this.setState({ favorite: true });
        }
        this.setState({ favoriteData: ret });
      })
      .catch(err => {
        // any exception including data not found
        //TODO
      });
    }
    
    render() {
      const url = this.props.route.params.item.url;
      const navigation = this.props.navigation;
      const title = this.props.route.params.item.title;
      const channel = this.props.route.params.item;
  
      const { isLoading, favorite } = this.state;
  
      const onVideoError = () => {
        this.setState({ isLoading: false });
        navigation.navigate('Home');
      }
  
      const onLoadStart = () => {
        this.setState({ isLoading: true });
      }
  
      const onReadyVideo = () => {
        this.setState({ isLoading: false });
      }
  
      return (
        <SafeAreaView style={{ flex: 1, flexDirection: "column", justifyContent: 'space-between' }}>
          
        <View style={{ flex: 1, borderBottomRightRadius: 50, marginBottom: 20 }}>
          <View>
            <View style={{ flexWrap: 'wrap', justifyContent: 'space-between', flexDirection: 'row'}}>
              <Icon
                  raised
                  name="chevron-left"
                  type="font-awesome"
                  color="#16a085"
                  onPress={() => navigation.navigate('Home')} />
              <Text style={[styles.hero, {}]}>{title}</Text>
            </View>
          </View>
  
          <View style={{position: 'relative'}}>
            {isLoading && (
              <ActivityIndicator size="large" color="white" style={{ position: 'absolute', top: '46%', left: '46%', zIndex: 200}} />
            )}
          
            <Video
              source={{ uri: url }}
              controls={true}
              resizeMode="contain"
              ref={(ref) => {
                this.player = ref
              }} 
              onLoadStart = {onLoadStart}
              onReadyForDisplay = {onReadyVideo}
              onError={onVideoError} 
              style={styles.backgroundVideo}
              playWhenInactive={false}
            />
          </View>
          <ScrollView>
            {channel.description != "" && (
              <View>
              <Text style={styles.mainTitle}>Description</Text>
              <Text style={styles.bodyText}>{channel.description}</Text>
              </View>
            )}
          </ScrollView>
        </View>
  
        <TouchableHighlight
          onPress={() => this.addToFavorites(channel)} 
          style={{ margin: 10, padding: 10, position: 'absolute', bottom: 10, right: 10, backgroundColor: '#16a085', borderRadius: 50 }} 
         >
          <View>
            {!favorite && (
              <View style={{flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row'}}>
                <Icon
                name="heart"
                type="font-awesome"
                color="white" 
                style={{ padding: 8}}
                />
              </View> 
            )}
            {favorite && (
              <View style={{flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row'}}>
                <Icon
                name="heart"
                type="font-awesome"
                color="red" 
                style={{ padding: 8}}
                />
              </View>
            )}
  </View>
         </TouchableHighlight>
  
         </SafeAreaView>
      );
    }
  }