import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [tarefa, setTarefa] = useState('');
  const [tarefaItens, setTarefasItens] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  function handleChangeAdd() {
    Keyboard.dismiss();
    if (tarefa.trim() !== '') {
      if (editIndex !== -1) {
        // Edit the existing task
        const updatedTasks = [...tarefaItens];
        updatedTasks[editIndex].text = tarefa;
        setTarefasItens(updatedTasks);
        setEditIndex(-1); // Exit edit mode
      } else {
        // Add a new task
        setTarefasItens([...tarefaItens, { text: tarefa, completed: false }]);
      }
      setTarefa('');
    }
  }

  const completeTask = (index) => {
    const updatedTasks = [...tarefaItens];
    updatedTasks[index].completed = true;
    setTarefasItens(updatedTasks);
  }

  const startEditingTask = (index) => {
    setTarefa(tarefaItens[index].text);
    setEditIndex(index);
  }

  const deleteTask = (index) => {
    const updatedTasks = [...tarefaItens];
    updatedTasks.splice(index, 1);
    setTarefasItens(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#61dafb" />
      {/* Tarefas de hoje */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Tarefas de hoje</Text>

          <View style={styles.items}>
          {tarefaItens.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task
                texto={item.text}
                completed={item.completed}
                onEdit={() => startEditingTask(index)}
                isEditing={editIndex === index}
                onDelete={() => deleteTask(index)} // Passa a função de exclusão
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Escrever uma tarefa */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Escreva uma tarefa'}
          placeholderTextColor="#DAFFFB"
          value={tarefa}
          onChangeText={(text) => setTarefa(text)}
        />

        <TouchableOpacity onPress={handleChangeAdd}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>{editIndex === -1 ? 'Novo' : 'Salvar'}</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

// Resto do código permanece igual



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04364A',
  },
  tasksWrapper:{
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DAFFFB',
  },
  items:{
    marginTop: 30,
  },
  writeTaskWrapper:{
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#176B87',
    borderRadius: 16,
    borderColor: "#64CCC5",
    color: '#DAFFFB',
    borderWidth: 1,
    width: 250,
  },
  addWrapper:{
    width: 60,
    height: 60,
    backgroundColor: '#176B87',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "#64CCC5",
    borderWidth: 1,
  },
  addText:{
    color: '#DAFFFB',
  },
});
