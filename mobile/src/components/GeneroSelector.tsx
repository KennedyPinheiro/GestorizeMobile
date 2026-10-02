import React from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import ClickableTextCard from "@components/ClickableTextCard";

type Genero = "masculino" | "feminino" | "outro";

type Props = {
    value?: string | null;
    onChange: (value: Genero | null) => void;
};

const opcoes: {
    value: Genero;
    label: string;
}[] = [
        {
            value: "masculino",
            label: "Masculino",
        },
        {
            value: "feminino",
            label: "Feminino",
        },
        {
            value: "outro",
            label: "Outro",
        },
    ];

export default function GeneroSelector({
    value,
    onChange,
}: Props) {
    const [visible, setVisible] = React.useState(false);

    const labelSelecionado =
        opcoes.find((item) => item.value === value)?.label ?? "";

    const selecionar = (genero: Genero) => {
        onChange(genero);
        setVisible(false);
    };

    return (
        <>
            <ClickableTextCard
                label="Gênero"
                value={labelSelecionado}
                placeholder="Selecionar gênero..."
                onPress={() => setVisible(true)}
            />

            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <Pressable
                    style={styles.overlay}
                    onPress={() => setVisible(false)}
                >
                    <Pressable
                        style={styles.modal}
                        onPress={(event) => event.stopPropagation()}
                    >
                        <Text style={styles.title}>
                            Selecionar gênero
                        </Text>

                        <View style={styles.options}>
                            {opcoes.map((opcao, index) => (
                                <React.Fragment key={opcao.value}>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        style={[
                                            styles.option,
                                            value === opcao.value &&
                                            styles.selectedOption,
                                        ]}
                                        onPress={() =>
                                            selecionar(opcao.value)
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                value === opcao.value &&
                                                styles.selectedOptionText,
                                            ]}
                                        >
                                            {opcao.label}
                                        </Text>
                                    </TouchableOpacity>

                                    {index < opcoes.length - 1 && (
                                        <View style={styles.divider} />
                                    )}
                                </React.Fragment>
                            ))}
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    modal: {
        width: "100%",
        maxWidth: 400,
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingTop: 20,
        paddingBottom: 10,
        overflow: "hidden",
    },

    title: {
        fontSize: 20,
        fontWeight: "800",
        color: "#111",
        textAlign: "center",
        marginBottom: 10,
        paddingHorizontal: 20,
    },

    options: {
        width: "100%",
    },

    option: {
        minHeight: 52,
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    selectedOption: {
        backgroundColor: "#062046",
    },

    optionText: {
        fontSize: 16,
        color: "#111",
        fontWeight: "600",
    },

    selectedOptionText: {
        color: "#fff",
    },

    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "#D9D9D9",
        marginHorizontal: 20,
    },
});