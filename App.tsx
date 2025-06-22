import "react-native-url-polyfill/auto";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "@views/Login";
import { supabase } from "@lib/supabase";
import { Session } from "@supabase/supabase-js";
import { AuthProvider } from "@context/AuthContext";
import Homepage from "@views/Homepage";
import Clientes from "@views/Clientes";
import CadastroClientePF from "@views/Cadastros/CadastroClientePF";
import CadastroClientePJ from "@views/Cadastros/CadastroClientePj";
import Produtos from "@views/Produtos";
import CadastroProdutos from "@views/Cadastros/CadastroProdutos";
import Fornecedores from "@views/Fornecedores";
import CadastroFornecedores from "@views/Cadastros/CadastroFornecedores";
import Funcionarios from "@views/Funcionarios";
import CadastroFuncionarios from "@views/Cadastros/CadastroFuncionarios";

export type RootStackParamList = {
  Login: undefined;
  Homepage: undefined;
  Funcionarios: { novoFuncionario: boolean } | undefined;
  Clientes: { novoCliente: boolean } | undefined;
  Produtos: { novoProduto: boolean } | undefined;
  Fornecedores: { novoFornecedor: boolean } | undefined;
  PessoaFisica: undefined;
  PessoaJuridica: undefined;
  CadastroProdutos: undefined;
  CadastroFornecedores: undefined;
  CadastroFuncionarios: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Erro ao buscar sessão:", error);
      } else {
        setSession(data.session);
      }
      setLoading(false);
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return null;
  return (
    <AuthProvider>
      {" "}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {session ? (
            <>
              <Stack.Screen name="Homepage" component={Homepage} />
              <Stack.Screen name="Clientes" component={Clientes} />
              <Stack.Screen name="Funcionarios" component={Funcionarios} />
              <Stack.Screen name="PessoaFisica" component={CadastroClientePF} />
              <Stack.Screen
                name="PessoaJuridica"
                component={CadastroClientePJ}
              />
              <Stack.Screen
                name="CadastroProdutos"
                component={CadastroProdutos}
              />
              <Stack.Screen
                name="CadastroFornecedores"
                component={CadastroFornecedores}
              />
              <Stack.Screen
                name="CadastroFuncionarios"
                component={CadastroFuncionarios}
              />

              <Stack.Screen name="Fornecedores" component={Fornecedores} />
              <Stack.Screen name="Produtos" component={Produtos} />
            </>
          ) : (
            <Stack.Screen name="Login" component={Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
