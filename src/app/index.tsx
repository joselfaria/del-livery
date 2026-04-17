import AppBar from "@/components/AppBar";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function index() {
  return <View style={styles.container}>
    <View style={styles.header}>    
      <Image source={require("../assets/icon.jpg")} style={styles.image} />
      <Text style={styles.logo}>Del-Livery</Text>
    </View>

    <View>
      <Text style={styles.bigText}>
        Tenha lucro ajudando o meio ambiente
      </Text>
      <Text style={styles.smallText}>
        Sua chance de conseguir ajudar no aluguel de uma maneira simples economicamente viavel e sustentavel para o meio ambiente.
      </Text>
      <TouchableOpacity style={{ backgroundColor: "#1a1a1a", padding: 12, borderRadius: 6, alignSelf: "center", paddingHorizontal: 135 }}>
        <Text style={{ color: "#ffffff", fontSize: 14, fontWeight: "600" }}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: "#d3d3d3", padding: 12, borderRadius: 6, alignSelf: "center", marginTop: 10, paddingHorizontal: 150 }}>
        <Text style={{ color: "#000000", fontSize: 14, fontWeight: "600" }}>Login</Text>
      </TouchableOpacity>
    </View>
    <Text style={{ fontSize: 22, textAlign: "left", color: "#000000", marginTop: 40, marginLeft: 20, fontWeight: "bold" }}>
        Como funciona
    </Text>

    

    <AppBar />
  </View>;
}

const styles = {
  header: {
    backgroundColor: "#ffffff",
    padding: "10px",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
    shadowColor: '#c5c5c5',
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  image : {
    width: 30,
    height: 20,
    alignSelf: "left",
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#f9fafb",
  },
  logo: {
    fontSize: 12,
    marginBottom: 20,
    fontWeight: "bold",
  },
  bigText: {
    paddingTop: 40,
    fontSize: 30,
    fontFamily: "SourceSansPro-Regular",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  smallText: {
    fontSize: 12,
    paddingHorizontal: 55,
    paddingBottom: 40,
    textAlign: "center",
    color: "#8d8d8d",
  },

} as const;
