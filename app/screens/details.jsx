import { View, Text, Button } from "react-native";
import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function Details({ route, navigation }) {
  const todo = route.params;

  const handleDelete = async (item) => {
    try {
      await deleteDoc(doc(db, `todos/${item.id}`));
      console.log("Document successfully deleted");
    } catch (error) {
      console.error("Error deleting document", error);
    }
    navigation.goBack();
  };

  return (
    <View>
      <Text>{todo.text}</Text>
      <Button title="Delete" onPress={() => handleDelete(todo)} />
    </View>
  );
}
