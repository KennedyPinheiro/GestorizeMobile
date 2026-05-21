import 'react-native-url-polyfill/auto';
import React from 'react';
import Toast from 'react-native-toast-message';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@views/Login';
import { AuthProvider, useAuth } from '@context/AuthContext';
import Homepage from '@views/Homepage';
import Clientes from '@views/Clientes/index';
import CadastroClientePF from '@views/Cadastros/CadastroClientePF';
import CadastroClientePJ from '@views/Cadastros/CadastroClientePj';
import Produtos from '@views/Produtos/index';
import CadastroProdutos from '@views/Cadastros/CadastroProdutos';
import Fornecedores from '@views/Fornecedores/index';
import CadastroFornecedores from '@views/Cadastros/CadastroFornecedores';
import Funcionarios from '@views/Funcionarios/index';
import CadastroFuncionarios from '@views/Cadastros/CadastroFuncionarios';
import { RootStackParamList } from '@context/types';
import PerfilProduto from '@views/perfil/PerfilProduto';
import PerfilFornecedor from '@views/perfil/PerfilFornecedor';
import PerfilPessoaFisica from '@views/perfil/PerfilPessoaFisica';
import PerfilPessoaJuridica from '@views/perfil/PerfilPessoaJuridica';
import PerfilFuncionario from '@views/perfil/PerfilFuncionario';
import ForgoutPassword from '@views/ForgoutPassword';
import ResetPassword from '@views/ResetPasswor';
import UserPerfil from '@views/perfil/UserPerfil';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider, useThemeToggle } from '@context/ThemeContext';
import lightTheme from './src/theme/paperTheme';
import darkTheme from './src/theme/paperThemeDark';
import Orcamentos from '@views/Orcamentos/index';
import { MenuProvider } from '@context/MenuContext';
import toastConfig from '@components/ui/ToastConfig';
import Relatorios from '@views/Relatorios/index';
import Configuracoes from '@views/Configuracoes';
import { canAccessRoute } from '@utils/permissions';
import Ajuda from '@views/Ajuda';

const Stack = createNativeStackNavigator<RootStackParamList>();
const navigationRef = createNavigationContainerRef<RootStackParamList>();

const AppNavigator = () => {
  const { token, loading, user } = useAuth();

  if (loading) return null;

  const canAccess = (routeName: keyof RootStackParamList) =>
    canAccessRoute(user, routeName);

  return (
    <MenuProvider navigationRef={navigationRef}>
      <Stack.Navigator
        key={token ? 'app-stack' : 'auth-stack'}
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
            <Stack.Screen name="Orcamentos" component={Orcamentos} />
            <Stack.Screen name="PessoaFisica" component={CadastroClientePF} />
            <Stack.Screen name="Configuracoes" component={Configuracoes} />
            <Stack.Screen name="Ajuda" component={Ajuda} />
            <Stack.Screen
              name="PerfilPessoaFisica"
              component={PerfilPessoaFisica}
            />
            <Stack.Screen
              name="PerfilPessoaJuridica"
              component={PerfilPessoaJuridica}
            />
            <Stack.Screen name="UserPerfil" component={UserPerfil} />
            <Stack.Screen name="PessoaJuridica" component={CadastroClientePJ} />
            {canAccess('Produtos') && (
              <>
                <Stack.Screen name="Produtos" component={Produtos} />
                <Stack.Screen
                  name="CadastroProdutos"
                  component={CadastroProdutos}
                />
                <Stack.Screen
                  name="PerfilProduto"
                  component={PerfilProduto}
                />
              </>
            )}
            {canAccess('Fornecedores') && (
              <>
                <Stack.Screen name="Fornecedores" component={Fornecedores} />
                <Stack.Screen
                  name="CadastroFornecedores"
                  component={CadastroFornecedores}
                />
                <Stack.Screen
                  name="PerfilFornecedor"
                  component={PerfilFornecedor}
                />
              </>
            )}
            {canAccess('Funcionarios') && (
              <>
                <Stack.Screen name="Funcionarios" component={Funcionarios} />
                <Stack.Screen
                  name="CadastroFuncionarios"
                  component={CadastroFuncionarios}
                />
                <Stack.Screen
                  name="PerfilFuncionario"
                  component={PerfilFuncionario}
                />
              </>
            )}
            {canAccess('Relatorios') && (
              <Stack.Screen name="Relatorios" component={Relatorios} />
            )}
          </>
        )}
      </Stack.Navigator>
    </MenuProvider>
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
        <NavigationContainer ref={navigationRef}>
          <AppNavigator />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </PaperThemedProvider>
    </ThemeProvider>
  </AuthProvider>
);
export default App;
