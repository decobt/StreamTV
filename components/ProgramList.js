import { FlatList } from 'react-native-gesture-handler';
import React, { Component } from 'react';
import { ImageBackground, Text, View , TouchableHighlight } from 'react-native';

import {styles} from '../assets/styles/styles';

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