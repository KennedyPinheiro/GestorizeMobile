import ClickableTextCard from "@components/ClickableTextCard";
import { Opcao } from "@context/types";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type SelectorProps = {
    label: string;
    placeholder: string;
    value?: string | null;
    options: Opcao[];
    onChange: (value: string) => void;
    disabled?: boolean;

    showAddButton?: boolean;
    onAdd?: () => void;
};

export default function Selector({
    label,
    placeholder,
    value,
    options,
    onChange,
    disabled = false,
    showAddButton = false,
    onAdd,
}: SelectorProps) {
    const [visible, setVisible] = useState(false);

    const labelSelecionado =
        options.find((item) => item.id === value)?.nome ?? "";

    const selecionar = (id: string) => {
        onChange(id);
        setVisible(false);
    };

    const adicionar = () => {
        setVisible(false);
        onAdd?.();
    };

    return (
        <>
            <ClickableTextCard
                label={label}
                value={labelSelecionado}
                placeholder={placeholder}
                onPress={() => {
                    if (!disabled) {
                        setVisible(true);
                    }
                }}
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
                        <View style={styles.header}>
                            <Text style={styles.title}>
                                {label}
                            </Text>

                            {showAddButton && onAdd && (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={styles.addButton}
                                    onPress={adicionar}
                                >
                                    <Ionicons
                                        name="add"
                                        size={22}
                                        color="#062046"
                                    />
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.options}>
                            {options.map((opcao, index) => {
                                const selecionado = value === opcao.id;

                                return (
                                    <View key={opcao.id}>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            style={[
                                                styles.option,
                                                selecionado &&
                                                styles.selectedOption,
                                            ]}
                                            onPress={() =>
                                                selecionar(opcao.id)
                                            }
                                        >
                                            <Text
                                                style={[
                                                    styles.optionText,
                                                    selecionado &&
                                                    styles.selectedOptionText,
                                                ]}
                                            >
                                                {opcao.nome}
                                            </Text>
                                        </TouchableOpacity>

                                        {index < options.length - 1 && (
                                            <View
                                                style={styles.divider}
                                            />
                                        )}
                                    </View>
                                );
                            })}

                            {options.length === 0 && (
                                <View style={styles.empty}>
                                    <Text style={styles.emptyText}>
                                        Nenhuma opção disponível.
                                    </Text>
                                </View>
                            )}
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
        overflow: "hidden",
    },

    header: {
        minHeight: 68,
        backgroundColor: "#062046",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
    },

    title: {
        flex: 1,
        fontSize: 21,
        fontWeight: "500",
        color: "#fff",
        textAlign: "center",
    },

    addButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
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

    empty: {
        minHeight: 70,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },

    emptyText: {
        fontSize: 15,
        color: "#777",
    },
});