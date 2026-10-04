import Avatar from "@components/Avatar";
import Nav from "@components/utilities/Nav";
import EditableTextCard from "@components/EditableTextCard";
import ClickableTextCard from "@components/ClickableTextCard";
import Button from "@components/botoes/Button";
import DialogConfirmarAcao from "@components/dialogs/DialogConfirmarAcao";
import DateField from "@components/DateField";
import { InputError } from "@components/InputError";

import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
    ActivityIndicator,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { z } from "zod";

import { RootStackParamList } from "@context/types";
import { useTheme } from "@context/ThemeContext";

import {
    createProduto,
    deleteProduto,
    getProduto,
    updateProduto,
} from "@api/apiProdutos";

import { produtoSchema } from "src/schemas/ProdutoSchema";

import Toast from "react-native-toast-message";

type Navigation =
    NativeStackNavigationProp<RootStackParamList>;

type FormData = z.input<typeof produtoSchema>;

type Route = NativeStackScreenProps<
    RootStackParamList,
    "NovoProduto"
>["route"];

type Opcao = {
    id: string;
    nome: string;
};

type ProdutoSelectorProps = {
    label: string;
    placeholder: string;
    value?: string | null;
    options: Opcao[];
    onChange: (value: string) => void;
    disabled?: boolean;
};

