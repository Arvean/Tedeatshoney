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
    };
    this.listener = props.bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      this.handleDevice,
    );
  }

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
    console.log('Scanninig');
  };

  render() {
    const listItems = Object.keys(this.state.deviceList).map((uuid) => (
      <Picker.Item
        key={uuid}
        label={this.state.deviceList[uuid] || uuid} //Why say OR here?
        value={uuid}
      />
    ));
    return (
      <Picker
        style={{height: 50, width: '100%'}}
        selectedValue={this.state.uuid}
        onValueChange={
          (itemValue) => this.setState({uuid: itemValue}) //Do I have to stringify?
        }>
        {listItems}
      </Picker>
    );
  }
}
// prop inside > children between
// unique key ID (key={uuid}), Whenever array of Components
// names = {"3423jsdf": "Bob", "jwejw2423": "Joe"}
// names["3423jsdf"]
// names["jj2u35235"] = "Fred"

// let uuid = blescanresults[i]["uuid"];
// let name = blescanresults[i]["name"];
// names = copy(this.state.deviceList);
// names[uuid] = name

//this.setState({deviceList: names});

// names = {
//   "3423jsdf": {
//     "name": "Bob", "other": "blah"
//   },
//   ...
// }
// names["3423jsdf"]["other"]

//Obejct.keys
//Key is unique value is not
//Can do an object in a object
//Objects store a bunch of key value pairs
//let copiedPerson = JSON.parse(JSON.stringify(person));
//Do copy before loop
