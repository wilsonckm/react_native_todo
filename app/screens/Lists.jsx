import { StyleSheet, Text, Button, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

const Lists = ({ navigation }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

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
  const addTodo = async () => {
    try {
      const now = new Date();
      const timestamp = now.toISOString();
      await addDoc(collection(db, "todos"), { id: timestamp, text: newTodo });
      console.log("Document successfully written");
      setNewTodo("");
    } catch (error) {
      console.error("Error writing document", error);
    }
  };

  return (
    <View>
      <Text>List</Text>

      <View>
        {todos.map((todo) => (
          <View style={styles.container} key={todo.id}>
            <Text> {todo.text}</Text>
            <Button
              title="Details"
              onPress={() => navigation.navigate("Details", { todo })}
            ></Button>
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
          onPress={() => addTodo()}
          disabled={todos === ""}
        />
      </View>
    </View>
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
