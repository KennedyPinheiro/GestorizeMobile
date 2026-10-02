import React, { useEffect, useMemo, useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '@context/ThemeContext';

type AvatarProps = {
    nome?: string;
    imageUri?: string | null;
    size?: number;
    editable?: boolean;
    onImageSelected?: (uri: string) => void;
    onImageRemoved?: () => void;
};

const Avatar = ({
    nome = '',
    imageUri = null,
    size = 56,
    editable = false,
    onImageSelected,
    onImageRemoved,
}: AvatarProps) => {
    const { colors } = useTheme();

    const [imagem, setImagem] = useState<string | null>(imageUri);

    const iniciais = useMemo(() => {
        const nomeFormatado = nome.trim();

        if (!nomeFormatado) {
            return 'U';
        }

        const palavras = nomeFormatado.split(/\s+/);

        if (palavras.length === 1) {
            return palavras[0]
                .substring(0, 2)
                .toUpperCase();
        }

        return (
            palavras[0][0] +
            palavras[palavras.length - 1][0]
        ).toUpperCase();
    }, [nome]);

    useEffect(() => {
        setImagem(imageUri);
    }, [imageUri]);

    const selecionarImagem = async () => {
        if (!editable) {
            return;
        }

        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            return;
        }

        const result =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

        if (result.canceled) {
            return;
        }

        const uri = result.assets[0].uri;

        setImagem(uri);
        onImageSelected?.(uri);
    };

    const removerImagem = () => {
        if (!editable || !imagem) {
            return;
        }

        setImagem(null);
        onImageRemoved?.();
    };

    const content = (
        <>
            {imagem ? (
                <Image
                    source={{ uri: imagem }}
                    style={[
                        styles.image,
                        {
                            width: size,
                            height: size,
                            borderRadius: size / 2,
                        },
                    ]}
                />
            ) : (
                <View
                    style={[
                        styles.initials,
                        {
                            width: size,
                            height: size,
                            borderRadius: size / 2,
                            backgroundColor: colors.primary,
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.initialsText,
                            {
                                fontSize: size * 0.32,
                                color: colors.background,
                            },
                        ]}
                    >
                        {iniciais}
                    </Text>
                </View>
            )}

            {editable && (
                <>
                    <View
                        pointerEvents="none"
                        style={[
                            styles.camera,
                            {
                                width: size * 0.32,
                                height: size * 0.32,
                                borderRadius: size * 0.16,
                                backgroundColor: colors.primary,
                                borderColor: colors.background,
                            },
                        ]}
                    >
                        <Ionicons
                            name="camera-outline"
                            size={size * 0.18}
                            color={colors.background}
                        />
                    </View>

                    {imagem && (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={removerImagem}
                            style={[
                                styles.remove,
                                {
                                    width: size * 0.30,
                                    height: size * 0.30,
                                    borderRadius: size * 0.15,
                                    borderColor: colors.background,
                                },
                            ]}
                        >
                            <Ionicons
                                name="close"
                                size={size * 0.18}
                                color="#ffffff"
                            />
                        </TouchableOpacity>
                    )}
                </>
            )}
        </>
    );
    if (!editable) {
        return (
            <View
                style={[
                    styles.container,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                    },
                ]}
            >
                {content}
            </View>
        );
    }

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={selecionarImagem}
            style={[
                styles.container,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                },
            ]}
        >
            {content}
        </TouchableOpacity>
    );

    return (
        <View
            style={[
                styles.container,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                },
            ]}
        >
            {content}
        </View>
    );
};

export default Avatar;
const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },

    image: {
        resizeMode: 'cover',
    },

    initials: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    initialsText: {
        fontWeight: '800',
    },

    camera: {
        position: 'absolute',
        right: -2,
        bottom: -2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
    },

    remove: {
        position: 'absolute',
        right: -2,
        top: -2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dc2626',
        borderWidth: 2,
    },
});