import ClickableTextCard from "@components/ClickableTextCard";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useState } from "react";

import { Opcao } from "@context/types";

type ProdutoSelectorProps = {
    label: string;
    placeholder: string;
    value?: string | null;
    options: Opcao[];
    onChange: (value: string) => void;
    disabled?: boolean;

    showAddButton?: boolean;
    onAdd?: () => void;
};

export function ProdutoSelector({
    label,
    placeholder,
    value,
    options,
    onChange,
    disabled = false,
    showAddButton = false,
    onAdd,
}: ProdutoSelectorProps) {
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
                    style={styles.selectorOverlay}
                    onPress={() => setVisible(false)}
                >
                    <Pressable
                        style={styles.selectorModal}
                        onPress={(event) => event.stopPropagation()}
                    >
                        {/* CABEÇALHO */}
                        <View style={styles.selectorHeader}>
                            <Text style={styles.selectorTitle}>
                                {label}
                            </Text>

                            {showAddButton && onAdd && (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={styles.addButton}
                                    onPress={adicionar}
                                >
                                    <Text style={styles.addButtonIcon}>
                                        +
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* OPÇÕES */}
                        <View style={styles.selectorOptions}>
                            {options.map((opcao, index) => (
                                <View key={opcao.id}>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        style={[
                                            styles.selectorOption,
                                            value === opcao.id &&
                                                styles.selectorSelectedOption,
                                        ]}
                                        onPress={() =>
                                            selecionar(opcao.id)
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.selectorOptionText,
                                                value === opcao.id &&
                                                    styles.selectorSelectedOptionText,
                                            ]}
                                        >
                                            {opcao.nome}
                                        </Text>
                                    </TouchableOpacity>

                                    {index < options.length - 1 && (
                                        <View
                                            style={styles.selectorDivider}
                                        />
                                    )}
                                </View>
                            ))}

                            {options.length === 0 && (
                                <View style={styles.emptyOptions}>
                                    <Text style={styles.emptyOptionsText}>
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
    selectorOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    selectorModal: {
        width: "100%",
        maxWidth: 400,
        backgroundColor: "#fff",
        borderRadius: 20,
        overflow: "hidden",
    },

    // ─────────────────────────────────────────────
    // CABEÇALHO
    // ─────────────────────────────────────────────

    selectorHeader: {
        minHeight: 110,
        backgroundColor: "#062046",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        paddingVertical: 20,
    },

    selectorTitle: {
        flex: 1,
        fontSize: 32,
        fontWeight: "400",
        color: "#fff",
        textAlign: "center",
    },

    addButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 15,
    },

    addButtonIcon: {
        fontSize: 58,
        lineHeight: 60,
        fontWeight: "300",
        color: "#062046",
        marginTop: -5,
    },

    selectorOptions: {
        width: "100%",
    },

    selectorOption: {
        minHeight: 52,
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    selectorSelectedOption: {
        backgroundColor: "#062046",
    },

    selectorOptionText: {
        fontSize: 16,
        color: "#111",
        fontWeight: "600",
    },

    selectorSelectedOptionText: {
        color: "#fff",
    },

    selectorDivider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "#D9D9D9",
        marginHorizontal: 20,
    },

    emptyOptions: {
        minHeight: 70,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },

    emptyOptionsText: {
        fontSize: 15,
        color: "#777",
    },
});