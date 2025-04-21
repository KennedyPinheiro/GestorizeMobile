import React, { useState } from "react";
import { View } from "react-native";
import InputCard from "@/components/InputCard";
import DialogEndereço from "@/components/DialogEndereço";
import Button from "@/components/Button";

const CadastroFornecedores = ({ onPress }) => {
  const [razaoSocial, setRazaoSocial] = useState("");
  const [endereço, setEndereco] = useState(false);

  const handleOpenEndereço = () => {
    setEndereco(true);
  };

  const handleCloseEndereço = () => {
    setEndereco(false);
  };

  return (
    <View style={{ 
      backgroundColor: "#FFF", 
      alignItems: "center",  // Alinha os itens horizontalmente ao centro
      padding: 16,          // Adiciona um pouco de padding para melhor visualização
    }}>
      <InputCard
        label="Razão Social"
        placeholder="example complete name"
        tipo="string"
        value={razaoSocial}
        onChangeText={setRazaoSocial}
      />
      <InputCard
        label="CNPJ"
        placeholder="example complete name"
        tipo="string"
        value={razaoSocial}
        onChangeText={setRazaoSocial}
      />
      <InputCard
        label="Ramo de Atividade"
        placeholder="example complete name"
        tipo="string"
        value={razaoSocial}
        onChangeText={setRazaoSocial}
      />
      <InputCard
        label="Telefone"
        placeholder="example complete name"
        tipo="string"
        value={razaoSocial}
        onChangeText={setRazaoSocial}
      />
      <InputCard
        label="Email"
        placeholder="example complete name"
        tipo="string"
        value={razaoSocial}
        onChangeText={setRazaoSocial}
      />

      <Button title="ENDEREÇO" onPress={() => handleOpenEndereço()} />

      <InputCard
        label="Nome do Responsavel"
        placeholder="example complete name"
        tipo="string"
        value={razaoSocial}
        onChangeText={setRazaoSocial}
      />
      <InputCard
        label="Chave Pix"
        placeholder="example complete name"
        tipo="string"
        value={razaoSocial}
        onChangeText={setRazaoSocial}
      />

      <Button title="ADICIONAR" />
      <DialogEndereço
        onClose={() => handleCloseEndereço()}
        onSave={onPress}
        visible={endereço}
      />
    </View>
  );
};

export default CadastroFornecedores;