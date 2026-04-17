import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function AppBar() {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="home" size={22} color={"#1a1a1a"} />
        <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  nav: {
    backgroundColor: "#333",
    padding: "10px",
  },
  title: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "bold",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingBottom: 20,
    borderTopWidth: 0.5,
    borderTopColor: "#e5e5e5",
  },
  navItem: { alignItems: "center", gap: 3 },
  navLabel: { fontSize: 10, color: "#ccc" },
  navLabelActive: { color: "#1a1a1a", fontWeight: "600" },
};
