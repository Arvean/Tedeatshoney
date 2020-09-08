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
  Alert,
} from 'react-native';
import {Picker} from '@react-native-community/picker';

export default class List extends Component {
  constructor() {
    super(App);
    this.state = {
      Devices: null,
    };
    this.Devices = [];
  }
  render() {
    return (
      <Picker
        selectedValue={this.state.Devices}
        style={{height: 50, width: 100}}></Picker>
    );
  }
}
