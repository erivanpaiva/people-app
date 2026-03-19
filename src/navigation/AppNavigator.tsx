import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserListScreen from "../screens/UserListScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import UserChatScreen from "../screens/UserChatScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Users"
          component={UserListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={UserProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={UserChatScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
