import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Animated,
} from "react-native";
import { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import { GlassView } from "expo-glass-effect";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useRoute, useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { RandomUser } from "../../types/randomUser";

export default function UserProfileScreen() {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { user } = route.params as { user: RandomUser };
  const fullName = `${user.name.first} ${user.name.last}`;
  const location = `${user.location.city}, ${user.location.country}`;
  const [liked, setLiked] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const handleLike = () => {
    setLiked(!liked);

    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1.2,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <TouchableOpacity
        style={styles.backButtonWrapper}
        onPress={() => navigation.goBack()}
      >
        <GlassView style={styles.glassBackButton} glassEffectStyle="regular">
          <View style={styles.backButtonInner}>
            <SymbolView name="chevron.left" size={22} tintColor="#fff" />
          </View>
        </GlassView>
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.headerImageContainer}>
          <Image
            source={{ uri: user.picture.large }}
            style={styles.headerImage}
            resizeMode="cover"
          />

          <View style={styles.overlay}>
            <MaskedView
              style={styles.mask}
              pointerEvents="none"
              maskElement={
                <LinearGradient
                  colors={["transparent", "black", "black"]}
                  locations={[0, 0.8, 1]}
                  style={{ flex: 1 }}
                />
              }
            >
              <BlurView intensity={100} style={styles.blur} />
              <BlurView intensity={95} tint="dark" style={styles.blur} />
            </MaskedView>
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.3)"]}
              style={styles.gradient}
              pointerEvents="none"
            />

            <View style={styles.content}>
              <Text style={styles.name}>{fullName}</Text>
              <Text style={styles.location}>{location}</Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Chat", { user })}
                >
                  <GlassView
                    style={styles.glassButton}
                    glassEffectStyle="regular"
                  >
                    <SymbolView
                      name="message.fill"
                      size={26}
                      tintColor="#fff"
                    />
                  </GlassView>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLike}>
                  <GlassView
                    style={styles.glassButton}
                    glassEffectStyle="regular"
                  >
                    <Animated.View style={{ transform: [{ scale }] }}>
                      <SymbolView
                        name={liked ? "heart.fill" : "heart"}
                        size={26}
                        tintColor={liked ? "#FF4245" : "#fff"}
                      />
                    </Animated.View>
                  </GlassView>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.sections}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <Text
                style={[styles.value, { color: "#007AFF" }]}
                onPress={() => Linking.openURL(`mailto:${user.email}`)}
              >
                {user.email}
              </Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.row}>
              <Text style={styles.label}>Phone</Text>
              <Text
                style={[styles.value, { color: "#007AFF" }]}
                onPress={() => Linking.openURL(`tel:${user.phone}`)}
              >
                {user.phone}
              </Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.row}>
              <Text style={styles.label}>Cell</Text>
              <Text
                style={[styles.value, { color: "#007AFF" }]}
                onPress={() => Linking.openURL(`tel:${user.cell}`)}
              >
                {user.cell}
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Personal Info</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Age</Text>
              <Text style={styles.value}>{user.dob.age}</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.row}>
              <Text style={styles.label}>Birthday</Text>
              <Text style={styles.value}>
                {new Date(user.dob.date).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
