import { View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

const categories = [
  { id: 1, name: "UI Design", image: "https://as2.ftcdn.net/v2/jpg/03/34/62/41/1000_F_334624196_MCipQaVcn90tyEtTfgl602H4KNFp369F.jpg" },
  { id: 2, name: "Programming", image: "https://as1.ftcdn.net/v2/jpg/03/15/20/84/1000_F_315208455_8dyiosNSqNOFT5yYWK4kxu1qMSOHBrzA.jpg" },
  { id: 3, name: "Marketing", image: "https://as2.ftcdn.net/v2/jpg/02/87/29/57/1000_F_287295724_WKpV4CwY34XAbHBTPZG1bnQbAckMJSlg.jpg" },
  { id: 4, name: "Photography", image: "https://as1.ftcdn.net/v2/jpg/06/01/12/02/1000_F_601120275_R7vaNGMT2ZPFEAr9L20IK6kHflzXzTKj.jpg" },
  { id: 5, name: "Business", image: "https://as1.ftcdn.net/v2/jpg/02/65/65/04/1000_F_265650406_tfvEYxFGDXrb9quQzG7FTiVOCGJAzl4i.jpg" },
  { id: 6, name: "Accounting", image: "https://as2.ftcdn.net/v2/jpg/01/71/82/63/1000_F_171826371_wrk3fpxKM7buTmjS2LI1ogYVAapIJtw5.jpg" },
];

export default function HomeScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerRight: () => (
        <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/auth/login")}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: "https://as2.ftcdn.net/v2/jpg/09/57/39/15/1000_F_957391546_wnguCZZkTdc8Y0QSjKG0vUqaBR97xTvk.jpg" }} style={styles.image} />
      <Text style={styles.title}>Categories</Text>
      <FlatList data={categories} numColumns={2} keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push(`/course/details?categoryId=${item.id}&categoryName=${encodeURIComponent(item.name)}`)}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginRight: 10,
    borderRadius: 40,
  },
  image: {
    width: 390,
    height: 200,
    top: 0,
    position: 'absolute',
    resizeMode: "cover",
  },
  title: {
    marginTop: 220,
    fontSize: 22,
    fontWeight: '600',
    color: '#9F2B68',
    textAlign:'center',
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    padding: 10,
    elevation: 5,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 1,
    shadowRadius: 10,
  },  
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#9F2B68",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  loginButtonText: {
    color: "white", 
    fontSize: 16,
    fontWeight: "bold",
  },
  
});
