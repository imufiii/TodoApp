
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Header from '../src/components/Header';
import AddItem from '../src/components/AddItem';
import TaskItem from '../src/components/taskItem';
import { FIRESTORE_DB } from '../FirebaseConfig';
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const TodoApp = () => {
  const [todoList, setTodoList] = useState<{ id: string; task: string; completed: boolean; }[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(FIRESTORE_DB, 'todoDB'), (snapshot) => {
      const list: { id: string; task: string; completed: boolean; }[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as { id: string; task: string; completed: boolean; });
      });
      setTodoList(list);
    });
    return () => unsubscribe();
  }, []);

  const addItem = async (task: string) => {
    if (task.trim() !== '') {
      await addDoc(collection(FIRESTORE_DB, 'todoDB'), {
        task,
        completed: false,
      });
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    const taskDoc = doc(FIRESTORE_DB, 'todoDB', id);
    await updateDoc(taskDoc, { completed: !completed });
  };

  const deleteItem = async (id: string) => {
    const taskDoc = doc(FIRESTORE_DB, 'todoDB', id);
    await deleteDoc(taskDoc);
  };

  return (
    <View style={styles.container}>
      <Header title='Todo List' />
      <AddItem addItem={addItem} />
      <FlatList
        data={todoList}
        renderItem={({ item }) => (
          <TaskItem
            item={item.task}
            completed={item.completed}
            toggleComplete={() => toggleComplete(item.id, item.completed)}
            deleteItem={() => deleteItem(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
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
});

export default TodoApp;
