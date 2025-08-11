import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';

type Props = {
    children: React.ReactNode;
    style?: ViewStyle;
    onPress?: () => void;
}

const CircleButton = ({ children, style, onPress }: Props) => {
  return (
    <TouchableOpacity 
        style={[styles.circleButton, style]}
        onPress={onPress}
    >
        <Text style={styles.circleButtonLabel}>{children}</Text>
    </TouchableOpacity>
  );
};

export default CircleButton;

const styles = StyleSheet.create({
    circleButton: {
        position: "absolute",
        right: 40,
        bottom: 40,
        width: 64,
        height: 64,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 64,
        backgroundColor: "#467FD3",
        // iOS shadow
        shadowColor: "#000000",
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: {width: 0, height: 8},
        // Android shadow
        elevation: 8,
    },
    circleButtonLabel: {
        color: "#fff",
        fontSize: 40,
        lineHeight: 48,
    }
});