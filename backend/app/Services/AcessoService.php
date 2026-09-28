<?

namespace App\Services;

use App\Enums\RoleEnum;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use App\Exceptions\DomainException;
use Symfony\Component\HttpFoundation\Response;

class AcessoService
{
    public function listarPapeis()
    {
        return Role::with('permissions:id,name')->get();
    }

    public function listarPermissoes()
    {
        return Permission::orderBy('name')->pluck('name');
    }

    public function definirPermissoesDoPapel(string $roleId, array $permissoes): Role
    {
        $role = Role::findOrFail($roleId);

        if ($role->name === RoleEnum::ADMIN->value) {
            throw new DomainException(
                'O papel admin possui poder máximo e não pode ser alterado.',
                Response::HTTP_FORBIDDEN
            );
        }

        $role->syncPermissions($permissoes);

        return $role->load('permissions:id,name');
    }

    public function definirPermissoesDoUsuario(string $userId, array $permissoes): User
    {
        $user = User::findOrFail($userId);
        $user->syncPermissions($permissoes);

        return $user;
    }
}
