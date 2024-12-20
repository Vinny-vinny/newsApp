<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginFormRequest;
use App\Http\Requests\RegisterFormRequest;
use App\Http\Resources\UserResource;
use App\Repositories\UserRepository;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use ApiResponse;

    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @param LoginFormRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginFormRequest $request)
    {
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            return $this->sendResponse([
                'token' => $user->createToken('authToken')->plainTextToken,
                'user' => new UserResource($user)
            ], 'Login successful.');
        }

        return $this->sendError("Invalid credentials", [], 401);
    }

    /**
     * @param RegisterFormRequest $request
     * @return JsonResponse
     */
    public function register(RegisterFormRequest $request): JsonResponse
    {
        $user = $this->userRepository->create($request->validated());
        return $this->sendResponse(new UserResource($user), 'Registration successful.');
    }

//    public function search(Request $request)
//    {
//        $keyword = $request->input('keyword', '');
//        $dateFrom = $request->input('date_from');
//        $dateTo = $request->input('date_to');
//        $perPage = $request->input('per_page', 15);
//
//        $results = $this->userRepository->search($keyword, $dateFrom, $dateTo, $perPage);
//
//        // Use sendPaginatedResponse with UserResource
//        return $this->sendPaginatedResponse($results, 'Users retrieved successfully.', UserResource::class);
//    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        $this->sendResponse([], 'Logged out successfully.');
    }
}
