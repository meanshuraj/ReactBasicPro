import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet, Alert } from 'react-native';

export default function SeeRecipient() {
  const [users, setUsers] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedToAdd, setSelectedToAdd] = useState([]);

  const dummyUsers = [
    { id: '1', username: 'john_doe', email: 'john@example.com' },
    { id: '2', username: 'jane_smith', email: 'jane@example.com' },
    { id: '3', username: 'bob_builder', email: 'bob@example.com' },
    { id: '4', username: 'alice_wonder', email: 'alice@example.com' },
  ];

  const toggleSelectUser = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((uid) => uid !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const toggleSelectToAdd = (id) => {
    if (selectedToAdd.includes(id)) {
      setSelectedToAdd(selectedToAdd.filter((uid) => uid !== id));
    } else {
      setSelectedToAdd([...selectedToAdd, id]);
    }
  };

  const handleAddUsers = () => {
    const usersToAdd = dummyUsers.filter((u) => selectedToAdd.includes(u.id));
    const existingIds = users.map((u) => u.id);
    const newUsers = usersToAdd.filter((u) => !existingIds.includes(u.id));
    setUsers([...users, ...newUsers]);
    setSelectedToAdd([]);
    setShowAddModal(false);
  };

  const confirmRemoveUsers = () => {
    Alert.alert(
      'Confirm Remove',
      'Are you sure you want to remove selected user(s)?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: () => {
            setUsers(users.filter((u) => !selectedUsers.includes(u.id)));
            setSelectedUsers([]);
            setSelectMode(false);
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowAddModal(true)}>
          <Text style={styles.button}>＋</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectMode(!selectMode)}>
          <Text style={styles.button}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* User List */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>No users yet.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => selectMode && toggleSelectUser(item.id)}
            style={[
              styles.userItem,
              selectMode && selectedUsers.includes(item.id) && styles.selectedItem,
            ]}
          >
            <Text>{item.username} - {item.email}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Remove Buttons */}
      {selectMode && (
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => setSelectMode(false)} style={styles.footerBtn}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmRemoveUsers} style={styles.footerBtn}>
            <Text>Remove</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Add Modal */}
      <Modal visible={showAddModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Select Users to Add</Text>
          <FlatList
            data={dummyUsers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => toggleSelectToAdd(item.id)}
                style={[
                  styles.userItem,
                  selectedToAdd.includes(item.id) && styles.selectedItem,
                ]}
              >
                <Text>{item.username} - {item.email}</Text>
              </TouchableOpacity>
            )}
          />
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => setShowAddModal(false)} style={styles.footerBtn}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddUsers} style={styles.footerBtn}>
              <Text>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  button: { fontSize: 24 },
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  selectedItem: {
    backgroundColor: '#d0ebff',
  },
  modalContainer: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  footerBtn: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
});