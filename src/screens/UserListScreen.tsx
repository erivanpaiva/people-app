import { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { fetchUsers } from "../services/api";
import UserCard from "../components/UserCard";
import { RandomUser } from "../types/randomUser";

export default function UserListScreen() {
  const [users, setUsers] = useState<RandomUser[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation: any = useNavigation();
  const [page, setPage] = useState(1);
  const [LoadingMore, setLoadingMore] = useState(false);

  async function loadUsers(pageNumber = 1, isRefresh = false) {
    try {
      const data = await fetchUsers(pageNumber);

      if (isRefresh) {
        setUsers(data);
      } else {
        setUsers((prev) => [...prev, ...data]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  function loadMore() {
    if (LoadingMore || loading) return;

    setLoadingMore(true);

    const nextPage = page + 1;
    setPage(nextPage);

    loadUsers(nextPage);
  }

  useEffect(() => {
    loadUsers(1);
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.email}
      renderItem={({ item }) => (
        <UserCard
          user={item}
          onPress={() =>
            navigation.navigate("Profile" as never, { user: item } as never)
          }
        />
      )}
      contentContainerStyle={styles.list}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        LoadingMore ? <ActivityIndicator size="small" /> : null
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
