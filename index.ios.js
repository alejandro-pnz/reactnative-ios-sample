'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Component,
  NavigatorIOS,
  StyleSheet,
  Text,
} = React;
var AdvertComponent = require('./AdvertComponent')
var TimetableComponent = require('./TimetableComponent')

class InfovuzApp extends Component{
  render(){
    return (
        <NavigatorIOS
        style={styles.navigationContainer}
        initialRoute={{
            title: 'ИнфоВУЗ ПГУ',
            component: TimetableComponent,
        }}/>
      );
  }
}

AppRegistry.registerComponent('InfovuzApp', () => InfovuzApp);

var styles = StyleSheet.create(require('./styles'));
