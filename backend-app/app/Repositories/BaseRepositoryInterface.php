<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface BaseRepositoryInterface
{

    public function all(): Collection;

    public function paginate(int $perPage = 15, int $page = null): LengthAwarePaginator;

    public function find($id);

    public function findOrFail($id);

    public function create(array $data);

    public function update($id, array $data);

    public function delete($id): bool;

    public function where(array $conditions): Builder;

    public function with(array $relations): Builder;

    public function attach($id, string $relation, $relatedIds): bool;

    public function detach($id, string $relation, $relatedIds): bool;
}
