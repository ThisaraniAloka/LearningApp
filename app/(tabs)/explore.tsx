import React, { useState } from "react";
import {
  View, Text, TextInput, FlatList, TouchableOpacity, ScrollView, StyleSheet
} from "react-native";


// Define a type for the course
interface Course {
  id: string;
  title: string;
  category: string;
  instructor: string;
  rating: number;
  price: string;
  isNew: boolean;
  isTrending: boolean;
  discount: string | null;
}

const courses: Course[] = [
  { id: "1", title: "UI/UX Design Basics", category: "UI Design", instructor: "John Doe", rating: 4.5, price: "$49", isNew: true, isTrending: true, discount: null },
  { id: "2", title: "Full-Stack JavaScript", category: "Programming", instructor: "Jane Smith", rating: 4.7, price: "$99", isNew: false, isTrending: true, discount: "$79" },
  { id: "3", title: "Marketing for Beginners", category: "Marketing", instructor: "Emily Davis", rating: 4.3, price: "Free", isNew: true, isTrending: false, discount: null },
  { id: "4", title: "Photography Masterclass", category: "Photography", instructor: "Michael Brown", rating: 4.6, price: "$79", isNew: false, isTrending: true, discount: "$59" },
  { id: "5", title: "Business Management", category: "Business", instructor: "Sarah Wilson", rating: 4.4, price: "$59", isNew: true, isTrending: false, discount: null },
];

const categories = ["All", "UI Design", "Programming", "Marketing", "Photography", "Business"];

export default function ExploreScreen() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Popularity");

  // Filter Courses
  const filteredCourses = courses
    .filter(course => (selectedCategory === "All" || course.category === selectedCategory))
    .filter(course => course.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "Price") {
        return parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", ""));
      } else if (sortOption === "Popularity") {
        return b.rating - a.rating;
      }
      return 0;
    });

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search courses..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Category Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryButton, selectedCategory === category && styles.activeCategory]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sorting Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortText}>Sort by:</Text>
        <TouchableOpacity onPress={() => setSortOption("Popularity")} style={styles.sortButton}>
          <Text style={sortOption === "Popularity" ? styles.activeSort : styles.sortButtonText}>Popularity</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortOption("Price")} style={styles.sortButton}>
          <Text style={sortOption === "Price" ? styles.activeSort : styles.sortButtonText}>Price</Text>
        </TouchableOpacity>
      </View>

      {/* Featured & Trending Courses */}
      <Text style={styles.sectionTitle}>🔥 Trending Courses</Text>
      <FlatList
  horizontal
  data={courses.filter(course => course.isTrending)}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <CourseCard course={item} />}
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{ paddingHorizontal: 10, gap: 12 }} // Adds spacing
/>


      <Text style={styles.sectionTitle}>🆕 Newly Added</Text>
      <FlatList
        horizontal
        data={courses.filter(course => course.isNew)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseCard course={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10, gap: 12 }}
      />

      <Text style={styles.sectionTitle}>📚 All Courses</Text>
      {filteredCourses.map(course => <CourseCard key={course.id} course={course} />)}

    </ScrollView>
  );
}

// Course Card Component with TypeScript Typing
interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => (
  <TouchableOpacity style={styles.courseCard}>
    <Text style={styles.courseTitle}>{course.title}</Text>
    <Text style={styles.courseCategory}>{course.category}</Text>
    <Text style={styles.courseInstructor}>Instructor: {course.instructor}</Text>
    <Text style={styles.courseRating}>⭐ {course.rating}</Text>
    <Text style={[styles.coursePrice, course.discount && styles.discountedPrice]}>
      {course.discount ? <Text style={styles.oldPrice}>{course.price} </Text> : null} {course.discount || course.price}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8F9FA",
  },
  searchInput: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  categoryButton: {
    backgroundColor: "#E0E0E0",
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  activeCategory: {
    backgroundColor: "#9F2B68",
  },
  categoryText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sortText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  sortButton: {
    marginLeft: 10,
  },
  sortButtonText: {
    fontSize: 14,
    color: "#555",
  },
  activeSort: {
    fontSize: 14,
    color: "#9F2B68",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
  },
  courseCard: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 14,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  courseCategory: {
    fontSize: 14,
    color: "#555",
  },
  courseInstructor: {
    fontSize: 12,
    color: "#777",
  },
  courseRating: {
    fontSize: 14,
    color: "#f1c40f",
  },
  coursePrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#27ae60",
  },
  discountedPrice: {
    color: "#e74c3c",
  },
  oldPrice: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
