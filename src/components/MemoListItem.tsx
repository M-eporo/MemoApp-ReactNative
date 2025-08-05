import { View, Text, StyleSheet } from 'react-native';

const MemoListItem = () => {
  return (
    <View style={styles.memoListItem}>
        <View>
            <Text style={styles.memoListItemTitle}>買い物リスト</Text>
            <Text style={styles.memoListItemDate}>2025年8月10日 10:00</Text>
        </View>
        <View>
            <Text>X</Text>
        </View>
    </View>
  )
}

export default MemoListItem;

const styles = StyleSheet.create({
    memoListItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 19,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.15)",
        backgroundColor: "#fff",
    },
    memoListItemTitle: {
        fontSize: 16,
        lineHeight: 32,
    },
    memoListItemDate: {
        fontSize: 12,
        lineHeight: 16,
        color: "#848484",
    },
});