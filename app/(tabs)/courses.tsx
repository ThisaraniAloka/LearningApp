import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

const ongoingCourses = [
  { id: 1, name: "React Native Basics", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7HEr6fykbgN_GnedAp8PnRmCSGi96QBnqkA&s" },
  { id: 2, name: "Advanced JavaScript", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjplyu-rILMIaKhSihUMbqrTTXseXvpJnJ_A&s" },
  { id: 3, name: "Full-Stack Web Development", image: "https://www.webstackacademy.com/wp-content/uploads/2023/11/001_developer__his_portfolio-2-1.jpg" },
  { id: 4, name: "Data Structure & Algorithms", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-vVdQaLMbCkg2kraEfpUHiB9R817VcqgLBA&s" }
];

const completedCourses = [
  { id: 1, name: "UI Design Fundamentals", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZ9NyKTIctY5t62viXxBcZAMsy8G3PLu-Bw&s" },
  { id: 2, name: "Intro to Python", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDTSr6GGbEzNjnGcmB3nqtwLXoNEFhBqvv9g&s" },
];


const upcomingTasks = [
  { id: 1, task: "Complete JavaScript Practice", icon: "tasks" },
  { id: 2, task: "Review React Native Documentation", icon: "book" },
  { id: 3, task: "Attend Coding Bootcamp", icon: "calendar" }
];

export default function CoursesScreen() {
  const [selectedCategory, setSelectedCategory] = useState("ongoing");

  const renderCourses = (courses: { id: number; name: string; image: string }[]) => (
    <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContainer}>
      {courses.map((item) => (
        <View style={styles.courseItem} key={item.id}>
          <Image source={{ uri: item.image }} style={styles.courseImage} />
          <Text style={styles.courseText}>{item.name}</Text>
        </View>
      ))}
    </ScrollView>
  );

  const renderUpcomingTasks = () => (
    <View style={styles.tasksContainer}>
      {upcomingTasks.map((task) => (
        <View style={styles.taskItem} key={task.id}>
          <FontAwesome name={task.icon as any} size={24} color="#007bff" />
          <Text style={styles.taskText}>{task.task}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Courses</Text>
      {/* Category Selection Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedCategory === "ongoing" && styles.activeButton,
          ]}
          onPress={() => setSelectedCategory("ongoing")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedCategory === "ongoing" && styles.activeButtonText,
            ]}
          >
            Ongoing
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedCategory === "completed" && styles.activeButton,
          ]}
          onPress={() => setSelectedCategory("completed")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedCategory === "completed" && styles.activeButtonText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Course List */}
      <View style={styles.courseList}>
        {selectedCategory === "ongoing"
          ? renderCourses(ongoingCourses)
          : renderCourses(completedCourses)}
      </View>
      <View style={styles.upcomingTasksContainer}>
        <Text style={styles.tasksTitle}>Upcoming Tasks</Text>
        {renderUpcomingTasks()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: "#ddd",
  },
  activeButton: {
    backgroundColor: "#9F2B68",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  activeButtonText: {
    color: "#fff",
  },
  courseList: {
    flex: 1,
  },
  scrollViewContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  courseItem: {
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    height: 200,
    justifyContent:'center',
    width: 200,
  },
  courseText: {
    fontSize: 16,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  courseImage: {
    width: 110,
    height: 110,
    marginBottom: 10,
  },
  tasksTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  tasksContainer: {
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  taskText: {
    fontSize: 16,
    marginLeft: 10,
  },
  upcomingTasksContainer: {
    marginTop: 30,
    paddingBottom: 20,
  },
});
