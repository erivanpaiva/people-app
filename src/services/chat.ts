type Message = {
  id: string;
  text: string;
  time: string;
};

const chatStore: Record<string, Message[]> = {};

export function getMessages(userId: string): Message[] {
  return chatStore[userId] || [];
}

export function saveMessage(userId: string, message: Message) {
  if (!chatStore[userId]) {
    chatStore[userId] = [];
  }

  chatStore[userId].push(message);
}
