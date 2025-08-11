import { signOut } from 'firebase/auth'
import React from 'react'
import { Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { auth } from '../firebase'
import { router } from 'expo-router';

const handlePress = () => {
  signOut(auth)
  .then(() => {
    router.replace("/auth/log_in");
  })
  .catch(() => {
    Alert.alert("ログアウトに失敗しました。");
  })
}

const LogOutButton = () => {
  return (
    <TouchableOpacity onPress={handlePress}>
        <Text style={styles.text}>ログアウト</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        lineHeight: 24,
        color: "rgba(255,255,255,0.7)"
    }
    
})
export default LogOutButton