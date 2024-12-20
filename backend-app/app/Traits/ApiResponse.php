<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;

trait ApiResponse
{
    /** Success response method.
     * @param $result
     * @param $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendResponse($result, $message): JsonResponse
    {
        // Check if the result is an instance of a Resource (e.g., ArticlesResource)
        if ($result instanceof \Illuminate\Http\Resources\Json\JsonResource) {
            $result = $result->response()->getData(true);
        }

        $response = [
            'success' => true,
            'message' => $message,
            'data' => $result
        ];

        return response()->json($response);
    }

    /** Return error response.
     * @param $error
     * @param $errorMessages
     * @param $code
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendError($error, $errorMessages = [], $code = 404): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $error
        ];

        if (!empty($errorMessages)) {
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }

    /**
     * @param LengthAwarePaginator $paginator
     * @param string $message
     * @param string|null $resource
     * @return JsonResponse
     */
    public function sendPaginatedResponse(LengthAwarePaginator $paginator, string $message, ?string $resource = null, bool $success = true): JsonResponse
    {
        // Transform items using the resource class if provided, otherwise return raw items
        $data = $resource ? $resource::collection($paginator->items()) : $paginator->items();

        // Prepare the response structure
        $response = [
            'success' => $success,
            'message' => $message,
            'data' => $data,
            'pagination' => [
                'total' => $paginator->total(),
                'count' => $paginator->count(),
                'per_page' => $paginator->perPage(),
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'first_item' => $paginator->firstItem(),
                'last_item' => $paginator->lastItem(),
                'next_page_url' => $paginator->nextPageUrl(),
                'prev_page_url' => $paginator->previousPageUrl(),
            ],
        ];

        return response()->json($response);
    }
}
