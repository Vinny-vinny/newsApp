<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class BaseRepository implements BaseRepositoryInterface
{
    protected $model;

    public function __construct($model)
    {
        $this->model = $model;
    }

    public function all(): Collection
    {
        return $this->model->all();
    }

    public function paginate($perPage = 15, $page = null): LengthAwarePaginator
    {
        return $this->model->paginate($perPage, ["*"], "page", $page);
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function findOrFail($id)
    {
        return $this->model->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $model = $this->find($id);
        $model->update($data);
        return $model;
    }

    public function delete($id): bool
    {
        $model = $this->find($id);
        return $model->delete();
    }

    public function where(array $conditions): Builder
    {
        return $this->model->where($conditions);
    }

    public function with(array $relations): Builder
    {
        return $this->model->with($relations);
    }

    public function attach($id, string $relation, $relatedIds): bool
    {
        $model = $this->findOrFail($id);
        $model->$relation()->attach($relatedIds);
        return true;
    }

    public function detach($id, string $relation, $relatedIds): bool
    {
        $model = $this->findOrFail($id);
        $model->$relation()->detach($relatedIds);
        return true;
    }
}
