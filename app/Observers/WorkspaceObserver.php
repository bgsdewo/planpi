<?php

namespace App\Observers;

use App\Models\Workspace;
use Illuminate\Support\Facades\Auth;

class WorkspaceObserver
{
    public function created(Workspace $workspace)
    {


        $workspace->members()->create([
            'user_id' => request()->user()->id,
            'role' => $workspace->user_id == request()->user()->id ? 'Owner' : 'Member',
        ]);
    }

    public function deleted(Workspace $workspace)
    {
        $workspace->members()->delete();
    }
}