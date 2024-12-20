<?php

namespace App\Traits;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

trait DataTransfer
{
    /**
     * Make a GET request to an external API.
     *
     * @param string $url
     * @param array $headers
     * @return array
     */
    public function getRequest(string $url, array $headers = []): array
    {
        $client = new Client();

        try {
            $response = $client->get($url, ['headers' => $headers]);
            return [
                'status' => true,
                'data' => json_decode($response->getBody(), true),
            ];
        } catch (RequestException $e) {
            return $this->handleRequestException($e);
        }
    }

    /**
     * Make a POST request to an external API.
     *
     * @param string $url
     * @param array $data
     * @param array $headers
     * @return array
     */
    public function postRequest(string $url, array $data, array $headers = []): array
    {
        $client = new Client();

        try {
            $response = $client->post($url, [
                'headers' => $headers,
                'json' => $data,
            ]);
            return [
                'status' => true,
                'data' => json_decode($response->getBody(), true),
            ];
        } catch (RequestException $e) {
            return $this->handleRequestException($e);
        }
    }

    /**
     * Handle RequestException and return a formatted response.
     *
     * @param RequestException $e
     * @return array
     */
    private function handleRequestException(RequestException $e): array
    {
        $response = $e->getResponse();
        $statusCode = $response ? $response->getStatusCode() : 500;
        $errorBody = $response ? json_decode($response->getBody(), true) : ['message' => 'Unknown error'];

        return [
            'status' => false,
            'status_code' => $statusCode,
            'error' => $errorBody,
        ];
    }
}
