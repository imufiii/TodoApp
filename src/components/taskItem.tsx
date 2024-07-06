import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Platform } from 'react-native';

interface Props {
  item: string;
  completed: boolean;
  toggleComplete: () => void;
  deleteItem: () => void;
}

const TaskItem: React.FC<Props> = ({ item, completed, toggleComplete, deleteItem }) => {
  return (
    <View style={[styles.item, Platform.OS === 'ios' ? styles.shadowIOS : styles.shadowAndroid]}>
      <View style={styles.itemDetails}>
        <TouchableOpacity style={styles.taskDetails} onPress={toggleComplete}>
          <Text style={[styles.itemName, completed && styles.completed]}>{item}</Text>
          <Switch
            trackColor={{ false: '#7CA1B4', true: '#7CA1B4' }}
            thumbColor={completed ? '#FF6347' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleComplete}
            value={completed}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteItem}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.statusText}>{completed ? 'Done' : 'Due'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    borderBottomWidth: 2,
    borderBottomColor: '#7CA1B4',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderRadius: 5,
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  taskDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    color: '#7CA1B4',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#CFCFCF'
  },
  deleteButton: {
    color: '#FF6347',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6347',
    alignSelf: 'flex-start',
    marginTop: 5,
    paddingHorizontal: 10,
  },
  shadowIOS: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  shadowAndroid: {
    elevation: 5,
  }
});

export default TaskItem;
