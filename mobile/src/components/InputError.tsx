import { StyleSheet, Text } from "react-native";

type InputErrorProps = {
    message?: string;
};

export const InputError = ({ message }: InputErrorProps) => {
    if (!message) {
        return null;
    }

    return (
        <Text style={styles.inputError}>
            {message}
        </Text>
    );
};

const styles = StyleSheet.create({
    inputError: {
        color: "#D32F2F",
        fontSize: 12,
        fontWeight: "500",
        marginTop: 4,
        marginLeft: 4,
    },
});