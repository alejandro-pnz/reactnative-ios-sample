  /**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 'use strict';

 var React = require('react-native');
 var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ListView,
} = React;

var ADVERT_URL = 'http://infovuz.coffeinum.com/api/v1/adverts';
// var feed = require('feed-read');

var Infovuz = React.createClass({
getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(ADVERT_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
        style={styles.listView}/>
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading adverts...
        </Text>
      </View>
    );
  },

  renderItem: function(ad){
    return (
      <View style={styles.container}>
      <Image
      source={{uri: ad.image}}
      style={styles.thumbnail}/>
      <View style={styles.rightContainer}>
      <Text style={styles.title}>{ad.title}</Text>
      <Text style={styles.desc}>{ad.description}</Text>
      </View>
      </View>
      );
  },
});

  var styles = StyleSheet.create({
   container: {
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
   },
   rightContainer: {
     flex: 1,
   },
   title: {
     fontSize: 20,
     marginBottom: 8,
     textAlign: 'center',
   },
   desc: {
     textAlign: 'center',
   },
   thumbnail: {
     width: 160,
     height: 160,
   },
   listView: {
     paddingTop: 20,
     backgroundColor: '#F5FCFF',
   },
 });

  AppRegistry.registerComponent('Infovuz', () => Infovuz);
