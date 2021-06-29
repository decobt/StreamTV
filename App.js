import React, { Component } from 'react';
import { SafeAreaView, ScrollView, ActivityIndicator, ImageBackground, StyleSheet, Text, View , TouchableHighlight, Image} from 'react-native';
import Video from 'react-native-video';
import { Icon } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';

import {programList} from './assets/channels/channels';
import {styles} from './assets/styles/styles';

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

export class ProgramList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const items = this.props.channels;
    const navigation = this.props.navigation;

    return (
      <FlatList
      data={items}
      horizontal={true}
      initialNumToRender={5} 
      renderItem={({ item }) => (
        <TouchableHighlight
        key={item.id}
        onPress={() => navigation.navigate('TV', { item: item })} 
        underlayColor="#16a085"
        style={styles.card}
        navigation={navigation}
        
        >
        <View>
          <View style={styles.logo}>
            <ImageBackground source={{ uri: item.logo }}
            resizeMode = 'contain'
            style={[ styles.imageBG, {height: 300, width: 200, borderRadius: 8 }]}></ImageBackground>
          </View>
          <Text style={styles.subTitle}>{item.title}</Text>
        </View>
        </TouchableHighlight>
      )}
      keyExtractor={(item) => item.id}
      style={styles.list}
    />
    );
  }
}

export class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const navigation = this.props.navigation;
    const item = {
      id: "us5",
      title: "AXN",
      description: "",
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
                name="bars"
                type="font-awesome"
                color="#16a085"
                style={{padding: 14, paddingTop: 22}}
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
    };
  }
  
  render() {
    const url = this.props.route.params.item.url;
    const navigation = this.props.navigation;
    const title = this.props.route.params.item.title;
    const channel = this.props.route.params.item;

    const { isLoading } = this.state;

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
        
      <View style={{ backgroundColor: '#f5f5f5', flex: 1, borderBottomRightRadius: 50, marginBottom: 20 }}>
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
        <ScrollView>
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
          {channel.description != "" && (
            <View>
            <Text style={styles.mainTitle}>Description</Text>
            <Text style={styles.bodyText}>{channel.description}</Text>
            </View>
          )}
        </ScrollView>
      </View>

      <TouchableHighlight
        onPress={() => navigation.navigate('Home')} 
        style={{ margin: 10, padding: 10, backgroundColor: '#16a085', borderRadius: 50}} 
       >
        <View style={{flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row'}}>
          <Icon
            name="plus-square"
            type="font-awesome"
            color="white" 
            style={{ padding: 8}}
            />
          <Text style={[styles.subTitle, { color: 'white'}]}>Add to favorites</Text>
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
