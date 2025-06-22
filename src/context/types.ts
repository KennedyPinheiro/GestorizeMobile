export type StringfiedDate = string;

export type ClienteType = {
  pessoa_fisica: PessoaFisicaType;
  pessoa_juridica: PessoaJuridicatype;
  tipo: "PF" | "PJ";
};

export type PessoaFisicaType = {
  id: number;
  nome: string;
  email: string | null;
};

export type PessoaJuridicatype = {
  id: number;
  razao_social: string;
  email: string | null;
};

export type FornecedorTipo = {
  id: number;
  razao_social: string;
  email: string | null;
};
export type FuncionarioTipo = {
  id: string;
  nome: string;
  cargo: string
};

export type EnderecoType = {
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
  endereco: EnderecoType;
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
  medida_id: number | null;
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
