import 'react-native-url-polyfill/auto';
import React from 'react';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from '@context/AuthContext';
import { ThemeProvider, useThemeToggle } from '@context/ThemeContext';
import { MenuProvider } from '@context/MenuContext';
import { RootStackParamList } from '@context/types';
import Login from '@views/Login';
import Homepage from '@views/Homepage';
import Clientes from '@views/Clientes/index';
import Produtos from '@views/Produtos/index';
import Fornecedores from '@views/Fornecedores/index';
import Funcionarios from '@views/Funcionarios/index';
import Orcamentos from '@views/Orcamentos/index';
import Relatorios from '@views/Relatorios/index';
import ForgoutPassword from '@views/ForgoutPassword';
import ResetPassword from '@views/ResetPasswor';
import { Provider as PaperProvider } from 'react-native-paper';
import lightTheme from './src/theme/paperTheme';
import darkTheme from './src/theme/paperThemeDark';
import toastConfig from '@components/ui/ToastConfig';
import NovoFuncionario from '@views/Funcionarios/NovoFuncionario';
import NovoCliente from '@views/Clientes/NovoCliente';
import NovoFornecedor from '@views/Fornecedores/NovoFornecedor';
import NovoProduto from '@views/Produtos/NovoProduto';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { token, loading } = useAuth();

  if (loading) return null;

  return (
    <MenuProvider>
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
            <Stack.Screen name="Funcionarios" component={Funcionarios} />
            <Stack.Screen name="Fornecedores" component={Fornecedores} />
            <Stack.Screen name="Produtos" component={Produtos} />
            <Stack.Screen name="Relatorios" component={Relatorios} />

            <Stack.Screen name="NovoFuncionario" component={NovoFuncionario} />
            <Stack.Screen name="NovoCliente" component={NovoCliente} />
            <Stack.Screen name="NovoFornecedor" component={NovoFornecedor} />
            <Stack.Screen name="NovoProduto" component={NovoProduto} />
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
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </PaperThemedProvider>
    </ThemeProvider>
  </AuthProvider>
);
export default App;
