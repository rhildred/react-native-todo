import React from 'react';
import { StyleSheet, Text, View, TextInput, YellowBox , TouchableHighlight, Image} from 'react-native';
import firebase from 'firebase/app';
import 'firebase/database';
import _ from 'lodash';



YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};


// Initialize Firebase
import config from '../config.json';
firebase.initializeApp(config);

export default class Main extends React.Component {
  oTodos = {};
  constructor(props) {
    super(props);
    this.state = { todo: '', date:"2016-05-15", currentUser: null };
    this.getFromFirebase();
  }
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
}

  getFromFirebase() {
    firebase.database().ref('tasks').on("value", snapshot =>{
      console.log(snapshot.val());
      this.oTodos = snapshot.val();
      this.setState({ todo: "" });
    });

  }

  onTaskCompletion(id) {
    console.log(this.oTodos[id]);
    alert("clicked complete " + id);
  }

  onTaskDeletion(id) {
    console.log(this.oTodos[id]);
    firebase.database().ref('tasks/' + id).remove().then(() =>{
      this.getFromFirebase();
    });
  }


  updateText(event) {
    //    console.log(this.state);
    //    alert("text box: " + this.state.todo);
    let taskID = Math.floor(new Date() / 1000);
    firebase.database().ref('tasks/' + taskID).set({
      name: this.state.todo
    }).then(() => {
      this.getFromFirebase();
    });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
      <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
        <TextInput
          ref='todo'
          style={styles.currentTodo}
          placeholder="Type your text here!"
          value={this.state.todo}
          onChangeText={(text) => this.setState({ todo: text })}
          onSubmitEditing={() => this.updateText()}
          autoFocus={true}
          blurOnSubmit={false}
        />
        <Text>Type your todo above</Text>
        <View style={styles.todos}>
          {
            Object.keys(this.oTodos).reverse().map((key) => {
              return (<View key={key} style={styles.row}>
                <TouchableHighlight onPress={() => this.onTaskCompletion(key)}>
                  <Image style={styles.check} source={require('../images/2x/baseline_done_black_18dp.png')} />
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.onTaskDeletion(key)}>
                  <Image style={styles.check} source={require('../images/2x/baseline_delete_black_18dp.png')} />
                </TouchableHighlight>
                <Text>{this.oTodos[key].name}</Text>
              </View>);
            })
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: "90%",
    margin: "auto"
  },
  currentTodo: {
    marginTop: 20,
    height: 40
  },
  todos: {
    "marginTop": 20,
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  check: {
    height: 20,
    width: 20
  }

});
