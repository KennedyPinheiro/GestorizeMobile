export type UserType = {
  id: string;
  nome: string;
  email: string;
  roles: string[];
};

export type ErrorResponseType = {
  success?: boolean;
  message?: string;
  code?: number;
  errors?: Record<string, string[]>;
};

export type MessageConversionObject = {
  defaultMessage: string;
  [key: string]: string;
};

export type ResponseType<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type ArrayResponseType<T> = {
  success: boolean;
  message: string;
  data: T[];
  meta?: ResponseMetaType;
  total?: number;
};

export type MetaType = {
  perPage: number;
  currentPage: number;
  lastPage: number;
  total: number;
};

export type ResponseMetaType = {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
};
export type StringfiedDate = string;

export type ClienteType = {
  pessoa_fisica: PessoaFisicaType;
  pessoa_juridica: PessoaJuridicatype;
  tipo: 'PF' | 'PJ';
};

export type PessoaFisicaType = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  genero: string;
  estado_civil: string;
  data_nascimento: string;
  rg: string;
  cpf: string;
  endereco_id: number;
};

export type PessoaJuridicatype = {
  id: number;
  razao_social: string;
  email: string;
  nome_fantasia: string;
  cnpj: string;
  nome_do_responsavel: string;
  cpf_responsavel: string;
  cargo_do_representante: string;
  endereco_id: number;
  telefone: string;
};

export type FornecedorTipo = {
  id: number;
  razao_social: string;
  ramo_de_atividade: string;
  telefone: string;
  cnpj?: string;
  email: string;
  endereco_id: number;
  nome_responsavel: string;
  chave_pix: string;
};
export type FuncionarioTipo = {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  data_nascimento: string;
  endereco_id: number;
  genero: string;
  estado_civil: string;
  rg: string;
  cpf: string;
  telefone: string;
};

export type EnderecoType = {
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
  cep: string;
};
export type EnderecoTipo = {
  id: number;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
  cep: string;
};

export type FornecedorType = {
  id: number;
  razao_social: string;
  cnpj: string;
  ramo_atividade: string;
  telefone: string;
  email: string;
  endereco_id: EnderecoType;
  nome_responsavel: string;
  chave_pix: string;
  data_criacao: StringfiedDate;
  ultima_atualizacao: StringfiedDate;
};

export type CategoriaType = {
  id: number;
  titulo: string;
  descricao: string;
};

export type MedidaType = {
  id: number;
  titulo: string;
};

export type ProdutoTipo = {
  id: number;
  nome: string;
  categoria_id: number;
  quantidade: number;
  medida_id: number;
  data_validade?: string;
  preco_custo?: number;
  data_de_entrada?: string;
  margem_lucro?: string;
  fornecedor_id: number;
  descricao?: string;
  medida_titulo?: string;
};

export type ProdutoType = {
  nome: string;
  descricao: string;
  categoria_id: number;
  data_de_entrada: StringfiedDate | null;
  quantidade: number;
  medida_id: number;
  data_validade: StringfiedDate | null;
  preco_custo: number | null;
  margem_lucro: number | null;
  fornecedor_id: number;
  data_criacao: StringfiedDate;
  ultima_atualizacao: StringfiedDate;
};

export type RoleType = {
  id: number;
  nome: string;
  descricao?: string;
};

export type RootStackParamList = {
  Relatorios: undefined;
  Login: undefined;
  ResetPassword: undefined;
  ForgoutPassword: undefined;
  Homepage: undefined;
  Orcamentos: undefined;
  Funcionarios: { novoFuncionario: boolean } | undefined;
  Clientes: { novoCliente: boolean } | undefined;
  Produtos: { novoProduto: boolean } | undefined;
  Fornecedores: { novoFornecedor: boolean } | undefined;
  PessoaFisica: undefined;
  PessoaJuridica: undefined;

  NovoFuncionario: undefined;
  NovoCliente: undefined;
  NovoProduto: undefined;
  NovoFornecedor: undefined;
};
