import React, { Component } from 'react';
import { StyleSheet, Text, View , TouchableHighlight} from 'react-native';
import Video from 'react-native-video';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';

const HomeStack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen 
      name="Home" 
      component={Home}
      options= {({ navigation }) => ({
        title: 'StreamTV',
        headerTitleAlign: 'left',
        headerStyle: {
          backgroundColor: '#e74c3c',
          shadowColor: 'transparent',
          shadowRadius: 0,
          shadowOffset: {
              height: 0,
          },
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
      />
      <HomeStack.Screen 
      name="TV" 
      component={TV}
      options={({ route }) => ({
        title: route.params.title,
        headerStyle: {
          backgroundColor: '#e74c3c',
          shadowColor: 'transparent',
          shadowRadius: 0,
          shadowOffset: {
              height: 0,
          },
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          textTransform: 'uppercase'
        },
      })}
      />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

const programList = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    url: "https://stream.nasatv.com.mk/hls/nasatv_live.m3u8"
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    url: "https://stream.nasatv.com.mk/hls/nasatv_live.m3u8"
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    url: "https://stream.nasatv.com.mk/hls/nasatv_live.m3u8"
  },
];

export class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={{padding: 20}}>
        <Text>Makedonski</Text>
        <FlatList
          data={programList}
          horizontal={true}
          renderItem={({ item }) => (
            <TouchableHighlight
            key={item.id}
            onPress={() => navigation.navigate('TV', { url: item.url })} 
            underlayColor="white"
            style={styles.card}
            >
            <View>
              <Text>{item.title}</Text>
            </View>
            </TouchableHighlight>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

function TV() {
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    <Video
        source={{ uri: 'https://stream.nasatv.com.mk/hls/nasatv_live.m3u8' }}
        controls={true}
        resizeMode="contain"
        ref={(ref) => {
          this.player = ref
        }} 
        style={styles.backgroundVideo}
      />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  card:{
    backgroundColor: 'grey',
    marginRight: 10,
    padding: 10,
    minHeight: 50
  }
});
