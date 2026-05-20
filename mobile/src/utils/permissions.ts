const normalizeRole = (role?: string | null) =>
  role
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

const roleToString = (role: any) => {
  if (typeof role === 'string') return role;
  return role?.nome ?? role?.name ?? role?.role ?? role?.funcao ?? '';
};

export const isFuncionarioUser = (user: any) => {
  const roles = Array.isArray(user?.roles) ? user.roles : [];
  const candidates = [
    ...roles,
    user?.role,
    user?.funcao,
    user?.cargo,
    user?.tipo,
  ].filter(Boolean);

  return candidates.some(
    (role) => normalizeRole(roleToString(role)) === 'funcionario',
  );
};
