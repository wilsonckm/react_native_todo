import {
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function Details({ route, navigation }) {
  const todo = route.params;
  const [updatedTodo, setUpdatedTodo] = useState(todo.text);

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "todos", todo.todo.id), {
        text: updatedTodo,
      });
      console.log("Document successfully updated");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating document", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.text} key={todo.id}>
          {todo.todo.text}
        </Text>
        <TextInput
          style={styles.input}
          value={updatedTodo}
          onChangeText={(text) => setUpdatedTodo(text)}
          placeholder={todo.todo.text}
        />
        <Button title="Update Todo" onPress={handleUpdate} />
      </View>
    </SafeAreaView>
  );
}

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
