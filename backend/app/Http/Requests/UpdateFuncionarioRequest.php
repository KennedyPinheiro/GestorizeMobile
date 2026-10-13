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
            'email' => ['nullable', 'email', 'max:255', Rule::unique('users', 'email')->ignore($funcionarioId),],
            'password' => ['nullable', 'string', 'min:8', 'confirmed',],
            'telefone' => ['nullable', 'string', 'max:20',],
            'data_nascimento' => ['nullable', 'date', 'before:today',],
            'cpf' => ['nullable', 'string', 'size:11', Rule::unique('funcionarios', 'cpf')->ignore($funcionarioId),],
            'endereco_id' => ['nullable', 'uuid', Rule::exists('enderecos', 'id'),],
            'role' => ['nullable', 'string', Rule::in(['gestor', 'funcionario',]),],
            'permissions' => ['sometimes', 'array',],
            'permissions.*' => ['required', 'string', 'distinct', Rule::in(PermissionEnum::values()),],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome do funcionário é obrigatório.',
            'name.string' => 'O nome deve ser um texto válido.',
            'name.max' => 'O nome deve ter no máximo 255 caracteres.',

            'email.required' => 'O e-mail do funcionário é obrigatório.',
            'email.email' => 'Informe um endereço de e-mail válido.',
            'email.unique' => 'Este e-mail já está cadastrado.',

            'password.min' => 'A senha deve possuir pelo menos 8 caracteres.',
            'password.confirmed' => 'A confirmação da senha não corresponde.',

            'telefone.max' => 'O telefone deve ter no máximo 20 caracteres.',

            'data_nascimento.date' => 'Informe uma data de nascimento válida.',
            'data_nascimento.before' => 'A data de nascimento deve ser anterior a hoje.',

            'cpf.size' => 'O CPF deve conter exatamente 11 caracteres.',
            'cpf.unique' => 'Este CPF já está cadastrado.',

            'endereco_id.uuid' => 'O identificador do endereço deve ser um UUID válido.',
            'endereco_id.exists' => 'O endereço informado não foi encontrado.',

            'role.in' => 'O perfil informado é inválido.',

            'permissions.array' => 'As permissões devem ser enviadas em uma lista.',
            'permissions.*.distinct' => 'Não é permitido informar permissões duplicadas.',
            'permissions.*.in' => 'Uma ou mais permissões informadas são inválidas.',
        ];
    }
}
