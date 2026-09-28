<?php

namespace App\Enums;

enum PermissionEnum: string
{
    case CLIENTES_VER      = 'clientes.ver';
    case CLIENTES_CRIAR    = 'clientes.criar';
    case CLIENTES_EDITAR   = 'clientes.editar';
    case CLIENTES_EXCLUIR  = 'clientes.excluir';

    case PRODUTOS_VER      = 'produtos.ver';
    case PRODUTOS_CRIAR    = 'produtos.criar';
    case PRODUTOS_EDITAR   = 'produtos.editar';
    case PRODUTOS_EXCLUIR  = 'produtos.excluir';

    case FORNECEDORES_VER     = 'fornecedores.ver';
    case FORNECEDORES_CRIAR   = 'fornecedores.criar';
    case FORNECEDORES_EDITAR  = 'fornecedores.editar';
    case FORNECEDORES_EXCLUIR = 'fornecedores.excluir';

    case ORCAMENTOS_VER     = 'orcamentos.ver';
    case ORCAMENTOS_CRIAR   = 'orcamentos.criar';
    case ORCAMENTOS_EDITAR  = 'orcamentos.editar';
    case ORCAMENTOS_EXCLUIR = 'orcamentos.excluir';
    case ORCAMENTOS_APROVAR = 'orcamentos.aprovar';

    case USERS_VER     = 'users.ver';
    case USERS_CRIAR   = 'users.criar';
    case USERS_EDITAR  = 'users.editar';
    case USERS_EXCLUIR = 'users.excluir';

    case RELATORIOS_VER = 'relatorios.ver';
    case RELATORIOS_GERAR    = 'relatorios.gerar';
    case RELATORIOS_EXPORTAR = 'relatorios.exportar';

    case ACESSOS_GERENCIAR = 'acessos.gerenciar';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
