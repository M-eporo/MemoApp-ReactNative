import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Button from '../../components/Button'
import { Link, router } from 'expo-router'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const handlePress =  (email: string, password: string): void => {

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential.user.uid);
        router.replace("/memo/list");
    })
    .catch((error) => {
        const { code, message } = error;
        Alert.alert(code, message);
    })
    
};

const SignUp = (): React.JSX.Element => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <View style={styles.container}>
            
            <View style={styles.inner}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput 
                    style={styles.input} 
                    value={email} 
                    onChangeText={(text) => setEmail(text)}
                    placeholder='Email address'
                    autoCapitalize="none"
                    keyboardType='email-address'
                />
                <TextInput 
                    style={styles.input} 
                    value={password} 
                    onChangeText={(text) => setPassword(text)}
                    placeholder="password"
                    autoCapitalize="none"
                    secureTextEntry
                />
                <Button label="Submit" onPress={() => handlePress(email, password)}/>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already registered?</Text>
                    <Link href="/auth/log_in" asChild replace>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Log In</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f4f8",
    },
    inner: {
        paddingVertical: 24,
        paddingHorizontal: 27,
    },
    title: {
        marginBottom: 24,
        fontSize: 24,
        lineHeight: 32,
        fontWeight: "bold",
    },
    input: {
        height: 48,
        marginBottom: 16,
        padding: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
        fontSize: 16,

    },
    footer: {
        flexDirection: "row",
    },
    footerText: {
        marginRight: 8,
        fontSize: 14,
        lineHeight: 24,
        color: "#000",
    },
    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        color: "#467fd3"
    }
})

export default SignUp;
