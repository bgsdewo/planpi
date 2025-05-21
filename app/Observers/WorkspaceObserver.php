<?php

namespace App\Observers;

use App\Models\Workspace;
use Illuminate\Support\Facades\Auth;

class WorkspaceObserver
{
    public function created(Workspace $workspace)
    {
        $user = Auth::user();

        $workspace->members()->create([
            'user_id' => $user->id,
            'role' => $workspace->user_id == $user->id ? 'Owner' : 'Member',
        ]);
    }

    public function deleted(Workspace $workspace)
    {
        $workspace->members()->delete();
    }
}
