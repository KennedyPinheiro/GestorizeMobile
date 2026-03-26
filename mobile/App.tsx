import "react-native-url-polyfill/auto";
import React from "react";
import Toast from 'react-native-toast-message';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "@views/Login";
import { AuthProvider, useAuth } from "@context/AuthContext";
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
import { RootStackParamList } from "@context/types";
import PerfilProduto from "@views/perfil/PerfilProduto";
import PerfilFornecedor from "@views/perfil/PerfilFornecedor";
import PerfilPessoaFisica from "@views/perfil/PerfilPessoaFisica";
import PerfilPessoaJuridica from "@views/perfil/PerfilPessoaJuridica";
import PerfilFuncionario from "@views/perfil/PerfilFuncionario";
import ForgoutPassword from "@views/ForgoutPassword";
import ResetPassword from "@views/ResetPasswor";
import UserPerfil from "@views/perfil/UserPerfil";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider, useThemeToggle } from "@context/ThemeContext";
import lightTheme from "./src/theme/paperTheme";
import darkTheme from "./src/theme/paperThemeDark";
import { Text, View } from "react-native";
import toastConfig from "@components/ui/ToastConfig";

const Stack = createNativeStackNavigator<RootStackParamList>();


const AppNavigator = () => {
  const { token, loading } = useAuth();

  if (loading) return null;
  return (
    <Stack.Navigator
      key={token ? "app-stack" : "auth-stack"}
      screenOptions={{ headerShown: false }}
    >
      {!token ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgoutPassword" component={ForgoutPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </>
      ) : (
        <>
          <Stack.Screen name="Homepage" component={Homepage} />
          <Stack.Screen name="Clientes" component={Clientes} />
          <Stack.Screen name="Funcionarios" component={Funcionarios} />
          <Stack.Screen name="PessoaFisica" component={CadastroClientePF} />
          <Stack.Screen name="PerfilProduto" component={PerfilProduto} />
          <Stack.Screen name="Fornecedores" component={Fornecedores} />
          <Stack.Screen name="Produtos" component={Produtos} />
          <Stack.Screen name="PerfilFornecedor" component={PerfilFornecedor} />
          <Stack.Screen name="PerfilPessoaFisica" component={PerfilPessoaFisica} />
          <Stack.Screen name="PerfilPessoaJuridica" component={PerfilPessoaJuridica} />
          <Stack.Screen name="PerfilFuncionario" component={PerfilFuncionario} />
          <Stack.Screen name="UserPerfil" component={UserPerfil} />
          <Stack.Screen name="PessoaJuridica" component={CadastroClientePJ} />
          <Stack.Screen name="CadastroProdutos" component={CadastroProdutos} />
          <Stack.Screen name="CadastroFornecedores" component={CadastroFornecedores} />
          <Stack.Screen name="CadastroFuncionarios" component={CadastroFuncionarios} />
        </>
      )}
    </Stack.Navigator>
  );
};

const PaperThemedProvider = ({ children }: { children: React.ReactNode }) => {
  const { mode } = useThemeToggle();
  const paper = mode === 'light' ? lightTheme : darkTheme;
  return <PaperProvider theme={paper}>{children}</PaperProvider>;
};

const App = () => (
  <AuthProvider>
    <ThemeProvider>
      <PaperThemedProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </PaperThemedProvider>
    </ThemeProvider>
  </AuthProvider>
);

export default App;
