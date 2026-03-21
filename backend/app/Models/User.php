<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\RoleEnum;
use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'api_token',
        'is_admin',
        'role_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'api_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
    public function getRoleEnumAttribute(): ?RoleEnum
    {
        if (! $this->role) {
            return null;
        }

        return match ($this->role->nome) {
            'Administrador' => RoleEnum::ADMIN,
            'Gestor' => RoleEnum::GESTOR,
            'Funcionario' => RoleEnum::FUNCIONARIO,
            default => null,
        };
    }


    public function isAdmin(): bool
    {
        return $this->role_enum === RoleEnum::ADMIN;
    }

    public function isGestor(): bool
    {
        return $this->role_enum === RoleEnum::GESTOR;
    }

    public function isFuncionario(): bool
    {
        return $this->role_enum === RoleEnum::FUNCIONARIO;
    }
}
