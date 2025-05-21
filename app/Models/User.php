<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Workspace;
use App\Models\Card;
use App\Models\Member;
use App\Models\Attachment;
use App\Models\Task;
use Spatie\Permission\Traits\HasRoles;
class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
        'username',
        'avatar',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function workspaces(): HasMany
    {
        return $this->hasMany(Workspace::class);
    }

    public function cards(): HasMany
    {
        return $this->hasMany(Card::class);
    }

    public function members(): HasMany
    {
        return $this->hasMany(Member::class);
    }

    public function attachments(): HasMany
    {
        return $this->hasMany(Attachment::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
