import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

const Lists = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  //read todo
  useEffect(() => {
    const todoRef = collection(db, "todos");
    const unsubscribe = onSnapshot(todoRef, (querySnapshot) => {
      const todosData = [];
      querySnapshot.forEach((doc) => {
        todosData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTodos(todosData);
    });

    return () => unsubscribe();
  }, []);

  //Create todo:
  const createTodo = async (e) => {
    if (newTodo === "") {
      alert("Please enter todo");
    } else {
      const now = new Date();
      const timestamp = now.toISOString();
      await addDoc(collection(db, "todos"), {
        createdOn: timestamp,
        text: newTodo,
      });
      setNewTodo("");
    }
  };

  //Delete Todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>List</Text>

        <View>
          {todos.map((todo, index) => (
            <View style={styles.container} key={index}>
              <Text> {todo.text}</Text>
              <Button
                title="Details"
                onPress={() => navigation.navigate("Details", { todo })}
              />
              <Button title="Delete" onPress={() => deleteTodo(todo.id)} />
            </View>
          ))}
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={newTodo}
            onChangeText={(text) => setNewTodo(text)}
            placeholder="What do you have to do?"
          />
          <Button
            title="Add Todo"
            onPress={() => createTodo()}
            disabled={todos === ""}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Lists;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});
