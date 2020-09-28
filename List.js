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
import BleManager from 'react-native-ble-manager'; // for talking to BLE peripherals

export default class List extends Component {
  constructor(props) {
    super();
    this.state = {
      deviceList: {},
      uuid: null,
      // deviceList[0] = null Not an Array
    };
    this.listener = props.bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      this.handleDevice,
    );
  }
  //Check if there is an event for bluetooth
  async componentDidMount() {
    await BleManager.start();
    this.scan();
  }

  async componentWillUnmount() {
    await BleManager.stopScan();
    this.listener.remove();
  }

  handleDevice = (device) => {
    // Copying deviceList so I can change it without it breaking. State problem.
    let copiedDeviceList = JSON.parse(JSON.stringify(this.state.deviceList));
    copiedDeviceList[device.id] = device.name;
    this.setState({deviceList: copiedDeviceList});
  };

  scan = () => {
    BleManager.scan([], 5);
    console.log('Scanning');
  };

  connect = (uuid) => {
    BleManager.connect(uuid)
      .then(() => {
        console.log('Connected');
        Alert.alert('Connected! :)');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Failed to connect :(');
      });
  };

  render() {
    const listItems = Object.keys(this.state.deviceList).map((uuid) => (
      <Picker.Item
        key={uuid}
        label={this.state.deviceList[uuid] || uuid}
        value={uuid}
      />
    ));
    return (
      <Picker
        style={{height: 50, width: '100%'}}
        selectedValue={this.state.uuid}
        onValueChange={(uuid) => {
          this.setState({uuid: uuid});
          this.connect(uuid);
        }}>
        {listItems}
      </Picker>
    );
  }
}