function ProdutoSelector({
    label,
    placeholder,
    value,
    options,
    onChange,
    disabled = false,
}: ProdutoSelectorProps) {
    const [visible, setVisible] = useState(false);

    const labelSelecionado =
        options.find((item) => item.id === value)?.nome ?? "";

    const selecionar = (id: string) => {
        onChange(id);
        setVisible(false);
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
                        onPress={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <Text style={styles.selectorTitle}>
                            {label}
                        </Text>

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

                                    {index <
                                        options.length - 1 && (
                                            <View
                                                style={
                                                    styles.selectorDivider
                                                }
                                            />
                                        )}
                                </View>
                            ))}

                            {options.length === 0 && (
                                <View style={styles.emptyOptions}>
                                    <Text
                                        style={
                                            styles.emptyOptionsText
                                        }
                                    >
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

export default function NovoProduto() {
    const navigation = useNavigation<Navigation>();
    const route = useRoute<Route>();
    const { colors } = useTheme();

    const [showDeleteDialog, setShowDeleteDialog] =
        useState(false);

    const [imagem, setImagem] =
        useState<string | null>(null);

    const [imagemOriginal, setImagemOriginal] =
        useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    /*
     * Essas opções serão posteriormente carregadas
     * pelas respectivas APIs.
     */
    const [categorias] = useState<Opcao[]>([]);
    const [fornecedores] = useState<Opcao[]>([]);
    const [unidadesMedida] = useState<Opcao[]>([]);

    const modo = route.params?.modo ?? "criar";
    const produtoId = route.params?.produtoId;

    const isCriar = modo === "criar";
    const isEditar = modo === "editar";

    const imagemAlterada =
        imagem !== imagemOriginal;

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: {
            isDirty,
            errors,
        },
    } = useForm<FormData>({
        resolver: zodResolver(produtoSchema),
        mode: "onChange",

        defaultValues: {
            nome: "",
            descricao: "",

            preco_custo: 0,
            porcentagem_lucro: 0,
            preco_venda: 0,

            estoque: 0,

            data_entrada: null,
            validade: null,

            categoria_id: "",
            fornecedor_id: "",
            unidade_medida_id: "",
        },
    });

    const nomeProduto = watch("nome");

    /*
     * Carregar produto
     */
    useEffect(() => {
        if (modo === "criar") {
            return;
        }

        if (!produtoId) {
            Toast.show({
                type: "error",
                text1: "Produto não informado",
            });

            navigation.goBack();
            return;
        }

        const carregarProduto = async () => {
            try {
                setLoading(true);

                const response =
                    await getProduto(produtoId);

                const produto = response.data;

                const dados: FormData = {
                    nome: produto.nome ?? "",

                    descricao:
                        produto.descricao ?? "",

                    preco_custo:
                        produto.preco_custo ?? 0,

                    porcentagem_lucro:
                        produto.porcentagem_lucro ?? 0,

                    preco_venda:
                        produto.preco_venda ?? 0,

                    estoque:
                        produto.estoque ?? 0,

                    data_entrada:
                        produto.data_entrada ?? null,

                    validade:
                        produto.validade ?? null,

                    categoria_id:
                        produto.categoria_id ?? "",

                    fornecedor_id:
                        produto.fornecedor_id ?? "",

                    unidade_medida_id:
                        produto.unidade_medida_id ?? "",
                };

                reset(dados);

                /*
                 * A imagem principal será utilizada
                 * como identificação do produto.
                 */
                const imagemPrincipal =
                    produto.imagem_principal?.url ?? null;

                setImagem(imagemPrincipal);
                setImagemOriginal(imagemPrincipal);
            } catch (error) {
                console.error(
                    "Erro ao carregar produto:",
                    error
                );

                Toast.show({
                    type: "error",
                    text1: "Erro ao carregar produto",
                    text2:
                        "Não foi possível carregar os dados do produto.",
                });

                navigation.goBack();
            } finally {
                setLoading(false);
            }
        };

        carregarProduto();
    }, [
        modo,
        produtoId,
        navigation,
        reset,
    ]);

    /*
     * Excluir produto
     */
    const handleDelete = () => {
        if (!produtoId) {
            return;
        }

        setShowDeleteDialog(true);
    };

    const confirmarExclusao = async () => {
        if (!produtoId) {
            return;
        }

        try {
            setSaving(true);

            await deleteProduto(produtoId);

            Toast.show({
                type: "success",
                text1: "Produto excluído",
                text2:
                    "O produto foi removido com sucesso.",
            });

            navigation.goBack();
        } catch (error: any) {
            console.error(
                "Erro ao excluir produto:",
                error?.response?.data ?? error
            );

            Toast.show({
                type: "error",
                text1: "Erro ao excluir",
                text2:
                    error?.response?.data?.message ??
                    "Não foi possível excluir o produto.",
            });
        } finally {
            setSaving(false);
            setShowDeleteDialog(false);
        }
    };

    /*
     * Salvar produto
     */
    const onSubmit = async (data: FormData) => {
        if (!isCriar && !isDirty && !imagemAlterada) {
            return;
        }

        try {
            setSaving(true);

            const payload = {
                nome: data.nome,
                descricao: data.descricao || null,

                preco_custo: data.preco_custo,
                porcentagem_lucro:
                    data.porcentagem_lucro,
                preco_venda: data.preco_venda,

                estoque: data.estoque,

                data_entrada:
                    data.data_entrada,

                validade:
                    data.validade,

                categoria_id:
                    data.categoria_id,

                fornecedor_id:
                    data.fornecedor_id,

                unidade_medida_id:
                    data.unidade_medida_id,
            };

            if (isCriar) {
                const response =
                    await createProduto(payload);

                /*
                 * A imagem será integrada aqui depois,
                 * utilizando o ID retornado pelo backend.
                 */

                Toast.show({
                    type: "success",
                    text1: "Produto cadastrado",
                    text2:
                        "O produto foi cadastrado com sucesso.",
                });

                navigation.goBack();

                return;
            }

            if (isEditar && produtoId) {
                if (isDirty) {
                    const response =
                        await updateProduto(
                            produtoId,
                            payload
                        );

                    Toast.show({
                        type: "success",
                        text1: "Produto atualizado",
                        text2:
                            response.message ??
                            "Alterações salvas com sucesso.",
                    });
                }

                /*
                 * A atualização da imagem será feita
                 * separadamente pela API de imagens.
                 */

                reset(data);
                setImagemOriginal(imagem);
            }
        } catch (error: any) {
            console.error(
                "Erro ao salvar produto:",
                error?.response?.data ?? error
            );

            Toast.show({
                type: "error",
                text1: "Erro ao salvar produto",
                text2:
                    error?.response?.data?.message ??
                    "Não foi possível salvar as alterações.",
            });
        } finally {
            setSaving(false);
        }
    };

    const handleImageSelected = (uri: string) => {
        setImagem(uri);
    };

    const handleRemoveImagem = () => {
        setImagem(null);
    };

    if (loading) {
        return (
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor:
                            colors.background,
                        justifyContent:
                            "center",
                        alignItems:
                            "center",
                    },
                ]}
            >
                <ActivityIndicator size="large" />

                <Text
                    style={{
                        color: colors.text,
                        marginTop: 12,
                    }}
                >
                    Carregando produto...
                </Text>
            </View>
        );
    }

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor:
                        colors.background,
                },
            ]}
        >
            <Nav
                title={
                    isCriar
                        ? "Novo Produto"
                        : "Editar Produto"
                }
                subtitle="Produto"
                onBackPress={() =>
                    navigation.goBack()
                }
                rightType="menu"
            />

            <KeyboardAwareScrollView
                style={styles.flex}
                contentContainerStyle={
                    styles.content
                }
                showsVerticalScrollIndicator={
                    false
                }
                keyboardShouldPersistTaps="handled"
                enableOnAndroid
                enableAutomaticScroll
                extraScrollHeight={50}
            >
                {/* IMAGEM */}

                <View
                    style={
                        styles.avatarContainer
                    }
                >
                    <Avatar
                        nome={
                            nomeProduto ||
                            "Produto"
                        }
                        imageUri={imagem}
                        size={120}
                        editable={true}
                        onImageSelected={
                            handleImageSelected
                        }
                        onImageRemoved={
                            handleRemoveImagem
                        }
                    />

                    <Text
                        style={[
                            styles.avatarLabel,
                            {
                                color:
                                    colors.text,
                            },
                        ]}
                    >
                        Foto do produto
                    </Text>
                </View>

                {/* DADOS PRINCIPAIS */}

                <View style={styles.section}>
                    <Text
                        style={[
                            styles.sectionTitle,
                            {
                                color:
                                    colors.text,
                            },
                        ]}
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
                            fieldState: {
                                error,
                            },
                        }) => (
                            <>
                                <EditableTextCard
                                    label="Nome do produto"
                                    placeholder="Digite o nome do produto"
                                    value={
                                        value
                                    }
                                    onChangeText={(
                                        text
                                    ) =>
                                        onChange(
                                            text.slice(
                                                0,
                                                255
                                            )
                                        )
                                    }
                                />

                                <InputError
                                    message={
                                        error?.message
                                    }
                                />
                            </>
                        )}
                    />

                    <Controller
                        control={control}
                        name="descricao"
                        render={({
                            field: {
                                value,
                                onChange,
                            },
                            fieldState: {
                                error,
                            },
                        }) => (
                            <>
                                <EditableTextCard
                                    label="Descrição"
                                    placeholder="Digite a descrição do produto"
                                    value={
                                        value ??
                                        ""
                                    }
                                    onChangeText={
                                        onChange
                                    }
                                />

                                <InputError
                                    message={
                                        error?.message
                                    }
                                />
                            </>
                        )}
                    />
                </View>

                {/* VALORES */}

                <View style={styles.section}>
                    <Text
                        style={[
                            styles.sectionTitle,
                            {
                                color:
                                    colors.text,
                            },
                        ]}
                    >
                        Valores
                    </Text>

                    <Controller
                        control={control}
                        name="preco_custo"
                        render={({
                            field: {
                                value,
                                onChange,
                            },
                            fieldState: {
                                error,
                            },
                        }) => (
                            <>
                                <EditableTextCard
                                    label="Preço de custo"
                                    placeholder="0,00"
                                    value={
                                        value ===
                                            null ||
                                            value ===
                                            undefined
                                            ? ""
                                            : String(
                                                value
                                            )
                                    }
                                    tipo="number"
                                    onChangeText={(
                                        text
                                    ) => {
                                        const numero =
                                            Number(
                                                text.replace(
                                                    ",",
                                                    "."
                                                )
                                            );

                                        onChange(
                                            Number.isNaN(
                                                numero
                                            )
                                                ? 0
                                                : numero
                                        );
                                    }}
                                />

                                <InputError
                                    message={
                                        error?.message
                                    }
                                />
                            </>
                        )}
                    />

                    <Controller
                        control={control}
                        name="porcentagem_lucro"
                        render={({
                            field: {
                                value,
                                onChange,
                            },
                            fieldState: {
                                error,
                            },
                        }) => (
                            <>
                                <EditableTextCard
                                    label="Margem de lucro (%)"
                                    placeholder="0"
                                    value={
                                        value ===
                                            null ||
                                            value ===
                                            undefined
                                            ? ""
                                            : String(
                                                value
                                            )
                                    }
                                    tipo="number"
                                    onChangeText={(
                                        text
                                    ) => {
                                        const numero =
                                            Number(
                                                text.replace(
                                                    ",",
                                                    "."
                                                )
                                            );

                                        onChange(
                                            Number.isNaN(
                                                numero
                                            )
                                                ? 0
                                                : numero
                                        );
                                    }}
                                />

                                <InputError
                                    message={
                                        error?.message
                                    }
                                />
                            </>
                        )}
                    />

                    <Controller
                        control={control}
                        name="preco_venda"
                        render={({
                            field: {
                                value,
                                onChange,
                            },
                            fieldState: {
                                error,
                            },
                        }) => (
                            <>
                                <EditableTextCard
                                    label="Preço de venda"
                                    placeholder="0,00"
                                    value={
                                        value ===
                                            null ||
                                            value ===
                                            undefined
                                            ? ""
                                            : String(
                                                value
                                            )
                                    }
                                    tipo="number"
                                    onChangeText={(
                                        text
                                    ) => {
                                        const numero =
                                            Number(
                                                text.replace(
                                                    ",",
                                                    "."
                                                )
                                            );

                                        onChange(
                                            Number.isNaN(
                                                numero
                                            )
                                                ? 0
                                                : numero
                                        );
                                    }}
                                />

                                <InputError
                                    message={
                                        error?.message
                                    }
                                />
                            </>
                        )}
                    />
                </View>

                {/* ESTOQUE */}

                <View style={styles.section}>
                    <Text
                        style={[
                            styles.sectionTitle,
                            {
                                color:
                                    colors.text,
                            },
                        ]}
                    >
                        Estoque
                    </Text>

                    <View style={styles.row}>
                        <View
                            style={
                                styles.half
                            }
                        >
                            <Controller
                                control={control}
                                name="estoque"
                                render={({
                                    field: {
                                        value,
                                        onChange,
                                    },
                                    fieldState: {
                                        error,
                                    },
                                }) => (
                                    <>
                                        <EditableTextCard
                                            label="Estoque"
                                            placeholder="0"
                                            value={String(
                                                value ??
                                                ""
                                            )}
                                            tipo="number"
                                            onChangeText={(
                                                text
                                            ) => {
                                                const numero =
                                                    Number(
                                                        text
                                                    );

                                                onChange(
                                                    Number.isNaN(
                                                        numero
                                                    )
                                                        ? 0
                                                        : numero
                                                );
                                            }}
                                        />

                                        <InputError
                                            message={
                                                error?.message
                                            }
                                        />
                                    </>
                                )}
                            />
                        </View>

                        <View
                            style={
                                styles.half
                            }
                        >
                            <Controller
                                control={control}
                                name="unidade_medida_id"
                                render={({
                                    field: {
                                        value,
                                        onChange,
                                    },
                                    fieldState: {
                                        error,
                                    },
                                }) => (
                                    <>
                                        <ProdutoSelector
                                            label="Unidade"
                                            placeholder="Selecionar"
                                            value={
                                                value
                                            }
                                            options={
                                                unidadesMedida
                                            }
                                            onChange={
                                                onChange
                                            }
                                        />

                                        <InputError
                                            message={
                                                error?.message
                                            }
                                        />
                                    </>
                                )}
                            />
                        </View>
                    </View>
                </View>


                <View style={styles.section}>
                    <Text
                        style={[
                            styles.sectionTitle,
                            {
                                color:
                                    colors.text,
                            },
                        ]}
                    >
                        Classificação
                    </Text>

                    <Controller
                        control={control}
                        name="categoria_id"
                        render={({
                            field: {
                                value,
                                onChange,
                            },
                            fieldState: {
                                error,
                            },
                        }) => (
                            <>
                                <ProdutoSelector
                                    label="Categoria"
                                    placeholder="Selecionar categoria"
                                    value={
                                        value
                                    }
                                    options={
                                        categorias
                                    }
                                    onChange={
                                        onChange
                                    }
                                />

                                <InputError
                                    message={
                                        error?.message
                                    }
                                />
                            </>
                        )}
                    />

                    <Controller
                        control={control}
                        name="fornecedor_id"
                        render={({
                            field: {
                                value,
                                onChange,
                            },
                            fieldState: {
                                error,
                            },
                        }) => (
                            <>
                                <ProdutoSelector
                                    label="Fornecedor"
                                    placeholder="Selecionar fornecedor"
                                    value={
                                        value
                                    }
                                    options={
                                        fornecedores
                                    }
                                    onChange={
                                        onChange
                                    }
                                />

                                <InputError
                                    message={
                                        error?.message
                                    }
                                />
                            </>
                        )}
                    />
                </View>
                <View style={styles.section}>
                    <Text
                        style={[
                            styles.sectionTitle,
                            {
                                color:
                                    colors.text,
                            },
                        ]}
                    >
                        Datas
                    </Text>

                    <Controller
                        control={control}
                        name="data_entrada"
                        render={({
                            field: {
                                value,
                                onChange,
                            },
                            fieldState: {
                                error,
                            },
                        }) => (
                            <>
                                <DateField
                                    label="Data de entrada"
                                    value={
                                        value ??
                                        ""
                                    }
                                    onChange={
                                        onChange
                                    }
                                />

                                <InputError
                                    message={
                                        error?.message
                                    }
                                />
                            </>
                        )}
                    />

                    <Controller
                        control={control}
                        name="validade"
                        render={({
                            field: {
                                value,
                                onChange,
                            },
                            fieldState: {
                                error,
                            },
                        }) => (
                            <>
                                <DateField
                                    label="Validade"
                                    value={
                                        value ??
                                        ""
                                    }
                                    onChange={
                                        onChange
                                    }
                                    maximumDate={
                                        new Date()
                                    }
                                />

                                <InputError
                                    message={
                                        error?.message
                                    }
                                />
                            </>
                        )}
                    />
                </View>


                <View
                    style={
                        styles.actionsContainer
                    }
                >
                    <Button
                        title={
                            saving
                                ? "Salvando..."
                                : isCriar
                                    ? "Cadastrar produto"
                                    : "Salvar alterações"
                        }
                        variant="contained"
                        color="primary"
                        disabled={
                            (!isDirty &&
                                !imagemAlterada) ||
                            saving
                        }
                        onPress={handleSubmit(
                            onSubmit
                        )}
                    />

                    {isEditar && (
                        <Button
                            title="Excluir produto"
                            variant="delete"
                            disabled={
                                saving
                            }
                            onPress={
                                handleDelete
                            }
                        />
                    )}
                </View>
            </KeyboardAwareScrollView>

            <DialogConfirmarAcao
                show={
                    showDeleteDialog
                }
                setShow={
                    setShowDeleteDialog
                }
                titulo="Tem certeza que deseja excluir este produto?"
                onSuccess={
                    confirmarExclusao
                }
            />
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

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    half: {
        width: "48%",
    },

    actionsContainer: {
        alignItems: "center",
        width: "100%",
        gap: 12,
        marginBottom: 5,
    },

    selectorOverlay: {
        flex: 1,
        backgroundColor:
            "rgba(0, 0, 0, 0.45)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    selectorModal: {
        width: "100%",
        maxWidth: 400,
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingTop: 20,
        paddingBottom: 10,
        overflow: "hidden",
    },

    selectorTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#111",
        textAlign: "center",
        marginBottom: 10,
        paddingHorizontal: 20,
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
        minHeight: 52,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },

    emptyOptionsText: {
        fontSize: 15,
        color: "#777",
    },
});