import { Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
    label: string;
    onPress?: () => void;
}

const Button = ({ label, onPress }: Props) => {
  return (
    <TouchableOpacity 
        style={styles.button}
        onPress={onPress}
    >
        <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        alignSelf: "flex-start",
        marginBottom: 24,
        borderRadius: 4,
        backgroundColor: "#467fd3",
    },
    buttonLabel: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        fontSize: 16,
        lineHeight: 32,
        color: "#fff",
    }
})

export default Button;

