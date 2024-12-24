import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { AppContext } from "./AppContext";

const HomeScreen = () => {
  const { tasks, addTask, alterComplete, removeTask, filter, setFilter } =
    useContext(AppContext);
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      addTask(text);
      setText("");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.complete;
    if (filter === "pending") return !task.complete;
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Digite sua tarefa..."
        />
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => setFilter("all")}
          style={[styles.filterButton, filter === "all" && styles.activeFilter]}
        >
          <Text
            style={[
              styles.filterText,
              filter === "all" && styles.activeFilterText,
            ]}
          >
            Todas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter("completed")}
          style={[
            styles.filterButton,
            filter === "completed" && styles.activeFilter,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              filter === "completed" && styles.activeFilterText,
            ]}
          >
            Concluídas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter("pending")}
          style={[
            styles.filterButton,
            filter === "pending" && styles.activeFilter,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              filter === "pending" && styles.activeFilterText,
            ]}
          >
            Pendentes
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => alterComplete(item.id)}>
              <Text style={[styles.itemText, item.complete && styles.complete]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeTask(item.id)}>
              <Text style={styles.remove}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  inputContainer: { flexDirection: "row", marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
  },
  filterText: { fontSize: 16, color: "#007BFF" },
  activeFilter: {
    backgroundColor: "#007BFF",
  },
  activeFilterText: {
    color: "#fff",
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemText: { fontSize: 16 },
  complete: { textDecorationLine: "line-through", color: "#888" },
  remove: { color: "red", fontWeight: "bold", marginLeft: 10 },
});

export default HomeScreen;
