<?php

namespace App\Http\Requests;

use App\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        if ($this->route('role')) {
            $this->merge(['role' => (string) $this->route('role')]);
        }
    }

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
        $allowedRoles = $this->allowedRoleNames();

        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'role' => [
                'required',
                'string',
                'exists:roles,name',
                Rule::in($allowedRoles),
            ],

            'telefone' => 'nullable|string|max:20',
            'data_nascimento' => 'nullable|date',
            'cpf' => 'nullable|string|size:11|unique:funcionarios,cpf',

            'endereco' => 'nullable|array',
            'endereco.logradouro' => 'nullable|string|max:255',
            'endereco.numero' => 'nullable|string|max:20',
            'endereco.cidade' => 'nullable|string|max:100',
            'endereco.estado' => 'nullable|string|max:2',
            'endereco.cep' => 'nullable|string|max:10',
        ];
    }

    public function messages(): array
    {
        return [
            'role.in' => 'Você não tem permissão para criar usuário com esse perfil.',
        ];
    }

    /**
     * Admin can create any role; gestor can only create funcionario.
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
