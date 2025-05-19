<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use App\Models\Member;
use App\Models\Card;
use App\Http\Resources\MyTaskResource;
class MyTaskController extends Controller
{

    public function __invoke(Request $request): Response
    {
        $tasks = Member::query()
        ->where('members.user_id', request()->user()->id)
        ->whereHasMorph( 'memberable',  Card::class)
        ->paginate(5);

    return inertia('Tasks/Index', [
        'tasks' => fn() => MyTaskResource::collection($tasks)->additional([
            'meta' => [
                'has_pages' => $tasks->hasPages(),
            ],
        ]),
        'page_settings' => [
            'title' => 'Tasks',
            'subtitle' => 'A list of all the task in your platform',
        ],
    ]);
    }
}
