import React, { Component } from 'react';
import { SafeAreaView, ScrollView, ActivityIndicator, ImageBackground, Text, View , TouchableHighlight } from 'react-native';
import Video from 'react-native-video';
import { Icon } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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

import {programList} from './assets/channels/channels';
import {styles} from './assets/styles/styles';
import { ProgramList } from './components/ProgramList';

const HomeStack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen 
      name="Home" 
      component={Home}
      options= {({ navigation }) => ({
        headerShown: false,
        headerTitleAlign: 'left',
      })}
      />
      <HomeStack.Screen 
      name="TV" 
      component={TV}
      options={({ route }) => ({
        headerShown: false
      })}
      />
      <HomeStack.Screen 
      name="About" 
      component={About}
      options={({ route }) => ({
        headerShown: false
      })}
      />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}
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
              onPress={() => navigation.navigate('TV', { item: item })}  
              navigation={navigation} /></View>
            </ImageBackground>

        </View></View>

        {favoriteList.length>0 && (
          <View>
            <Text style={styles.mainTitle}>Favorites</Text>
            <ProgramList channels={favoriteList} navigation={navigation} />
          </View>
        )}

        <Text style={styles.mainTitle}>Macedonian</Text>
        <ProgramList channels={programList.makedonski} navigation={navigation} />

        <Text style={styles.mainTitle}>Serbian</Text>
        <ProgramList channels={programList.srpski} navigation={navigation} />

        <Text style={styles.mainTitle}>Croatian</Text>
        <ProgramList channels={programList.hrvatski} navigation={navigation} />

        <Text style={styles.mainTitle}>Other</Text>
        <ProgramList channels={programList.foreign} navigation={navigation} />

      </ScrollView>
      </SafeAreaView>
    );
  }
}

export class TV extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      favorite: false,
      favoriteData: []
    };
  }
  
  addToFavorites = (item) => {
    const { favorite, favoriteData } = this.state;
    let newData = [];
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

export class About extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const navigation = this.props.navigation;

    return (
      <SafeAreaView style={{ flex: 1, flexDirection: "column", justifyContent: 'space-between' }}>
        
      <View style={{ backgroundColor: '#f5f5f5', flex: 1, borderBottomRightRadius: 50, marginBottom: 20 }}>
        <View>
          <View style={{ flexWrap: 'wrap', justifyContent: 'space-between', flexDirection: 'row'}}>
            <Icon
                raised
                name="chevron-left"
                type="font-awesome"
                color="#16a085"
                onPress={() => navigation.navigate('Home')} />
            <Text style={[styles.hero, {}]}>About</Text>
          </View>
        </View>
        <ScrollView>
          <Text style={styles.mainTitle}>Policy</Text>
          <Text style={styles.bodyText}>
            We are not responsible for the content of TV broadcasts and / or logos on the site and their rights are theirs. This app was founded to collect TV channels that broadcast programs from their official locations using embedding technology. No channels are hosted on our servers and all their rights are theirs. The application is free to use for anyone located anywhere with no extra cost.
          </Text>
        </ScrollView>
        </View>
        </SafeAreaView>
    );
  }
}

export default App;
