import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface Props {
  addItem: (task: string) => void;
}

const AddItem: React.FC<Props> = ({ addItem }) => {
  const [task, setTask] = useState('');

  const handleAddItem = () => {
    addItem(task);
    setTask('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Add a task"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add" onPress={handleAddItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    width: '80%'
  },
  input: {
    padding: 10,
    borderBottomColor: '#7CA1B4',
    borderBottomWidth: 1,
    width: '70%'
  }
});

export default AddItem;
