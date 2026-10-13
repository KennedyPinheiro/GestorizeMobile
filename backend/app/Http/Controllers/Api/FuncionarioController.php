<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FuncionarioStoreRequest;
use App\Http\Resources\FuncionarioResource;
use App\Models\Funcionario;
use App\Models\User;
use App\Services\FuncionarioImagemService;
use App\Services\FuncionarioService;
use App\Services\ResponseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class FuncionarioController extends Controller
{
    public function __construct(
        private FuncionarioService $service,
        private FuncionarioImagemService $imagemService,
    ) {}

    public function store(
        FuncionarioStoreRequest $request
    ): JsonResponse {
        $funcionario = $this->service->criar(
            $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' => 'Funcionário criado com sucesso.',
            'data' => new FuncionarioResource($funcionario),
        ], 201);
    }

    public function atualizarAvatar(
        Request $request,
        string $id
    ): JsonResponse {
        $request->validate([
            'avatar' => [
                'required',
                'image',
                'mimes:jpeg,jpg,png,webp',
                'max:5120',
            ],
        ]);

        $funcionario = $this->imagemService->salvar(
            $id,
            $request->file('avatar')
        );

        return ResponseService::success(
            new FuncionarioResource($funcionario),
            'Avatar atualizado com sucesso.'
        );
    }

    public function removerAvatar(string $id): JsonResponse
    {
        $funcionario = $this->imagemService->remover($id);

        return ResponseService::success(
            new FuncionarioResource($funcionario),
            'Avatar removido com sucesso.'
        );
    }

    public function listar(): LengthAwarePaginator
    {
        return Funcionario::with([
            'user.roles',
            'endereco',
        ])
            ->orderBy('created_at', 'desc')
            ->paginate(15);
    }

    /**
     * Busca um funcionário pelo UUID.
     */
    public function buscar(string $id): Funcionario
    {
        return Funcionario::with([
            'user.roles',
            'endereco',
        ])->findOrFail($id);
    }

    /**
     * Cadastra um usuário e seus dados de funcionário.
     */
    public function criar(array $dados): Funcionario
    {
        return DB::transaction(function () use ($dados) {
            $user = User::create([
                'name' => $dados['name'],
                'email' => $dados['email'],
                'password' => $dados['password'],
            ]);

            $user->assignRole($dados['role']);

            $user->syncPermissions(
                $dados['permissions'] ?? []
            );

            $funcionario = $user->funcionario()->create([
                'telefone' => $dados['telefone'],
                'data_nascimento' => $dados['data_nascimento'],
                'cpf' => $dados['cpf'],
                'endereco_id' => $dados['endereco_id'] ?? null,
            ]);

            return $funcionario->load([
                'user.roles',
                'endereco',
            ]);
        });
    }

    /**
     * Atualiza os dados do usuário e do funcionário.
     */
    public function atualizar(
        string $id,
        array $dados
    ): Funcionario {
        return DB::transaction(function () use ($id, $dados) {
            $funcionario = Funcionario::with('user')
                ->findOrFail($id);

            $user = $funcionario->user;

            /*
             * Atualiza os dados da tabela users.
             */
            $dadosUsuario = [];

            if (array_key_exists('name', $dados)) {
                $dadosUsuario['name'] = $dados['name'];
            }

            if (array_key_exists('email', $dados)) {
                $dadosUsuario['email'] = $dados['email'];
            }

            if (
                array_key_exists('password', $dados)
                && filled($dados['password'])
            ) {
                $dadosUsuario['password'] = $dados['password'];
            }

            if (! empty($dadosUsuario)) {
                $user->update($dadosUsuario);
            }

            /*
             * Atualiza o perfil somente quando informado.
             */
            if (array_key_exists('role', $dados)) {
                $user->syncRoles([$dados['role']]);
            }

            /*
             * Atualiza as permissões diretas somente quando
             * a chave permissions estiver presente na requisição.
             *
             * Um array vazio remove as permissões diretas.
             */
            if (array_key_exists('permissions', $dados)) {
                $user->syncPermissions(
                    $dados['permissions'] ?? []
                );
            }

            /*
             * Atualiza os dados da tabela funcionarios.
             */
            $dadosFuncionario = [];

            foreach (
                [
                    'telefone',
                    'data_nascimento',
                    'cpf',
                    'endereco_id',
                ] as $campo
            ) {
                if (array_key_exists($campo, $dados)) {
                    $dadosFuncionario[$campo] = $dados[$campo];
                }
            }

            if (! empty($dadosFuncionario)) {
                $funcionario->update($dadosFuncionario);
            }

            return $funcionario->fresh([
                'user.roles',
                'endereco',
            ]);
        });
    }

    /**
     * Exclui o funcionário e sua conta de usuário.
     */
    public function deletar(string $id): void
    {
        DB::transaction(function () use ($id) {
            $funcionario = Funcionario::with('user')
                ->findOrFail($id);

            $user = $funcionario->user;

            /*
             * Remove o arquivo do avatar, caso exista.
             */
            if ($user?->avatar) {
                Storage::disk('public')->delete(
                    $user->avatar
                );
            }

            /*
             * Exclui primeiro o funcionário para evitar
             * conflito com a chave estrangeira user_id.
             */
            $funcionario->delete();

            /*
             * A conta é removida junto com o funcionário.
             */
            $user?->delete();
        });
    }
}
