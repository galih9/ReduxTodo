import React, { Fragment, Component } from 'react';
import {
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Keyboard,
  TouchableOpacity,
  Button,
  Alert,
  DisplayView

} from 'react-native';
import { connect } from 'react-redux';
import * as actionTodos from '../redux/action/todos';

class List extends Component {

  constructor(props) {
    super(props)

    this.state = {
      idTask: null,
      titleTask: "",
      isHidden: true
    }
  }

  handleAdd = () => {
    this.props.addTodos({
       id: Math.floor(Math.random() * 9), title: this.state.titleTask 
    })

    this.setState({ titleTask: ""})
    Keyboard.dismiss()
  }

  handleRemove = (item) => () => {
    Alert.alert(
			'ARE YOU SURE ?',
			'TOUCH OK TO CONFIRM',
			[
				{
					text: 'Batal',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{ text: 'OK', onPress: () => this.props.removeTodos(item.id) },
			],
			{ cancelable: false },
		);
  }

  handleEdit = item => () => {
    this.setState({ titleTask: item.title, idTask: item.id })
  }

  handleButton = item => () => {
    this.setState({ isHidden: !this.state.isHidden })
  }

  handleButtonEdit = () => {
		this.props.editTodos({
			id: this.state.idTask,
			title: this.state.titleTask
		})

		this.setState({ titleTask: "" })
		Keyboard.dismiss()
  }
  

  render() {
    return (
      <Fragment>
        <StatusBar/>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.scrollView}>


          <View style={styles.conteiner}>
            <View style={{flex:1,flexDirection:'row'}}>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid={"transparent"}
              underlineColorios={"transparent"}
              placeholder='Tambah task'
              returnKeyType={"send"}
              value={this.state.titleTask}
              onChangeText={(text) => this.setState({ titleTask: text })}
              />
              <TouchableOpacity onPress={this.handleAdd} style={{marginTop:19,width:40,height:60,backgroundColor:'cyan',borderRadius:10,marginRight: 10}}>
                <Text style={{padding: 5,marginTop: 10}}>ADD</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleButtonEdit} style={{marginTop:19,width:40,height:60,backgroundColor:'cyan',borderRadius:10,marginRight: 10}}>
                <Text style={{padding: 5,marginTop: 10}}>EDIT</Text>
              </TouchableOpacity>

              </View>
            <View style={styles.containerList}>
              {this.props.todos.data.length !== 0 && this.props.todos.data.map((item, i) => (
                <View key={i} style={styles.list}>
                  <Text style={styles.textList}>{item.title}</Text>
                  <View style={[styles.contentAction]} >
                    <TouchableOpacity onPress={this.handleEdit(item)} style={{marginRight:5}}>
                        <Text>EDIT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleRemove(item)} >
                        <Text>HAPUS</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            {this.props.todos.data.length === 0 &&
              <View style={styles.contentEmpty}>
                
                <Text style={styles.textInfo}>{"Task Belum dibikin, bikin treuk yuk"}</Text>
              </View>
            }

          </View>
        </ScrollView>
      </Fragment>
    )
  }
};




const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTodos: (value) => dispatch(actionTodos.addTodos(value)),
    editTodos: (value) => dispatch(actionTodos.editTodos(value)),
    removeTodos: (id) => dispatch(actionTodos.removeTodos(id))
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  contentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '20%',
    justifyContent: 'space-between',
    marginRight: 20
  },
  conteiner: {
    flex: 1
  },
  contentEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInfo: {
    fontSize: 20,
    fontWeight: '500',
    color: '#B0B9D2',
    textAlign: 'center',
    width: '80%',
    marginTop: 20
  },
  textInput: {
    marginTop: 20,
    backgroundColor: '#e5e8f0',
    padding: 9,
    marginHorizontal: 20,
    borderRadius: 20,
    width: 180,
    height: 60
  },
  containerList: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#B0B9D2'
  },
  list: {
    borderBottomWidth: 1,
    borderBottomColor: '#B0B9D2',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textList: {
    padding: 15,
    fontSize: 16,
    fontWeight: '500',
    color: '#252d41'
  }
});


export default connect( mapStateToProps, mapDispatchToProps )(List);
