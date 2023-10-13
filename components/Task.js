import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Task = (props) => {
  const taskStyles = props.completed
    ? { textDecorationLine: "line-through", color: "#B0B0B0" }
    : {};

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity onPress={props.onEdit}>
          <View style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar</Text>
          </View>
        </TouchableOpacity>
        <Text style={[styles.itemText, taskStyles]}>{props.texto}</Text>
      </View>
      <TouchableOpacity onPress={props.onDelete}>
          <Text style={styles.deleteText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#176B87",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#64CCC5",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 10,
  },
  itemText: {
    maxWidth: "80%",
    color: "#DAFFFB",
  },
  circle: {
    width: 12,
    height: 12,
    borderColor: "#64CCC5",
    borderWidth: 2,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: "#DAFFFB",
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  editButtonText: {
    color: "#176B87",
    fontWeight: "bold",
  },
  deleteText: {
    color: "#FF6B6B", // Cor vermelha para o botão de exclusão
  },
});

export default Task;
