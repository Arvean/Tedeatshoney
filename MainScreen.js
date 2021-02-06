import React from 'react';
import {Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  SafeAreaView,
} from 'react-native';

export default class MainScreen extends Component {
  constructor(props) {
    super();
    this.state = {secondbuttonHidden: false};
  }

  hide2 = () => {
    this.setState({secondbuttonHidden: true});
  };

  render() {
    return (
      <SafeAreaView>
        <TouchableOpacity>
          <Button title="Ted" onPress={() => this.props.hide()} />
        </TouchableOpacity>
        {this.state.secondbuttonHidden} ?
        <List bleManagerEmitter={bleManagerEmitter} /> :
        <TouchableOpacity>
          <Button title="Find Devices" onPress={() => this.hide2()} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
