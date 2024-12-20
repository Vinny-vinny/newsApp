<?php

namespace App\Console\Commands;

use App\Models\Article;
use App\Models\Source;
use Carbon\Carbon;
use Illuminate\Console\Command;
use GuzzleHttp\Client;

class FetchNews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch:news';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch news articles from NewsAPI';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $query = 'general';
        // Initialize the Guzzle client
        $client = new Client();

        try {
            // Make the GET request
            $response = $client->get(config('datasource.NEWSAPI_BASE_URL'), [
                'query' => [
                    'q' => $query,
                    'apiKey' => config('datasource.NEWSAPI_KEY'),
                ],
            ]);

            // Decode the JSON response
            $payload = json_decode($response->getBody(), true);

            // Check if articles exist
            if (!empty($payload['articles'])) {
                foreach ($payload['articles'] as $article) {
                    $sourceName = $article['source']['name'];
                    if ($article['title'] =="[Removed]") {
                        continue;
                    }
                     $source = Source::firstOrCreate(['name' => $sourceName]);
                       Article::create([
                           "author" => $article['author'] ?? "UNKNOWN",
                           "title" => $article['title'],
                           "description" => $article['description'],
                           "image" => $article['urlToImage'],
                           "date_published" => Carbon::parse($article['publishedAt'])->toDateString(),
                           "content" => $article['content'],
                           "source_id" => $source->id,
                       ]);
                    }
            } else {
                $this->warn('No articles found.');
            }

            return Command::SUCCESS;

        } catch (\Exception $e) {
            // Handle errors
            $this->error("Error: " . $e->getMessage());
            return Command::FAILURE;
        }
    }
}
