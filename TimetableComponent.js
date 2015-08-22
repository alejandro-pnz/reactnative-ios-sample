var React = require('react-native');
var {
  Component,
  StyleSheet,
  Text,
  Image,
  View,
  ListView,
} = React;

var API_GET_TIMETABLE_URL = 'http://infovuz.coffeinum.com/api/v1/timetable/1';
var LESSON_DURATION = 95;

String.prototype.toHHMM = function () {
    var minutes = parseInt(this, 10);
    var hours   = Math.floor(minutes / 60);
    var remainMinutes = Math.floor(minutes% 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (remainMinutes < 10) {remainMinutes = "0"+remainMinutes;}
    var time = hours+':'+remainMinutes;
    return time;
}

String.prototype.toDay = function () {
  var days = ['Понедельник', 'Вторник','Среда', 'Четверг','Пятница','Суббота','Воскресенье'];
  return days[Number(this)+1];
}

class TimetableComponent extends Component
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
    fetch(API_GET_TIMETABLE_URL)
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
        Загружаю расписание...
        </Text>
      </View>
      );
  }
  
  renderItem(item){
    return (
      <View style={styles.timetableDayContainer}>
          <View style={styles.timetableLeftContainer}>
            <Text >{item.day.toDay()}</Text>
            <Text >{item.start_time.toHHMM()}</Text>
            <Text>{(Number(item.start_time)+Number(LESSON_DURATION)).toString().toHHMM()}</Text>
          </View>
          <View style={styles.timetableRightContainer}>
            <Text>{item.discipline}</Text>
            <Text>{item.type}</Text>
            <Text>{item.location}</Text>
            <Text>{item.teacher}</Text>
          </View> 
      </View>
      );
  }
}
var styles = StyleSheet.create(require('./styles'));

module.exports = TimetableComponent;