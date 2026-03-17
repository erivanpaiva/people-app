import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { fetchUsers } from "../services/api";
import UserCard from "../components/UserCard";
import { RandomUser } from "../types/randomUser";

export default function UserListScreen() {
  const [users, setUsers] = useState<RandomUser[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation: any = useNavigation();
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gender, setGender] = useState<string>("all");
  const [nationality, setNationality] = useState<string>("all");
  const nationalities = [
    "all",
    "us",
    "gb",
    "br",
    "fr",
    "de",
    "es",
    "au",
    "ca",
    "fi",
    "nl",
    "ch",
    "dk",
    "no",
    "ie",
    "nz",
  ];

  async function loadUsers(
    pageNumber = 1,
    isRefresh = false,
    genderParam = gender,
    natParam = nationality,
  ) {
    setError(null);
    try {
      const data = await fetchUsers(
        pageNumber,
        genderParam === "all" ? undefined : genderParam,
        natParam === "all" ? undefined : natParam,
      );

      if (isRefresh) {
        setUsers(data);
      } else {
        setUsers((prev) => [...prev, ...data]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  function loadMore() {
    if (loadingMore || loading) return;

    setLoadingMore(true);

    const nextPage = page + 1;
    setPage(nextPage);

    loadUsers(nextPage);
  }

  async function handleRefresh() {
    setRefreshing(true);
    setPage(1);

    await loadUsers(1, true);

    setRefreshing(false);
  }

  function applyFilters(newGender: string, newNat: string) {
    setGender(newGender);
    setNationality(newNat);
    setPage(1);
    setUsers([]);
    loadUsers(1, true, newGender, newNat);
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

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>

        <Text
          onPress={() => {
            setPage(1);
            loadUsers(1, true);
          }}
        >
          Try Again
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.filtersContainer}>
        <View style={styles.filterGroup}>
          <Text>Gender</Text>

          <Text onPress={() => applyFilters("all", nationality)}>All</Text>
          <Text onPress={() => applyFilters("male", nationality)}>Male</Text>
          <Text onPress={() => applyFilters("female", nationality)}>
            Female
          </Text>
        </View>

        <View style={styles.filterGroup}>
          <Text>Nationality</Text>

          {nationalities.map((nat) => (
            <Text key={nat} onPress={() => applyFilters(gender, nat)}>
              {nat}
            </Text>
          ))}
        </View>
      </View>

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
          loadingMore ? <ActivityIndicator size="small" /> : null
        }
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
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
  filtersContainer: {
    padding: 10,
    backgroundColor: "#fff",
  },

  filterGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 8,
  },
});
