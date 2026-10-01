import Avatar from "@components/Avatar";
import Nav from "@components/utilities/Nav";
import EditableTextCard from "@components/EditableTextCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { z } from "zod";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { RootStackParamList } from "@context/types";
import { useTheme } from "@context/ThemeContext";
import { clienteSchema } from "src/schemas/ClienteSchema";
import { createCliente, getCliente, updateCliente } from "@api/apiClientes";
import Toast from "react-native-toast-message";




type Navigation = NativeStackNavigationProp<RootStackParamList>;

type FormData = z.infer<typeof clienteSchema>;

type Route = NativeStackScreenProps<
    RootStackParamList,
    "NovoCliente"
>["route"];

export default function NovoCliente() {
    const navigation = useNavigation<Navigation>();
    const route = useRoute<Route>();
    const { colors } = useTheme();
    const modoInicial = route.params?.modo ?? "criar";
    const clienteId = route.params?.clienteId;
    const [modo, setModo] = useState<
        "criar" | "visualizar" | "editar"
    >(modoInicial);

    const [avatar, setAvatar] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const isCriar = modo === "criar";
    const isVisualizar = modo === "visualizar";
    const isEditar = modo === "editar";

    const {
        control,
        handleSubmit,
        reset,
        formState: {
            errors,
            isDirty,
            isValid,
        },
    } = useForm<FormData>({
        resolver: zodResolver(clienteSchema),
        mode: "onChange",
        defaultValues: {
            tipo: "pf",
            nome: "",
            email: null,
            telefone: null,
            endereco: {
                cep: "",
                logradouro: "",
                numero: "",
                complemento: null,
                bairro: "",
                cidade: "",
                estado: "",
            },

            pf: {
                genero: null,
                rg: "",
                cpf: "",
                data_nascimento: "",
            },

            pj: undefined,
        },
    });
    useEffect(() => {
        if (!clienteId) {
            return;
        }
        if (modo === "criar") {
            return;
        }
        const carregarCliente = async () => {
            try {
                setLoading(true);

                const response = await getCliente(clienteId);
                const cliente = response.data;
                if (cliente.tipo === "pf") {
                    reset({
                        tipo: "pf",
                        nome: cliente.nome,
                        email: cliente.email,
                        telefone: cliente.telefone,
                        endereco: {
                            cep: cliente.endereco?.cep ?? "",
                            logradouro: cliente.endereco?.logradouro ?? "",
                            numero: cliente.endereco?.numero ?? "",
                            complemento: cliente.endereco?.complemento ?? null,
                            bairro: cliente.endereco?.bairro ?? "",
                            cidade: cliente.endereco?.cidade ?? "",
                            estado: cliente.endereco?.estado ?? "",
                        },

                        pf: {
                            genero: cliente.pf?.genero ?? null,
                            rg: cliente.pf?.rg ?? "",
                            cpf: cliente.pf?.cpf ?? "",
                            data_nascimento: cliente.pf?.data_nascimento ?? "",
                        },

                        pj: undefined,
                    });
                } else {
                    reset({
                        tipo: "pj",

                        nome: cliente.nome,
                        email: cliente.email,
                        telefone: cliente.telefone,

                        endereco: {
                            cep: cliente.endereco?.cep ?? "",
                            logradouro: cliente.endereco?.logradouro ?? "",
                            numero: cliente.endereco?.numero ?? "",
                            complemento: cliente.endereco?.complemento ?? null,
                            bairro: cliente.endereco?.bairro ?? "",
                            cidade: cliente.endereco?.cidade ?? "",
                            estado: cliente.endereco?.estado ?? "",
                        },

                        pf: undefined,

                        pj: {
                            cnpj: cliente.pj?.cnpj ?? "",
                            razao_social: cliente.pj?.razao_social ?? "",
                            nome_fantasia: cliente.pj?.nome_fantasia ?? null,
                            nome_responsavel: cliente.pj?.nome_do_responsavel ?? "",
                            cpf_responsavel: cliente.pj?.cpf_responsavel ?? "",
                            cargo_responsavel: cliente.pj?.nome_do_responsavel ?? null,
                        },
                    });
                }

                setAvatar(cliente.avatar_url ?? null);
            } catch (error) {
                Toast.error(
                    "Erro ao carregar cliente:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        carregarCliente();
    }, [clienteId, modo, reset]);
    const onSubmit = async (data: FormData) => {
        if (isVisualizar) {
            return;
        }

        try {
            setSaving(true);
            if (isCriar) {
                await createCliente(data);
                navigation.goBack();
                return;
            }

            if (isEditar && clienteId) {
                await updateCliente(clienteId, data);
                reset(data);
                setModo("visualizar");
            }
        } catch (error) {
            Toast.error(
                "Erro ao salvar cliente:",
                error
            );
        } finally {
            setSaving(false);
        }
    };

    const entrarEmEdicao = () => {
        setModo("editar");
    };

    const isPF = (() => {
        return true;
    })();

    if (loading) {
        return (
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.background,
                        justifyContent: "center",
                        alignItems: "center",
                    },
                ]}
            >
                <ActivityIndicator size="large" />
                <Text
                    style={{ color: colors.text, marginTop: 12, }}>
                    Carregando cliente...
                </Text>
            </View>
        );
    }

    return (
        <View
            style={[
                styles.container, { backgroundColor: colors.background, },]}
        >
            <Nav
                title={
                    isCriar
                        ? "Novo Cliente"
                        : isVisualizar
                            ? "Cliente"
                            : "Editar Cliente"
                }
                subtitle={
                    isPF
                        ? "Pessoa Física"
                        : "Pessoa Jurídica"
                }
                onBackPress={() =>
                    navigation.goBack()
                }
                rightType="menu"
            />

            <KeyboardAvoidingView
                style={styles.flex}
                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : undefined
                }
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.avatarContainer}>
                        <Avatar
                            nome="Cliente"
                            imageUri={avatar}
                            size={120}
                            onImageSelected={
                                isVisualizar
                                    ? () => { }
                                    : setAvatar
                            }
                        />

                        <Text style={[styles.avatarLabel, { color: colors.text, },]}>
                            Foto do cliente
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: colors.text, },]}>
                            Tipo de cliente
                        </Text>

                        <View
                            style={styles.tipoContainer}
                        >
                            <Controller
                                control={control}
                                name="tipo"
                                render={({
                                    field: {
                                        value,
                                        onChange,
                                    },
                                }) => (
                                    <>
                                        <TouchableOpacity
                                            disabled={!isCriar
                                            }
                                            activeOpacity={0.8}
                                            style={[
                                                styles.tipoButton, { backgroundColor: value === "pf" ? "#062046" : colors.surface, },]}
                                            onPress={() => onChange("pf")}
                                        >
                                            <Text
                                                style={[styles.tipoText, { color: value === "pf" ? "#fff" : colors.text, },]}>
                                                Pessoa Física
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            disabled={!isCriar}
                                            activeOpacity={0.8}
                                            style={[styles.tipoButton, { backgroundColor: value === "pj" ? "#062046" : colors.surface, },]}
                                            onPress={() => onChange("pj")}
                                        >
                                            <Text
                                                style={[
                                                    styles.tipoText,
                                                    {
                                                        color:
                                                            value ===
                                                                "pj"
                                                                ? "#fff"
                                                                : colors.text,
                                                    },
                                                ]}
                                            >
                                                Pessoa Jurídica
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            />
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text
                            style={[styles.sectionTitle,{color: colors.text,},]}
                        >
                            Dados principais
                        </Text>

                        <Controller
                            control={control}
                            name="nome"
                            render={({
                                field: {
                                    value,
                                    onChange,
                                },
                            }) => (
                                <EditableTextCard
                                    label="Nome completo"
                                    placeholder="Digite o nome completo"
                                    value={value}
                                    onChangeText={
                                        onChange
                                    }
                                    editable={!isVisualizar}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="email"
                            render={({
                                field: {
                                    value,
                                    onChange,
                                },
                            }) => (
                                <EditableTextCard
                                    label="E-mail"
                                    placeholder="Digite o e-mail"
                                    value={value ?? ""}
                                    onChangeText={
                                        onChange
                                    }
                                    editable={!isVisualizar}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="telefone"
                            render={({
                                field: {
                                    value,
                                    onChange,
                                },
                            }) => (
                                <EditableTextCard
                                    label="Telefone"
                                    placeholder="Digite o telefone"
                                    value={value ?? ""}
                                    tipo="number"
                                    onChangeText={
                                        onChange
                                    }
                                    editable={!isVisualizar}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="pf.cpf"
                            render={({
                                field: {
                                    value,
                                    onChange,
                                },
                            }) => (
                                <EditableTextCard
                                    label="CPF"
                                    placeholder="Digite o CPF"
                                    value={value ?? ""}
                                    tipo="number"
                                    onChangeText={
                                        onChange
                                    }
                                    editable={!isVisualizar}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="pf.rg"
                            render={({
                                field: {
                                    value,
                                    onChange,
                                },
                            }) => (
                                <EditableTextCard
                                    label="RG"
                                    placeholder="Digite o RG"
                                    value={value ?? ""}
                                    tipo="number"
                                    onChangeText={
                                        onChange
                                    }
                                    editable={!isVisualizar}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="pf.data_nascimento"
                            render={({
                                field: {
                                    value,
                                    onChange,
                                },
                            }) => (
                                <EditableTextCard
                                    label="Data de nascimento"
                                    placeholder="DD/MM/AAAA"
                                    value={value ?? ""}
                                    onChangeText={onChange}
                                    editable={!isVisualizar}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="pf.genero"
                            render={({
                                field: {
                                    value,
                                    onChange,
                                },
                            }) => (
                                <EditableTextCard
                                    label="Gênero"
                                    placeholder="Digite o gênero"
                                    value={value ?? ""}
                                    onChangeText={
                                        onChange
                                    } 
                                    editable={!isVisualizar}
                                />
                            )}
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle,{color: colors.text,},]}
                        >
                            Endereço
                        </Text>

                        <Controller
                            control={control}
                            name="endereco.cep"
                            render={({
                                field: {
                                    value,
                                    onChange,
                                },
                            }) => (
                                <EditableTextCard
                                    label="CEP"
                                    placeholder="Digite o CEP"
                                    value={value}
                                    tipo="number"
                                    onChangeText={
                                        onChange
                                    }
                                    editable={!isVisualizar}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="endereco.logradouro"
                            render={({
                                field: {
                                    value,
                                    onChange,
                                },
                            }) => (
                                <EditableTextCard
                                    label="Logradouro"
                                    placeholder="Digite o logradouro"
                                    value={value}
                                    onChangeText={
                                        onChange
                                    }
                                    editable={!isVisualizar }
                                />
                            )}
                        />

                        <View style={styles.row}>
                            <Controller
                                control={control}
                                name="endereco.numero"
                                render={({
                                    field: {
                                        value,
                                        onChange,
                                    },
                                }) => (
                                    <EditableTextCard
                                        label="Número"
                                        placeholder="Número"
                                        value={value}
                                        tipo="number"
                                        width="48%"
                                        onChangeText={
                                            onChange
                                        }
                                        editable={!isVisualizar}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="endereco.bairro"
                                render={({
                                    field: {
                                        value,
                                        onChange,
                                    },
                                }) => (
                                    <EditableTextCard
                                        label="Bairro"
                                        placeholder="Bairro"
                                        value={value}
                                        width="48%"
                                        onChangeText={
                                            onChange
                                        }
                                        editable={!isVisualizar}
                                    />
                                )}
                            />
                        </View>

                        <Controller
                            control={control}
                            name="endereco.cidade"
                            render={({
                                field: {
                                    value,
                                    onChange,
                                },
                            }) => (
                                <EditableTextCard
                                    label="Cidade"
                                    placeholder="Digite a cidade"
                                    value={value}
                                    onChangeText={
                                        onChange
                                    }
                                    editable={
                                        !isVisualizar
                                    }
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="endereco.estado"
                            render={({
                                field: {
                                    value,
                                    onChange,
                                },
                            }) => (
                                <EditableTextCard
                                    label="Estado"
                                    placeholder="UF"
                                    value={value}
                                    onChangeText={
                                        onChange
                                    }
                                    editable={
                                        !isVisualizar
                                    }
                                />
                            )}
                        />
                    </View>


                    {isVisualizar ? (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.saveButton}
                            onPress={
                                entrarEmEdicao
                            }
                        >
                            <Text style={styles.saveButtonText}
                            >
                                Editar cliente
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            disabled={
                                !isDirty ||
                                !isValid ||
                                saving
                            }
                            style={[
                                styles.saveButton,
                                {
                                    opacity:
                                        !isDirty ||
                                            !isValid ||
                                            saving
                                            ? 0.5
                                            : 1,
                                },
                            ]}
                            onPress={handleSubmit(onSubmit)}>
                            {saving ? (<ActivityIndicator color="#fff"
                            />
                            ) : (
                                <Text style={styles.saveButtonText}>
                                    {isCriar ? "Cadastrar cliente" : "Salvar alterações"}
                                </Text>
                            )}
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    flex: {
        flex: 1,
    },

    content: {
        padding: 16,
        paddingBottom: 40,
    },

    avatarContainer: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 25,
    },

    avatarLabel: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: "600",
    },

    section: {
        marginBottom: 15,
    },

    sectionTitle: {
        fontSize: 19,
        fontWeight: "800",
        marginBottom: 5,
    },

    tipoContainer: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 10,
    },

    tipoButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#062046",
    },

    tipoText: {
        fontSize: 15,
        fontWeight: "700",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    saveButton: {
        backgroundColor: "#062046",
        borderRadius: 15,
        paddingVertical: 17,
        alignItems: "center",
        marginTop: 10,
    },

    saveButtonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "800",
    },
});