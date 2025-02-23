import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image  } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function LoginScreen() {
  const router= useRouter();
  return (
    <View style={styles.container}>
      <Image source={{uri: 'https://cdn.pixabay.com/photo/2024/05/18/15/30/laptop-8770486_1280.png'}} style={styles.logo }/>
      <Text style={styles.title}>login</Text>
      <TextInput style={styles.input} placeholder='UserName' keyboardType='default' />
      <TextInput style={styles.input} placeholder='Password' secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/courses')}>
        <Text style={styles.buttonText}> LOGIN </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.push('/auth/register')}>
        <Text style={styles.registerText}>Don't have an account? Register here</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f4"
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: "#9F2B68",
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  registerText: {
    color: '#AA336A',
    fontSize: 16,
    fontWeight: '500',
    marginTop:10,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
})