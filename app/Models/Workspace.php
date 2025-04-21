<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Workspace extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'coover',
        'logo',
        'visibility',
    ];
    protected function cats(): array
    {
        return [
            'visibility' => WorkspaceVisibility::class,
        ];
    }
}
