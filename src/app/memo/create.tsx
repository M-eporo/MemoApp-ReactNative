import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Alert } from 'react-native'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { router } from 'expo-router'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import KeyboardAvoidingView from '../../components/KeyboardAvoidingView'

const handlePress = (bodyText: string) => {
    if(auth.currentUser === null) return;
    const collectionRef = collection(db, `users/${auth.currentUser?.uid}/memos`)
    addDoc(collectionRef, {
        bodyText,
        updatedAt: Timestamp.fromDate(new Date()),
        createdAt: Timestamp.now()
    })
    .then((docRef) => {
        console.log("Memo created successfully", docRef.id);
    })
    .catch((error) => {
        console.error("Error creating memo: ", error);
        Alert.alert("Memo creation failed", error.message);
    })
    router.back();
}

const Create = (): React.JSX.Element => {
    const [bodyText, setBodyText] = useState("");
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput 
                    multiline
                    autoFocus
                    placeholder="メモを入力"
                    style={styles.input} 
                    value={bodyText}
                    onChangeText={(text) => setBodyText(text)}
                />
            </View>
            <CircleButton onPress={() => handlePress(bodyText)}>
                <Icon name="check" size={28} color="#red" />
            </CircleButton>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputContainer: {
        flex: 1,
        paddingVertical: 32,
        paddingHorizontal: 27,
    },
    input: {
        flex: 1,
        textAlignVertical: "top",
        fontSize: 16,
        lineHeight: 24,
    }
})

export default Create;