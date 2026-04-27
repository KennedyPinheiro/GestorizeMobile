<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface IUserService
{
    public function create(array $data): User;
    public function paginateFor(User $actor, array $filters = []): LengthAwarePaginator;
    public function findFor(User $actor, User $target): User;
    public function update(User $actor, User $target, array $data): User;
    public function delete(User $actor, User $target): void;
}
