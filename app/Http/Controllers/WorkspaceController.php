<?php

namespace App\Http\Controllers;

use App\Enums\WorkspaceVisibility;
use Illuminate\Http\Request;
use Inertia\Response;

class WorkspaceController extends Controller
{
    public function create(): Response
    {
        return inertia(component: 'Workspaces/Create',props:[
            'page_settings'=>[
                'title'=>'Create Workspace',
                'subtitle'=>'Fill out this form to add a new workspace',
                'method' => 'POST',
                'action'=>route('workspaces.store'),
            ],
            'visibilities'=> WorkspaceVisibility::options(),
        ]);
    }
}