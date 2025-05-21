<?php

namespace App\Http\Controllers;

use App\Traits\HasFile;//done
use App\Models\User;//done
use Illuminate\Http\Request;//done
use Inertia\Response;//done
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\UserResource;//done
use App\Http\Requests\UserRequest; //done
use Illuminate\Support\Facades\Hash;//done
class UserController extends Controller
{
    use HasFile;
    public function index(): Response
{
    $users = User::query()
        ->select(['id', 'name', 'email', 'username', 'avatar', 'created_at'])
        ->when(request()->search, function($query, $value) {
            $query->whereAny([
                'name',
                'username',
                'email'
            ],'REGEXP', $value);
        })
        ->when(request()->field && request()->direction,fn($query) => $query->orderBy(request() ->field,request()->direction))
        ->paginate(request()->load ?? 10)
        ->withQueryString();

        return inertia('Users/Index',[
            'users' => fn() => UserResource::collection($users)->additional([
                'meta' => [
                    'has_pages' => $users->hasPages(),
                ],
            ]),
            'page_settings' => [
            'title' => 'Peoples',
            'subtitle' => 'A list of all the peoples in your platform',
            ],
            'state' => [
                'page' => request()-> page?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ],
        ]);
    }
    public function create(): Response
    {
        return inertia('Users/Create',[
            'page_settings' => [
                'title' => 'Create People',
                'subtitle' => 'Fill out this form to add a new people',
                'method' => 'POST',
                'action' => route('users.store'),
            ],
        ]);
    }
    public function store(UserRequest $request): RedirectResponse
    {
        User::create([
            'name' => $request ->name,
            'username' => $request->username,
            'email' => $request -> email,
            'password' => Hash::make($request->password),
            'avatar' => $this->upload_file($request,'avatar','users'),
        ]);
        flashMessage('User information saved successfully');
        return to_route('users.index');
    }

    public function edit(User $user): Response
    {
        return inertia('Users/Edit',[
            'user' => $user,
            'page_settings' => [
                'title' => 'Edit People',
                'subtitle' => 'Fill out this form to edit people',
                'method' => 'PUT',
                'action' => route('users.update',$user),
            ],
        ]);
    }
    public function update( User $user, UserRequest $request): RedirectResponse
    {
        $user->update([
            'name' => $request ->name,
            'username' => $request->username,
            'email' => $request -> email,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
            'avatar' => $request->hasFile('avatar') ? $this->upload_file($request,'avatar','users') : $user->avatar,
        ]);
        flashMessage('Successfully updated user information');
        return to_route('users.index');
    }
}