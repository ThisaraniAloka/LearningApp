import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";

const courses = [
  { id: 1, categoryId: 1, title: "UI Basics", description: "Learn UI design fundamentals", image: "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149024129.jpg?t=st=1740285508~exp=1740289108~hmac=530a6aee37f907f01227a4c7bc7963b730f93be14f34d4163bd3ded7965e1e4f&w=1380", price: 0 },
  { id: 2, categoryId: 1, title: "Advanced UI", description: "Master UI/UX design", image: "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149024127.jpg?t=st=1740285589~exp=1740289189~hmac=e3d5539acbd3609db9c91def5089f6ca68b6459476855a90336caf3a20a4cccb&w=1380", price: 19.99 },
  { id: 3, categoryId: 2, title: "JavaScript Basics", description: "Intro to JavaScript", image: "https://img.freepik.com/free-photo/side-shot-code-editor-using-react-js_181624-61842.jpg?t=st=1740285447~exp=1740289047~hmac=d5b5015203f0f0a4dd855e514e633abb6b9bbfe9d112b23cddb7b84cd58a45c8&w=1380", price: 0 },
  { id: 4, categoryId: 2, title: "React Native", description: "Build mobile apps with React Native", image: "https://img.freepik.com/premium-photo/react-js-programming-language-with-laptop-code-script-screen_1020200-5413.jpg?w=1800", price: 29.99 },
];

type RouteParams = {
  categoryId: string;
  categoryName: string;
};

export default function CourseDetailsScreen() {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const categoryId = Number(route.params.categoryId);
  const categoryName = decodeURIComponent(route.params.categoryName);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const filteredCourses = courses.filter(course => course.categoryId === categoryId);

  const handleImageClick = (course: any) => {
    setSelectedCourse(course);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{categoryName} Courses</Text>
      {filteredCourses.length === 0 ? (
        <Text style={styles.noCourses}>No courses available.</Text>
      ) : (
        <FlatList
          data={filteredCourses}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={styles.courseCard}>
              <TouchableOpacity onPress={() => handleImageClick(item)}>
                <Image source={{ uri: item.image }} style={styles.courseImage} />
              </TouchableOpacity>
              <View style={styles.overlay}>
                <Text style={styles.courseTitle}>{item.title}</Text>
              </View>
              <View style={styles.footer}>
                <Text style={styles.price}>
                  {item.price === 0 ? "Free" : `$${item.price.toFixed(2)}`}
                </Text>
                {item.price > 0 && (
                  <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buyButtonText}>Buy Now</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        />
      )}

      {/* Modal for Course Description */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedCourse?.title}</Text>
              <Text style={styles.modalDescription}>{selectedCourse?.description}</Text>
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#333",
  },
  noCourses: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  courseCard: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 5,
  },
  courseImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
  },
  overlay: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 8,
    alignItems: "center",
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  footer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#28a745",
  },
  buyButton: {
    backgroundColor: "#9F2B68",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  // Modal Styles
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  modalCloseText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
