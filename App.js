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
} from 'react-native';
import List from './List';

export default class App extends Component {
  constructor() {
    super();
    this.state = {buttonHidden: false};
  }

  hide = () => {
    this.setState({buttonHidden: true});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Talk To Ted</Text>
        {this.state.buttonHidden ? (
          <List />
        ) : (
          <Button title="Find Devices" onPress={() => this.hide()} />
        )}
      </SafeAreaView>
    );
  }
}
