<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use App\Enums\WorkspaceVisibility;
use App\Models\User;
use App\Models\Card;
use App\Models\Member;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use App\Observers\WorkspaceObserver;

#[ObservedBy(WorkspaceObserver::class)]
class Workspace extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'cover',
        'logo',
        'visibility',
    ];

    protected $casts = [
        'visibility' => WorkspaceVisibility::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function cards(): HasMany
    {
        return $this->hasMany(Card::class);
    }

    public function members(): MorphMany
    {
        return $this->morphMany(Member::class, 'memberable');
    }
}
