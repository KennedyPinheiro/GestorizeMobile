<?php

namespace App\Http\Requests;

use App\Enums\PermissionEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateFuncionarioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $funcionario = $this->route('funcionario');

        $funcionarioId = is_object($funcionario) ? $funcionario->id : $funcionario;

        return [
            'name' => ['nullable', 'string', 'max:255',],
            'email' => ['nullable', 'email', 'max:255', Rule::unique('users', 'email'),],
            'password' => ['nullable', 'string', 'min:8', 'confirmed',],
            'telefone' => ['nullable', 'string', 'max:20',],
            'data_nascimento' => ['nullable', 'date', 'before:today',],
            'cpf' => ['nullable', 'string', 'size:11', Rule::unique('funcionarios', 'cpf'),],
            'endereco_id' => ['nullable', 'uuid', Rule::exists('enderecos', 'id'),],
            'role' => ['nullable', 'string', Rule::in(['gestor', 'funcionario',]),],
            'permissions' => ['sometimes', 'array',],
            'permissions.*' => ['required', 'string', 'distinct', Rule::in(PermissionEnum::values()),],
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O nome do fornecedor é obrigatório.',
            'cnpj.required' => 'O CNPJ do fornecedor é obrigatório.',
            'cnpj.unique' => 'Este CNPJ já está cadastrado.',
            'email.email' => 'Informe um endereço de e-mail válido.',
            'email.unique' => 'Este e-mail já está cadastrado para outro fornecedor.',
            'telefone.required' => 'O telefone do fornecedor é obrigatório.',
            'endereco_id.uuid' => 'O identificador do endereço deve ser um UUID válido.',
            'endereco_id.exists' => 'O endereço informado não foi encontrado.',
        ];
    }
}
