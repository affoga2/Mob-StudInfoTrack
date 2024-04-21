import React, { useState } from "react";
import { View, Text, Image, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import AddListModal from './AddListModal';
import tempData from './tempData';
import TodoList from './TodoList';

// Import your logo here
// import logo from '/Components/app-icon.png';

const colors = {
  blue: "#0000FF",
  lightBlue: "#ADD8E6"
};

const Home = () => {
  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const [lists, setLists] = useState(tempData);

  const toggleAddTodoModal = () => {
    setAddTodoVisible(!addTodoVisible);
  };

  const renderList = ({ item }) => {
    return <TodoList list={item} updateList={updateList} />;
  };

  const addList = (list) => {
    setLists(prevLists => [...prevLists, { ...list, id: prevLists.length + 1, todos: [] }]);
  };

  const updateList = (updatedList) => {
    const index = lists.findIndex((list) => list.id === updatedList.id);
    if (index !== -1) {
      const updatedLists = [...lists];
      updatedLists[index] = updatedList;
      setLists(updatedLists);
    }
  };

  const showContextMenu = () => {
    // Your implementation for showing the context menu
    console.log("Long press detected. Showing context menu...");
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" 
             visible={addTodoVisible}
             onRequestClose={toggleAddTodoModal}
             >
          <AddListModal closeModal={toggleAddTodoModal} addList={addList} />
      </Modal>

      {/* Logo */}
      {/* Replace 'logo' with your actual logo */}
      {/* <Image source={logo} style={styles.logo} /> */}

      <View style={styles.header}>
          <Text style={styles.title}>
              Student <Text style={{ fontWeight: "300", color: colors.blue }}>Profile</Text>
          </Text>
      </View>

      <TouchableWithoutFeedback onLongPress={showContextMenu}>
      <View style={styles.listContainer}>
          <FlatList 
              data={lists} 
              keyExtractor={item => item.id.toString()} 
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={renderList} 
              keyboardShouldPersistTaps="always" 
          />
      </View>
      </TouchableWithoutFeedback>

      <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addListButton} onPress={toggleAddTodoModal}>
              <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>
          <Text style={styles.addListText}>Add Section</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
  logo: {
      position: 'absolute',
      top: 16,
      left: 16,
      width: 50, 
      height: 50, 
  },
  header: {
      position: 'absolute',
      top: 16,
      left: 17,
  },
  // mao ni ang Student Profile nga title text
  title: {
      fontSize: 36,
      fontWeight: "800",
      color: "#2D3436",
      paddingHorizontal: 64,
      textAlign: 'center'
  },
  listContainer: {
      height: 275,
      paddingLeft: 32,
      marginBottom: 16, 
  },
  addButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
  },
  addListButton: {
      borderWidth: 2,
      borderColor: colors.lightBlue,
      borderRadius: 4,
      padding: 16,
      alignItems: "center",
      justifyContent: "center"
  },
  addListText: {
      color: colors.blue,
      fontWeight: "600",
      fontSize: 14,
      marginLeft: 8
  }
});

export default Home;
