import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  Modal,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
import { GlassView } from "expo-glass-effect";
import { styles } from "./styles";
import UserCard from "../../components/UserCard";
import { fetchUsers } from "../../services/api";
import { RandomUser } from "../../types/randomUser";

export default function UserListScreen() {
  const [users, setUsers] = useState<RandomUser[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    return fullName.includes(searchText.toLowerCase());
  });
  const isSearchActive = isSearching && searchText.trim().length > 0;
  const listData = isSearching
    ? searchText.length > 0
      ? filteredUsers
      : []
    : users;
  const [gender, setGender] = useState<string>("all");
  const [nationality, setNationality] = useState<string>("all");
  const genders = ["all", "female", "male"];
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

  function selectGender(value: string) {
    applyFilters(value, nationality);
  }

  function selectNationality(value: string) {
    applyFilters(gender, value);
  }

  function applyFilters(newGender: string, newNat: string) {
    setGender(newGender);
    setNationality(newNat);
    setPage(1);
    setUsers([]);
    loadUsers(1, true, newGender, newNat);
  }

  function exitSearch() {
    setIsSearching(false);
    setSearchText("");
    Keyboard.dismiss();
  }

  function openFilter() {
    setIsFilterVisible(true);
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
    <SafeAreaView style={styles.container} edges={["top"]}>
      {isSearching ? (
        <View style={styles.searchContainer}>
          <View style={styles.searchShadow}>
            <View style={styles.searchInputWrapper}>
              <SymbolView
                name="magnifyingglass"
                size={17}
                tintColor="#727272"
              />

              <TextInput
                placeholder="Search"
                value={searchText}
                onChangeText={setSearchText}
                style={styles.searchInput}
                placeholderTextColor="#727272"
                autoFocus
              />

              <TouchableOpacity
                onPress={() => {
                  setSearchText("");
                  setIsSearching(false);
                }}
              >
                <SymbolView name="xmark" size={17} tintColor="#727272" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={openFilter}
            style={styles.touchArea}
          >
            <GlassView style={styles.iconButton} glassEffectStyle="regular">
              <SymbolView
                name="line.3.horizontal.decrease"
                size={24}
                tintColor="#1A1A1A"
              />
            </GlassView>
          </TouchableOpacity>

          <Text style={styles.title}>People</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsSearching(true)}
            style={styles.touchArea}
          >
            <GlassView style={styles.iconButton}>
              <SymbolView
                name="magnifyingglass"
                size={24}
                tintColor="#1A1A1A"
              />
            </GlassView>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        ListEmptyComponent={
          isSearching ? (
            searchText.length === 0 ? (
              <TouchableOpacity
                style={styles.emptyState}
                activeOpacity={1}
                onPress={exitSearch}
              >
                <Text style={styles.emptyTitle}>Find People</Text>
                <Text style={styles.emptySubtitle}>
                  Search by name or filter to discover new connections
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No results</Text>
                <Text style={styles.emptySubtitle}>Try a different name</Text>
              </View>
            )
          ) : null
        }
        data={listData}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onPress={() =>
              navigation.navigate("Profile" as never, { user: item } as never)
            }
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 24,
          flexGrow: 1,
        }}
        onEndReached={!isSearching ? loadMore : undefined}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          !isSearching && loadingMore ? (
            <ActivityIndicator size="small" />
          ) : null
        }
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

      <Modal
        visible={isFilterVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setIsFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.overlayBackground}
            activeOpacity={1}
            onPressOut={() => setIsFilterVisible(false)}
          />

          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filters</Text>

            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setIsFilterVisible(false)}
            >
              <SymbolView name="checkmark" size={24} tintColor="#fff" />
            </TouchableOpacity>

            <View style={styles.filtersContent}>
              <Text style={styles.filterTitle}>Gender</Text>

              <View style={styles.chipsContainer}>
                {genders.map((g) => {
                  const isActive = gender === g;

                  return (
                    <TouchableOpacity
                      key={g}
                      style={[styles.chip, isActive ? styles.chipActive : null]}
                      onPress={() => selectGender(g)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isActive ? styles.chipTextActive : null,
                        ]}
                      >
                        {g === "all"
                          ? "All"
                          : g === "female"
                            ? "Female"
                            : "Male"}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={[styles.filterTitle, { marginTop: 16 }]}>
                Nationality
              </Text>

              <View style={styles.chipsContainer}>
                {nationalities.map((nat) => {
                  const isActive = nationality === nat;

                  return (
                    <TouchableOpacity
                      key={nat}
                      style={[styles.chip, isActive && styles.chipActive]}
                      onPress={() => selectNationality(nat)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          isActive && styles.chipTextActive,
                        ]}
                      >
                        {nat === "all" ? "All" : nat.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
