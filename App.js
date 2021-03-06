import React, {Component} from 'react';
import {
  AppRegistry,
  Platform,
  PermissionsAndroid, // for checking if certain android permissions are enabled
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  NativeEventEmitter, // for emitting events for the BLE manager
  NativeModules, // for getting an instance of the BLE manager module
  Button,
  ToastAndroid, // for showing notification if there's a new attendee
  FlatList, // for creating lists
  Alert,
  TouchableOpacity,
} from 'react-native';
import WelcomeScreen from './app/Screen/WelcomeScreen'; //Doesn't show up
import MainScreen from './MainScreen';
import List from './List';
import BleManager from 'react-native-ble-manager'; // for talking to BLE peripherals
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule); // create an event emitter for the BLE Manager module

export default class App extends Component {
  constructor() {
    super();
    this.state = {buttonHidden: false};
  }

  hide = (props) => {
    this.setState({buttonHidden: true});
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
      },
    });

    return (
      <SafeAreaView style={styles.container}>
        {this.state.buttonHidden} ?
        <WelcomeScreen />
        :
        <MainScreen />
      </SafeAreaView>
    );
  }
}
