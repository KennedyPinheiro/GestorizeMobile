import type { RootStackParamList } from '@context/types';
import type { UserType } from '@context/types';

export const can = (
  user: UserType | null,
  permission: string,
): boolean => {
  return !!user?.permissions?.includes(permission);
};
const routePermission: Partial<Record<keyof RootStackParamList, string>> = {
  Clientes: 'clientes.ver',
  Produtos: 'produtos.ver',
  Fornecedores: 'fornecedores.ver',
  Orcamentos: 'orcamentos.ver',
  Funcionarios: 'users.ver',
  Relatorios: 'relatorios.ver',
};

export const canAccessRoute = (
  user: UserType | null,
  routeName: keyof RootStackParamList,
) => {
  const required = routePermission[routeName];
  return required ? can(user, required) : true;
};