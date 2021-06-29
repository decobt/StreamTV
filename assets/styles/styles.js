import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    hero: {
      fontFamily: 'montserrat-bold',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 28,
      lineHeight: 34,
      letterSpacing: -1.5,
      padding: 16,
      color: 'black'
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    backgroundVideo: {
      height: 300,
      margin: 10,
      borderRadius: 16,
      backgroundColor: 'black'
    },
    list: {
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10
    },
    card:{
      backgroundColor: '#2f3640',
      marginRight: 10,
      padding: 16,
      minHeight: 50,
      borderRadius: 14,
    },
    logo: {
      width: 200,
      height: 150,
    },
    tinyLogo: {
      width: 200,
      height: 150
    },
    imageBG: {
      flex: 1,
      alignContent: 'center',
      justifyContent: "center",
      alignSelf: 'center',
      width: '100%',
      backgroundColor: 'white'
    },
    mainTitle: {
      fontWeight: 'bold',
      fontFamily: 'montserrat-bold',
      fontSize: 18,
      marginBottom: 10,
      marginTop: 10,
      textTransform: 'uppercase',
      padding: 15,
      color: 'black'
    },
    subTitle: {
      fontFamily: 'montserrat-regular',
      fontWeight: 'bold',
      fontSize: 16,
      color: 'white',
      marginTop: 10
    },
    shadowBox: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,  
      elevation: 5
    },
    bodyText: {
      fontFamily: 'montserrat-regular',
      fontSize: 16,
      paddingLeft: 14,
      paddingRight: 14,
      lineHeight: 28,
      marginBottom: 10
    }
  });