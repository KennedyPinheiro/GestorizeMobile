
export type Avatar = {
  name: string;
  image: string | null;
  size: number;
  onPress: () => void;
}

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

export type UserType = {
  id: string;
  nome: string;
  email: string;
  roles: string[];
  permissions: string[];
};

export type StringfiedDate = string;


export type ClienteType = {
  id: string;
  nome: string;
  tipo: "pf" | "pj";
  email: string | null;
  telefone: string | null;
  avatar_url: string | null;
  endereco: EnderecoType | null;
  pf: PessoaFisicaType | null;
  pj: PessoaJuridicaType | null;
};


export type PessoaFisicaType = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  genero: string;
  estado_civil: string;
  data_nascimento: string;
  rg: string;
  cpf: string;
  endereco_id: string;
};

export type PessoaJuridicaType = {
  id: string;
  razao_social: string;
  email: string;
  nome_fantasia: string;
  cnpj: string;
  nome_responsavel: string;
  cpf_responsavel: string;
  cargo_responsavel: string;
  endereco_id: string;
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
  id: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  cidade: string;
  estado: string;
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

export type ProdutoImagemType = {
  id: string;
  url: string;
  principal: boolean;
  created_at: StringfiedDate;
  updated_at: StringfiedDate;
};

export type ProdutoType = {
  id: string;
  nome: string;
  descricao: string | null;
  preco_custo: number | null;
  porcentagem_lucro: number | null;
  preco_venda: number | null;
  estoque: number;
  data_entrada: StringfiedDate | null;
  validade: StringfiedDate | null;
  categoria_id: string;
  categoria_titulo: string | null;
  fornecedor_id: string;
  fornecedor_razao_social: string | null;
  unidade_medida_id: string;
  unidade_medida_titulo: string | null;
  unidade_medida_sigla: string | null;
  imagem_principal: ProdutoImagemType | null;
  imagens: ProdutoImagemType[];
  created_at: StringfiedDate;
  updated_at: StringfiedDate;
};


export type RoleType = {
  id: number;
  nome: string;
  descricao?: string;
};

export type Genero = "masculino" | "feminino" | "outro";

export type RootStackParamList = {
  Relatorios: undefined;
  Configuracoes: undefined;
  Ajuda: undefined;
  Login: undefined;
  ResetPassword: undefined;
  ForgoutPassword: undefined;
  Homepage: undefined;
  Orcamentos: undefined;
  Funcionarios: { novoFuncionario: boolean } | undefined;
  Clientes: { novoCliente: boolean } | undefined;
  Produtos: { novoProduto: boolean } | undefined;
  Fornecedores: { novoFornecedor: boolean } | undefined;
  NovoCliente:
  | {
    modo: "criar" | "editar";
    clienteId?: string;
  }
  | undefined;

  NovoProduto: {
    modo: "criar" | "editar"
    produtoId?: string
  }


  CadastroFornecedores: undefined;
  CadastroFuncionarios: undefined;
  PerfilProduto: {
    id: number;
    nome: string;
    quantidade: number;
    descricao?: string;
    data_validade?: string;
    data_de_entrada?: string;
    preco_custo?: string | number;
    margem_lucro?: string | number;
    fornecedor_razao_social?: string;
    categoria_titulo: string;
    categoria_id: number;
    fornecedor_id: number;
    medida_id: number;
    medida_titulo: string;
  };
  PerfilFornecedor: {
    id: number;
    razao_social: string;
    email: string;
    ramo_de_atividade: string;
    cnpj: string;
    nome_responsavel: string;
    telefone: string;
    chave_pix: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    numero: string;
    endereco_id: number;
  };
  PerfilPessoaJuridica: {
    id: number;
    razao_social: string;
    email: string;
    nome_fantasia: string;
    cnpj: string;
    nome_do_responsavel: string;
    cpf_responsavel: string;
    cargo_do_respresentante: string;
    telefone: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    numero: string;
    endereco_id: number;
  };
  PerfilPessoaFisica: {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    genero: string;
    estado_civil: string;
    data_nascimento: string;
    rg: string;
    cpf: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    numero: string;
    endereco_id: number;
  };
  PerfilFuncionario: {
    id: string;
    nome: string;
    funcao: string;
    email: string;
    data_nascimento: string;
    genero: string;
    estado_civil: string;
    rg: string;
    cpf: string;
    telefone: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    numero: string;
    endereco_id: number;
  };
  UserPerfil:
  | {
    id: string;
    nome: string;
    funcao: string;
    email: string;
    data_nascimento: string;
    genero: string;
    estado_civil: string;
    rg: string;
    cpf: string;
    telefone: string;
    endereco_id: number;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    numero: string;
  }
  | undefined;
};
