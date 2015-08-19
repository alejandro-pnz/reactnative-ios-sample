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

class InfovuzApp extends Component{
  render(){
    return (
        <NavigatorIOS
        style={styles.navigationContainer}
        initialRoute={{
            title: 'ИнфоВУЗ ПГУ',
            component: AdvertComponent,
        }}/>
      );
  }
}

AppRegistry.registerComponent('InfovuzApp', () => InfovuzApp);

var styles = StyleSheet.create(require('./styles'));
