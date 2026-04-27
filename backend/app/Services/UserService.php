<?php

namespace App\Services;

use App\Enums\RoleEnum;
use App\Models\Funcionario;
use App\Models\User;
use App\Models\Endereco;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class UserService implements IUserService
{
    public function create(array $data): User
    {
        return DB::transaction(function () use ($data) {

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => $data['password'],
            ]);

            $user->assignRole($data['role']);

            $enderecoId = null;

            if (!empty($data['endereco'])) {
                $endereco = Endereco::create($data['endereco']);
                $enderecoId = $endereco->id;
            }

            Funcionario::create([
                'id' => $user->id,
                'telefone' => $data['telefone'] ?? null,
                'data_nascimento' => $data['data_nascimento'] ?? null,
                'cpf' => $data['cpf'] ?? null,
                'endereco_id' => $enderecoId,
            ]);

            return $user->load(['roles', 'funcionario']);
        });
    }

    public function paginateFor(User $actor, array $filters = []): LengthAwarePaginator
    {
        $query = User::query()->with(['roles', 'funcionario']);

        if ($this->isGestor($actor)) {
            $query->role(RoleEnum::FUNCIONARIO->value);
        }

        if (!empty($filters['role'])) {
            $query->role((string) $filters['role']);
        }

        if (!empty($filters['search'])) {
            $search = (string) $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $perPage = (int) ($filters['per_page'] ?? 15);
        $perPage = max(1, min(100, $perPage));

        return $query->orderBy('name')->paginate($perPage);
    }

    public function findFor(User $actor, User $target): User
    {
        $this->assertCanManageTarget($actor, $target);

        return $target->load(['roles', 'funcionario']);
    }

    public function update(User $actor, User $target, array $data): User
    {
        $this->assertCanManageTarget($actor, $target);

        return DB::transaction(function () use ($target, $data) {
            if (array_key_exists('name', $data)) {
                $target->name = $data['name'];
            }

            if (array_key_exists('email', $data)) {
                $target->email = $data['email'];
            }

            if (!empty($data['password'])) {
                $target->password = $data['password'];
            }

            $target->save();

            if (!empty($data['role'])) {
                $target->syncRoles([(string) $data['role']]);
            }

            if (
                array_key_exists('telefone', $data)
                || array_key_exists('data_nascimento', $data)
                || array_key_exists('cpf', $data)
                || array_key_exists('endereco', $data)
            ) {
                /** @var Funcionario $funcionario */
                $funcionario = Funcionario::firstOrNew([
                    'id' => $target->id
                ]);

                if (array_key_exists('telefone', $data)) {
                    $funcionario->telefone = $data['telefone'];
                }

                if (array_key_exists('data_nascimento', $data)) {
                    $funcionario->data_nascimento = $data['data_nascimento'];
                }

                if (array_key_exists('cpf', $data)) {
                    $funcionario->cpf = $data['cpf'];
                }

                if (array_key_exists('endereco', $data)) {
                    $enderecoPayload = $data['endereco'];

                    if (empty($enderecoPayload)) {
                        $funcionario->endereco_id = null;
                    } else {
                        $endereco = $funcionario->endereco_id
                            ? Endereco::find($funcionario->endereco_id)
                            : null;

                        if ($endereco) {
                            $endereco->update($enderecoPayload);
                        } else {
                            $endereco = Endereco::create($enderecoPayload);
                            $funcionario->endereco_id = $endereco->id;
                        }
                    }
                }

                $funcionario->save();
            }

            return $target->load(['roles', 'funcionario']);
        });
    }

    public function delete(User $actor, User $target): void
    {
        if ((string) $actor->getKey() === (string) $target->getKey()) {
            throw new AuthorizationException('Você não pode remover o próprio usuário.');
        }

        $this->assertCanManageTarget($actor, $target);

        $target->delete();
    }

    private function assertCanManageTarget(User $actor, User $target): void
    {
        if ($this->isAdmin($actor)) {
            return;
        }

        if ($this->isGestor($actor) && $target->hasRole(RoleEnum::FUNCIONARIO->value)) {
            return;
        }

        throw new AuthorizationException('Você não tem permissão para acessar este usuário.');
    }

    private function isAdmin(User $user): bool
    {
        return $user->hasRole(RoleEnum::ADMIN->value);
    }

    private function isGestor(User $user): bool
    {
        return $user->hasRole(RoleEnum::GESTOR->value);
    }
}
