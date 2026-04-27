<?php

namespace App\Http\Requests;

use App\Enums\RoleEnum;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = $this->user();

        if (!$user) {
            return false;
        }

        return $user->hasAnyRole([
            RoleEnum::ADMIN->value,
            RoleEnum::GESTOR->value,
        ]);
    }

    public function rules(): array
    {
        /** @var User|null $target */
        $target = $this->route('user');

        $targetKey = $target?->getKey();
        $funcionarioId = $target?->funcionario?->id;

        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => [
                'sometimes',
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($targetKey, $target?->getKeyName() ?? 'id'),
            ],
            'password' => ['sometimes', 'nullable', 'string', 'min:6', 'confirmed'],
            'role' => [
                'sometimes',
                'required',
                'string',
                'exists:roles,name',
                Rule::in($this->allowedRoleNames()),
            ],

            'telefone' => ['sometimes', 'nullable', 'string', 'max:20'],
            'data_nascimento' => ['sometimes', 'nullable', 'date'],
            'cpf' => [
                'sometimes',
                'nullable',
                'string',
                'size:11',
                Rule::unique('funcionarios', 'cpf')->ignore($funcionarioId),
            ],
            'rg' => ['sometimes', 'nullable', 'string', 'max:50'],

            'endereco' => ['sometimes', 'nullable', 'array'],
            'endereco.logradouro' => ['nullable', 'string', 'max:255'],
            'endereco.numero' => ['nullable', 'string', 'max:20'],
            'endereco.cidade' => ['nullable', 'string', 'max:100'],
            'endereco.estado' => ['nullable', 'string', 'max:2'],
            'endereco.cep' => ['nullable', 'string', 'max:10'],
        ];
    }

    public function messages(): array
    {
        return [
            'role.in' => 'Você não tem permissão para definir este perfil.',
        ];
    }

    /**
     * Admin can set any role; gestor can only set funcionario.
     *
     * @return array<int, string>
     */
    private function allowedRoleNames(): array
    {
        $user = $this->user();

        if ($user?->hasRole(RoleEnum::ADMIN->value)) {
            return array_map(static fn (RoleEnum $role) => $role->value, RoleEnum::cases());
        }

        if ($user?->hasRole(RoleEnum::GESTOR->value)) {
            return [RoleEnum::FUNCIONARIO->value];
        }

        return [];
    }
}

