import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { Link } from 'expo-router';
import { Memo } from '../../types/Memo';

type Props = {
    memo: Memo;
}

const MemoListItem = ({ memo }: Props): React.JSX.Element => {
    const { bodyText, updatedAt, createdAt } = memo;
    //if(bodyText === null || updatedAt === null || createdAt === null) return null;
    const dateString = memo.updatedAt.toDate()
    const formattedDate = new Intl.DateTimeFormat('ja-JP', {
        timeZone: "Asia/Tokyo",
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(dateString);
    return (
        <Link 
            href={{ pathname: "memo/detail", params: { id: memo.id } }} 
            asChild
        >
            <TouchableOpacity style={styles.memoListItem}>
                <TouchableOpacity>
                    <Text numberOfLines={1} style={styles.memoListItemTitle}>{memo.bodyText}</Text>
                    <Text style={styles.memoListItemDate}>{formattedDate}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="x" size={24} color="#b0b0b0" />
                </TouchableOpacity>
            </TouchableOpacity>
        </Link>
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