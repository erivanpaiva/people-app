import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { RandomUser } from "../types/randomUser";
import { getMessages, saveMessage } from "../services/chat";

interface Message {
  id: string;
  text: string;
  time: string;
}

export default function UserChatScreen() {
  const route = useRoute();
  const { user } = route.params as { user: RandomUser };
  const userId = user.email;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    const storedMessages = getMessages(userId);
    setMessages(storedMessages);
  }, []);

  function handleSend() {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      time: new Date().toLocaleTimeString(),
    };

    saveMessage(userId, newMessage);

    const updatedMessages = getMessages(userId);
    setMessages(updatedMessages);
    setInput("");
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text>{item.text}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
      />

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  message: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },

  time: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },

  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 8,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  sendButton: {
    marginLeft: 8,
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },

  sendText: {
    color: "#fff",
  },
});
