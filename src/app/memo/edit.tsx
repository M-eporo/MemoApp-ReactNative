import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import CircleButton from '../../components/CircleButton';
import Icon from '../../components/Icon';
import { router, useLocalSearchParams } from 'expo-router';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useEffect, useState } from 'react';
import KeyboardAvoidingView from '../../components/KeyboardAvoidingView';

const handlePress = (id: string, bodyText: string): void => {
    if(auth.currentUser === null) return;
    const ref = doc(db, `users/${auth.currentUser.uid}/memos/`, id);
    setDoc(ref, {
        bodyText,
        updatedAt: Timestamp.fromDate(new Date())
    })
    .then(() => {
        router.back();
    })
    .catch(error => {
        console.log(error);
        Alert.alert("Error", "Failed to save memo.");
    })
}

const Edit = ():React.JSX.Element => {
    const id = String(useLocalSearchParams().id);
    const [bodyText, setBodyText] = useState("");
    useEffect(() => {
        if(auth.currentUser === null) return;
        const ref = doc(db, `users/${auth.currentUser.uid}/memos/`, id);
        getDoc(ref)
        .then((docRef) => {
            console.log(docRef.data());
            const storedBodyText = docRef.data()?.bodyText;
            setBodyText(storedBodyText);
        })
        .catch((error) => {
            console.log(error);
        })
    },[])
    
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input} 
                    multiline 
                    value={bodyText}
                    onChangeText={(text) => setBodyText(text)}
                    autoFocus
                />
            </View>
            <CircleButton onPress={() => handlePress(id, bodyText)}>
                <Icon name="check" size={28} color="#fff" />
            </CircleButton>
        </KeyboardAvoidingView>
    )
}

export default Edit;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputContainer: {
        flex: 1,
        paddingVertical: 32,
    },
    input: {
        flex: 1,
        paddingHorizontal: 27,
        textAlignVertical: "top",
        fontSize: 16,
        lineHeight: 24,
    }
})