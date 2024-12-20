<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $guarded = [];

    public function source()
    {
        return $this->belongsTo(Source::class);
    }
}
