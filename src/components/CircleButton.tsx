import { View, Text, StyleSheet } from 'react-native';

type Props = {
    children: string;
}

const CircleButton = ({ children }: Props) => {
  return (
    <View style={styles.circleButton}>
        <Text style={styles.circleButtonLabel}>{children}</Text>
    </View>
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