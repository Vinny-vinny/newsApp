<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticlesResource;
use App\Models\Article;
use App\Repositories\ArticleRepository;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class ArticlesController extends Controller
{
    use ApiResponse;

    protected $articleRepository;

    public function __construct(ArticleRepository $articleRepository)
    {
        $this->articleRepository = $articleRepository;
    }

    public function index(Request $request)
    {
        $articles = $this->articleRepository->paginate($request->get('per_page', 12));
        return $this->sendPaginatedResponse($articles, "Articles List", ArticlesResource::class);
    }

    public function show($id)
    {
        $article = $this->articleRepository->findOrFail($id);

        return $this->sendResponse(new ArticlesResource($article), "Article Details");
    }
}
