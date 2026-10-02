import Avatar from "@components/Avatar";
import Nav from "@components/utilities/Nav";
import EditableTextCard from "@components/EditableTextCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { z } from "zod";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { RootStackParamList } from "@context/types";
import { useTheme } from "@context/ThemeContext";
import { clienteSchema } from "src/schemas/ClienteSchema";
import { createCliente, deleteCliente, getCliente, updateCliente } from "@api/apiClientes";
import Toast from "react-native-toast-message";
import DialogConfirmarAcao from "@components/dialogs/DialogConfirmarAcao";
import { clearNumber, dateFromApi, dateToApi, formatCep, formatCnpj, formatCpf, formatDate, formatRg, formatTelefone } from "@core/utils/format";

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
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const modo = route.params?.modo ?? "criar";
    const clienteId = route.params?.clienteId;
    const isCriar = modo === "criar";
    const isEditar = modo === "editar";

    const {
        control,
        watch,
        handleSubmit,
        reset,
        formState: {
            isDirty,
            isValid,
        }, } = useForm<FormData>({
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

                pj: [],
            },
        });


    const handleDelete = () => {
        if (!clienteId) return;

        setShowDeleteDialog(true);
    };
    const confirmarExclusao = async () => {
        if (!clienteId) return;
        try {
            setSaving(true);
            await deleteCliente(clienteId);
            Toast.show({
                type: "success",
                text1: "Cliente excluído",
                text2: "O cliente foi removido com sucesso.",
            });

            navigation.goBack();
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Erro ao excluir",
                text2: "Não foi possível excluir o cliente.",
            });
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        if (modo === "criar") {
            return;
        }

        if (!clienteId) {
            Toast.error("Cliente não informado");
            navigation.goBack();
            return;
        }

        const carregarCliente = async () => {
            try {
                setLoading(true);

                const response = await getCliente(clienteId);
                const cliente = response.data;

                const dados: FormData =
                    cliente.tipo === "pf"
                        ? {
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
                                data_nascimento: dateFromApi(
                                    cliente.pf?.data_nascimento ?? ""
                                ),
                            },

                            pj: [],
                        }
                        : {
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

                            pf: [],

                            pj: {
                                cnpj: cliente.pj?.cnpj ?? "",
                                razao_social: cliente.pj?.razao_social ?? "",
                                nome_fantasia: cliente.pj?.nome_fantasia ?? null,
                                nome_responsavel: cliente.pj?.nome_responsavel ?? "",
                                cpf_responsavel: cliente.pj?.cpf_responsavel ?? "",
                                cargo_responsavel: cliente.pj?.cargo_responsavel ?? null,
                            },
                        };

                reset(dados);
                setAvatar(cliente.avatar_url ?? null);
            } catch (error) {
                Toast.error("Erro ao carregar cliente");
            } finally {
                setLoading(false);
            }
        };

        carregarCliente();
    }, [clienteId, modo, reset, navigation]);
    const onSubmit = async (data: FormData) => {
        if (!isDirty) {
            return;
        }

        try {
            setSaving(true);

            if (isCriar) {
                const payload: FormData =
                    data.tipo === "pf"
                        ? {
                            tipo: "pf",
                            nome: data.nome,
                            email: data.email,
                            telefone: data.telefone
                                ? clearNumber(data.telefone)
                                : null,

                            endereco: {
                                ...data.endereco,
                                cep: clearNumber(data.endereco.cep),
                            },

                            pf: {
                                ...data.pf,
                                cpf: clearNumber(data.pf.cpf),
                                rg: clearNumber(data.pf.rg),
                                data_nascimento: dateToApi(
                                    data.pf.data_nascimento
                                ),
                            },

                            pj: [],
                        }
                        : {
                            tipo: "pj",
                            nome: data.nome,
                            email: data.email,
                            telefone: data.telefone
                                ? clearNumber(data.telefone)
                                : null,

                            endereco: {
                                ...data.endereco,
                                cep: clearNumber(data.endereco.cep),
                            },

                            pf: [],

                            pj: {
                                ...data.pj,
                                cnpj: clearNumber(data.pj.cnpj),
                                cpf_responsavel: clearNumber(
                                    data.pj.cpf_responsavel
                                ),
                            },
                        };

                await createCliente(payload);

                Toast.show({
                    type: "success",
                    text1: "Cliente cadastrado",
                    text2: "O cliente foi cadastrado com sucesso.",
                });

                navigation.goBack();
                return;
            }

            if (isEditar && clienteId) {
                const payload: FormData =
                    data.tipo === "pf"
                        ? {
                            tipo: "pf",
                            nome: data.nome,
                            email: data.email,
                            telefone: data.telefone
                                ? clearNumber(data.telefone)
                                : null,

                            endereco: {
                                ...data.endereco,
                                cep: clearNumber(data.endereco.cep),
                            },

                            pf: {
                                ...data.pf,
                                cpf: clearNumber(data.pf.cpf),
                                rg: clearNumber(data.pf.rg),
                                data_nascimento: dateToApi(
                                    data.pf.data_nascimento
                                ),
                            },

                            pj: [],
                        }
                        : {
                            tipo: "pj",
                            nome: data.nome,
                            email: data.email,
                            telefone: data.telefone
                                ? clearNumber(data.telefone)
                                : null,

                            endereco: {
                                ...data.endereco,
                                cep: clearNumber(data.endereco.cep),
                            },

                            pf: [],

                            pj: {
                                ...data.pj,
                                cnpj: clearNumber(data.pj.cnpj),
                                cpf_responsavel: clearNumber(
                                    data.pj.cpf_responsavel
                                ),
                            },
                        };

                const response = await updateCliente(
                    clienteId,
                    payload
                );

                reset(data);

                Toast.show({
                    type: "success",
                    text1: "Cliente atualizado",
                    text2:
                        response.message ??
                        "Alterações salvas com sucesso.",
                });
            }
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Erro ao salvar cliente",
                text2:
                    error?.response?.data?.message ??
                    "Não foi possível salvar as alterações.",
            });
        } finally {
            setSaving(false);
        }
    };
    const tipoCliente = watch("tipo");
    const isPF = tipoCliente === "pf";


    if (loading) {
        return (
            <View
                style={[styles.container, { backgroundColor: colors.background, justifyContent: "center", alignItems: "center", },]}>
                <ActivityIndicator size="large" />
                <Text style={{ color: colors.text, marginTop: 12, }}>
                    Carregando cliente...
                </Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background, },]}>
            <Nav
                title={isCriar ? "Novo Cliente" : "Editar Cliente"}
                subtitle={isPF ? "Pessoa Física" : "Pessoa Jurídica"}
                onBackPress={() => navigation.goBack()}
                rightType="menu"
            />

            <KeyboardAwareScrollView
                style={styles.flex}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid
                enableAutomaticScroll
                extraScrollHeight={50}
            >
                <View style={styles.avatarContainer}>
                    <Avatar
                        nome={watch("nome") || "Cliente"}
                        imageUri={avatar}
                        size={120}
                        editable={true}
                        onImageSelected={setAvatar}
                    />

                    <Text style={[styles.avatarLabel, { color: colors.text },]}>
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
                                        disabled={!isCriar}
                                        activeOpacity={0.8}
                                        style={[styles.tipoButton, { backgroundColor: value === "pf" ? "#062046" : colors.surface, },]}
                                        onPress={() => onChange("pf")}
                                    >
                                        <Text style={[styles.tipoText, { color: value === "pf" ? "#fff" : colors.text, },]}>
                                            Pessoa Física
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        disabled={!isCriar}
                                        activeOpacity={0.8}
                                        style={[styles.tipoButton, { backgroundColor: value === "pj" ? "#062046" : colors.surface, },]}
                                        onPress={() => onChange("pj")}
                                    >
                                        <Text style={[styles.tipoText, { color: value === "pj" ? "#fff" : colors.text, },]}
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
                    <Text style={[styles.sectionTitle, { color: colors.text, },]}
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
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="telefone"
                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <EditableTextCard
                                label="Telefone"
                                value={formatTelefone(value ?? "")}
                                editable={true}
                                onChangeText={(text) => {
                                    onChange(formatTelefone(text));
                                }}
                            />
                        )}
                    />
                    {isPF ? (
                        <>
                            <Controller
                                control={control}
                                name="pf.cpf"
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <EditableTextCard
                                        label="CPF"
                                        value={formatCpf(value ?? "")}
                                        editable={true}
                                        onChangeText={(text) => {
                                            onChange(formatCpf(text));
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="pf.rg"
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <EditableTextCard
                                        label="RG"
                                        value={formatRg(value ?? "")}
                                        editable={true}
                                        onChangeText={(text) => {
                                            onChange(formatRg(text));
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="pf.data_nascimento"
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <EditableTextCard
                                        label="Data de nascimento"
                                        value={formatDate(value ?? "")}
                                        editable={true}
                                        onChangeText={(text) => {
                                            onChange(formatDate(text));
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="pf.genero"
                                render={({ field: { value, onChange } }) => (
                                    <EditableTextCard
                                        label="Gênero"
                                        placeholder="Digite o gênero"
                                        value={value ?? ""}
                                        onChangeText={onChange}
                                        editable={true}
                                    />
                                )}
                            />
                        </>
                    ) : (
                        <>
                            <Controller
                                control={control}
                                name="pj.cnpj"
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <EditableTextCard
                                        label="CNPJ"
                                        value={formatCnpj(value ?? "")}
                                        editable={true}
                                        onChangeText={(text) => {
                                            onChange(formatCnpj(text));
                                        }}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="pj.razao_social"
                                render={({ field: { value, onChange } }) => (
                                    <EditableTextCard
                                        label="Razão social"
                                        placeholder="Digite a razão social"
                                        value={value ?? ""}
                                        onChangeText={onChange}
                                        editable={true}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="pj.nome_fantasia"
                                render={({ field: { value, onChange } }) => (
                                    <EditableTextCard
                                        label="Nome fantasia"
                                        placeholder="Digite o nome fantasia"
                                        value={value ?? ""}
                                        onChangeText={onChange}
                                        editable={true}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="pj.nome_responsavel"
                                render={({ field: { value, onChange } }) => (
                                    <EditableTextCard
                                        label="Nome do responsável"
                                        placeholder="Digite o nome do responsável"
                                        value={value ?? ""}
                                        onChangeText={onChange}
                                        editable={true}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="pj.cpf_responsavel"
                                render={({ field: { value, onChange } }) => (
                                    <EditableTextCard
                                        label="CPF do responsável"
                                        placeholder="Digite o CPF do responsável"
                                        value={formatCpf(value ?? "")}
                                        tipo="number"
                                        onChangeText={(text) => {
                                            onChange(formatCpf(text));
                                        }}
                                        editable={true}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="pj.cargo_responsavel"
                                render={({ field: { value, onChange } }) => (
                                    <EditableTextCard
                                        label="Cargo do responsável"
                                        placeholder="Digite o cargo"
                                        value={value ?? ""}
                                        onChangeText={onChange}
                                        editable={true}
                                    />
                                )}
                            />
                        </>
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text, },]}
                    >
                        Endereço
                    </Text>

                    <Controller
                        control={control}
                        name="endereco.cep"
                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <EditableTextCard
                                label="CEP"
                                value={formatCep(value ?? "")}
                                editable={true}
                                onChangeText={(text) => {
                                    onChange(formatCep(text));
                                }}
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

                            />
                        )}
                    />
                </View>
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        disabled={!isDirty || !isValid || saving}
                        style={[
                            styles.saveButton,
                            {
                                opacity:
                                    !isDirty || !isValid || saving
                                        ? 0.5
                                        : 1,
                            },
                        ]}
                        onPress={handleSubmit(onSubmit)}
                    >
                        {saving ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.saveButtonText}>
                                {isCriar
                                    ? "Cadastrar cliente"
                                    : "Salvar alterações"}
                            </Text>
                        )}
                    </TouchableOpacity>

                    {isEditar && (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            disabled={saving}
                            style={[styles.deleteButton, { opacity: saving ? 0.5 : 1, },]}
                            onPress={handleDelete}
                        >
                            <Text style={styles.deleteButtonText}>
                                Excluir cliente
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </KeyboardAwareScrollView>
            <DialogConfirmarAcao
                show={showDeleteDialog}
                setShow={setShowDeleteDialog}
                titulo="Tem certeza que deseja excluir este cliente?"
                onSuccess={confirmarExclusao}
            />
        </View >
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
        padding: 20,
        paddingBottom: 30,
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
    actionsContainer: {
        gap: 12,
        marginTop: 24,
        marginBottom: 32,
    },


    deleteButton: {
        minHeight: 52,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#dc2626",
        backgroundColor: "transparent",
    },

    deleteButtonText: {
        color: "#dc2626",
        fontSize: 16,
        fontWeight: "600",
    },
});