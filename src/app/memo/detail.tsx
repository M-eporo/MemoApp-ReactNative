import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CircleButton from '../../components/CircleButton';
import Icon from '../../components/Icon';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Memo } from '../../../types/Memo';
import { auth, db } from '../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const handlePress = (id: string): void => {
    router.push({ pathname: "/memo/edit", params: { id: id } });
};

const Detail = () => {
    const { id } = useLocalSearchParams();
    const [memo, setMemo] = useState<Memo | null>(null);

    useEffect(() => {
        if(!auth.currentUser === null) return;
        const ref = doc(db, `users/${auth.currentUser?.uid}/memos/`, String(id));
        const unsubscribe = onSnapshot(ref,(memoDoc) => {
            const { bodyText, updatedAt, createdAt } = memoDoc.data() as Memo;
            setMemo({
                id: memoDoc.id,
                bodyText,
                updatedAt,
                createdAt,
            })
        });
        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.memoHeader}>
                <Text style={styles.memoTitle} numberOfLines={1}>{memo?.bodyText}</Text>
                <Text style={styles.memoDate}>{memo?.updatedAt?.toDate().toLocaleString("ja-JP")}</Text>
            </View>
            <ScrollView style={styles.memoBody}>
                <Text style={styles.memoBodyText}>
                    {memo?.bodyText}
                </Text>
            </ScrollView>
            <CircleButton style={{ top: 60, bottom: "auto" }} onPress={() => handlePress(id as string)}>
                <Icon name="pencile" size={40} color="#fff" />
            </CircleButton>
        </View>
    )
}

export default Detail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    memoHeader: {
        height: 96,
        justifyContent: "center",
        paddingVertical: 24,
        paddingHorizontal: 19,
        backgroundColor: "#467FD3",
    },
    memoTitle: {
        color: "#fff",
        fontSize: 20,
        lineHeight: 32,
        fontWeight: "bold",
    },
    memoDate: {
        color: "#fff",
        fontSize: 12,
        lineHeight: 16
    },
    memoBody: {
        
        paddingHorizontal: 27
    },
    memoBodyText: {
        paddingVertical: 32,
        fontSize: 16,
        lineHeight: 24,
        color: "#000",
    }
})