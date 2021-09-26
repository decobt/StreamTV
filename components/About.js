import React, { Component } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'

import {styles} from '../assets/styles/styles';

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