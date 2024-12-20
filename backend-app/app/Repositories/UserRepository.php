<?php

namespace App\Repositories;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;

class UserRepository extends BaseRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }
    /**
     * Search users by keyword, date range
     *
     * @param string $keyword
     * @param string|null $dateFrom
     * @param string|null $dateTo
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function search(string $keyword = '', ?string $dateFrom = null, ?string $dateTo = null, $perPage = 15): LengthAwarePaginator
    {
        $query = $this->model->newQuery();

        // Keyword search on name or email
        if (!empty($keyword)) {
            $query->where(function ($query) use ($keyword) {
                $query->where('name', 'like', '%' . $keyword . '%')
                    ->orWhere('email', 'like', '%' . $keyword . '%');
            });
        }

        // Filter by date range
        if ($dateFrom) {
            $query->whereDate('created_at', '>=', Carbon::parse($dateFrom));
        }

        if ($dateTo) {
            $query->whereDate('created_at', '<=', Carbon::parse($dateTo));
        }
        return $query->paginate($perPage);
    }
}
