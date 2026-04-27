<?php

namespace App\Http\Requests;

use App\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IndexUserRequest extends FormRequest
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
        return [
            'search' => ['nullable', 'string', 'max:255'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
            'role' => ['nullable', 'string', Rule::in($this->allowedRoleNames())],
        ];
    }

    /**
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

