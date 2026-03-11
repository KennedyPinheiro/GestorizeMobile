<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthLogoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'token' => $this->bearerToken(),
        ]);
    }

    public function rules(): array
    {
        return [
            'token' => ['required', 'string'],
        ];
    }
}
