import { JSX, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MemoListItem from '../../components/MemoListItem';
import CircleButton from '../../components/CircleButton';
import Icon from '../../components/Icon';
import { router, useNavigation } from 'expo-router';
import LogOutButton from '../../components/LogOutButton';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { Memo } from '../../../types/Memo';



const handlePress = () => {
  router.push("memo/create");
}

const List = ():JSX.Element => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const navigation = useNavigation();
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton/>
    });
  }, []);

  useEffect(() => {
    if(!uid) return;
    const ref = collection(db, `users/${auth.currentUser?.uid}/memos`);
    const q = query(ref, orderBy("updatedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapShot) => {
      const storedMemos: Memo[] = snapShot.docs.map((doc) => {
        const { bodyText, updatedAt, createdAt } = doc.data();
        return {
          id:doc.id,
          bodyText,
          updatedAt,
          createdAt
        }
      });
      setMemos(storedMemos);
    })
    return () => unsubscribe();
  }, []);
  
  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={({ item }) =>  <MemoListItem memo={item} />}
      >
      </FlatList>
      <CircleButton onPress={handlePress}>
        <Icon name="plus" size={36} color="#fff" />
      </CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  
  
});

export default List;