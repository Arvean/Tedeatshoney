import React from 'react';
import {Component} from 'react';
import {ImageBackground, StyleSheet, Image, View} from 'react-native';

export default class WelcomeScreen extends Component {
  render() {
    const styles = StyleSheet.create({
      background: {
        flex: 1,
        alignItems: 'center',
      },
      logo: {
        width: 500,
        height: 200,
        top: 50,
      },
      bear: {
        width: 200,
        height: 200,
        top: 500,
      },
    });
    return (
      <ImageBackground source={require('../Images/Background.jpg')}>
        <Image
          style={styles.logo}
          source={require('../Images/Tedlogo.png')}
          style={styles.bear}
          source={require('../Images/Tedbear.png')}></Image>
      </ImageBackground>
    );
  }
}
