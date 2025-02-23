import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerShadowVisible: false, 
        headerTitle: "",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
          title: "Explore",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="book" size={24} color={color} />,
          title: "Courses",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
          title: "Profile",
          headerShown: false,
        }}
      />
    </Tabs>
    
  );
}
