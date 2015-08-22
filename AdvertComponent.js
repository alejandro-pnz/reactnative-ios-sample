var React = require('react-native');
var {
  Component,
  StyleSheet,
  Text,
  Image,
  View,
  ListView,
} = React;

var ADVERT_URL = 'http://infovuz.coffeinum.com/api/v1/adverts';

class AdvertComponent extends Component
{
  constructor(props) {
      super(props);
      this.state = {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: false,
      }
      this.fetchData();
    }

  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }
  
  fetchData() {
    fetch(ADVERT_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        loaded: true,
      });
    })
    .done();
  }
  
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
        style={styles.listView}/>
      );
  }
  
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
        Загружаю объявления...
        </Text>
      </View>
      );
  }
  
  renderItem(ad){
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
  }
}

var styles = StyleSheet.create(require('./styles'));

module.exports = AdvertComponent;