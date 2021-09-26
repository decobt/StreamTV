import React, { Component } from 'react';
import { SafeAreaView, ScrollView, ImageBackground, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'

import {programList} from './../assets/channels/channels';
import {styles} from '../assets/styles/styles';
import { ProgramList } from '../components/ProgramList';

import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import AsyncStorage from '@react-native-community/async-storage';

const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,
  storageBackend: AsyncStorage, 
  defaultExpires: null,
  enableCache: true,
});

export class Home extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        favoriteData: [],
        favoriteList: []
      };
    }
  
    handleFetchFavorites = () => {
      const { favoriteList } = this.state;
      let newList = [];
      storage.load({
        key: 'favorites',
      })
      .then(ret => {
        this.setState({ favoriteData: ret });
  
        programList.makedonski.forEach((item, index) =>{
          if(ret.includes(item.id)){
            newList.push(item);
          }
        });
        programList.srpski.forEach((item, index) =>{
          if(ret.includes(item.id)){
            newList.push(item);
          }
        });
        programList.hrvatski.forEach((item, index) =>{
          if(ret.includes(item.id)){
            newList.push(item);
          }
        });
        programList.foreign.forEach((item, index) =>{
          if(ret.includes(item.id)){
            newList.push(item);
          }
        });
        this.setState({ favoriteList: newList });
      })
      .catch(err => {
        // any exception including data not found
        //TODO
      });
    }
  
    componentDidMount = () => {
      this.props.navigation.addListener(
        'focus',
        () => {
          this.handleFetchFavorites();
        }
      );
    }
  
    render() {
      const navigation = this.props.navigation;
      const { favoriteList } = this.state;
  
      const item = {
        id: "us5",
        title: "AXN",
        description: "AXN is a pay television channel owned by Sony Pictures Television, which was first launched on June 22, 1997. Local versions have since been launched in several parts of the world, including Europe, Japan, Asia, and Latin America. Funded through advertising and subscription fees, AXN primarily airs action genre and reality programming.",
        url: "https://www.livedoomovie.com/02_AXNHD_720p/chunklist.m3u8",
        logo: "http://static.epg.best/id/AXN.id.png"
      };
  
      return (
        <SafeAreaView>
        <ScrollView>
        <View>
            <View style={{ flexWrap: 'wrap', justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={[styles.hero, {}]}>What to watch next?</Text>
              <Icon
                  raised
                  name="bars"
                  type="font-awesome"
                  color="#16a085"
                  onPress={() => navigation.navigate('About')} />
            </View>
          </View>
  
          <View style={styles.shadowBox}>
          <View style={{ height: 240, margin: 12, padding: 0, overflow: 'hidden', borderRadius: 14 }}>
  
            <ImageBackground source={{ uri: 'https://i.gadgets360cdn.com/large/axn_india_1590998944479.jpeg' }}
              resizeMode = 'cover'
              style={{ height: 300, width: '100%', position: 'relative' }}>
                <View style={{position: 'absolute', bottom: 0, height: 130, width: 70, right: 0, zIndex: 200 }}>
                <Icon
                raised
                name='play-circle'
                type='font-awesome'
                color='#16a085'
                onPress={() => navigation.navigate('TV', { item: item, storage: storage })}  
                navigation={navigation} /></View>
              </ImageBackground>
  
          </View></View>
  
          {favoriteList.length>0 && (
            <View>
              <Text style={styles.mainTitle}>Favorites</Text>
              <ProgramList channels={favoriteList} storage={storage} navigation={navigation} />
            </View>
          )}
  
          <Text style={styles.mainTitle}>Macedonian</Text>
          <ProgramList channels={programList.makedonski} storage={storage} navigation={navigation} />
  
          <Text style={styles.mainTitle}>Serbian</Text>
          <ProgramList channels={programList.srpski} storage={storage} navigation={navigation} />
  
          <Text style={styles.mainTitle}>Croatian</Text>
          <ProgramList channels={programList.hrvatski} storage={storage} navigation={navigation} />
  
          <Text style={styles.mainTitle}>Other</Text>
          <ProgramList channels={programList.foreign} storage={storage} navigation={navigation} />
  
        </ScrollView>
        </SafeAreaView>
      );
    }
  }