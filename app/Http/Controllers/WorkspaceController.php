<?php

namespace App\Http\Controllers;

use App\Enums\WorkspaceVisibility;
use App\Http\Requests\WorkspaceRequest;
use Illuminate\Http\Request;
use Inertia\Response;
use App\Traits\HasFile;

class WorkspaceController extends Controller
{
    use HasFile;
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
    public function store(WorkspaceRequest $request)
    {
        $request->user()->workspaces()->create([
            'name' => $name = $request -> name,
            'slug' => str()->slug($name.str()->UUid(10)),
            'cover' => $this->upload_file($request,'cover','workspaces/cover'),
            'logo' => $this->upload_file($request,'logo','workspaces/logo'),
            'visibility' => $request->visibility,
        ]);

        flashMessage('Workspace information saved succesfully');



        return back();
    }
}
