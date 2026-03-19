import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RandomUser } from "../../types/randomUser";
import styles from "./styles";
import { getMessages, saveMessage } from "../../services/chat";

interface ChatMessage {
  id: string;
  text: string;
  time: string;
  isMe: boolean;
}

export default function UserChatScreen() {
  const route = useRoute();
  const { user } = route.params as { user: RandomUser };
  const userId = user.email;
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const isTyping = input.trim().length > 0;

  useEffect(() => {
    const storedMessages = getMessages(userId);
    const formattedMessages: ChatMessage[] = storedMessages.map((msg: any) => ({
      ...msg,
      isMe: msg.isMe ?? true,
    }));

    setMessages(formattedMessages);
  }, []);

  function handleSend() {
    if (!input.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMe: true,
    };

    saveMessage(userId, newMessage);

    const updatedMessages = getMessages(userId);
    const formattedMessages: ChatMessage[] = updatedMessages.map(
      (msg: any) => ({
        ...msg,
        isMe: msg.isMe ?? true,
      }),
    );

    setMessages(formattedMessages);
    setInput("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" translucent />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={16}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.headerButton}>
              <SymbolView name="chevron.left" size={22} tintColor="#000" />
            </View>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            {user.name.first} {user.name.last}
          </Text>

          <TouchableOpacity style={styles.avatarWrapper}>
            <Image
              source={{ uri: user.picture.thumbnail }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          ref={flatListRef}
          data={[...messages].reverse()}
          inverted
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 16,
            flexGrow: 1,
          }}
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          onLayout={() =>
            flatListRef.current?.scrollToOffset({ offset: 0, animated: false })
          }
          onContentSizeChange={() => {
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
          }}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageRow,
                item.isMe ? styles.rowRight : styles.rowLeft,
              ]}
            >
              <View
                style={[
                  styles.bubble,
                  item.isMe ? styles.myBubble : styles.otherBubble,
                ]}
              >
                <Text style={item.isMe ? styles.myText : styles.otherText}>
                  {item.text}
                  <Text style={item.isMe ? styles.myTime : styles.otherTime}>
                    {"  "}
                    {item.time}
                  </Text>
                </Text>
              </View>
            </View>
          )}
        />

        <View style={styles.fadeOverlay} pointerEvents="none">
          <LinearGradient
            colors={["#FFFFFF", "rgba(255,255,255,0.8)", "rgba(255,255,255,0)"]}
            style={{ flex: 1 }}
          />
        </View>

        <View style={styles.bottomFade} pointerEvents="none">
          <LinearGradient
            colors={[
              "rgba(255,255,255,0)",
              "rgba(255,255,255,0.6)",
              "rgba(255,255,255,1)",
            ]}
            style={{ flex: 1 }}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Message"
            placeholderTextColor="#BFBFBF"
            value={input}
            onChangeText={setInput}
          />

          <TouchableOpacity
            style={[
              styles.sendButton,
              { backgroundColor: isTyping ? "#1A1A1A" : "#373737" },
            ]}
            onPress={handleSend}
            disabled={!isTyping}
          >
            <SymbolView name="paperplane.fill" size={24} tintColor="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
