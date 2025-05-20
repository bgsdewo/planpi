<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use App\Models\User;
use App\Models\Member;
use App\Models\Workspace;
use App\Models\Card;
use App\Enums\CardStatus;
use Carbon\Carbon;
class DashboardController extends Controller
{
 public function index():Response
 {
    return inertia('Dashboard',[
        'page_settings' => [
            'title' => 'Dashboard',
            'subtitle' => 'You can see a summary of the information here',
        ],
        'productivity_chart' => $this->productivityChart(),
        'count' => [
            'users' => fn() => User::count(),
            'workspaces' => fn() => Member::query()
            ->where('members.user_id',request()->user()->id)
            ->whereHasMorph('memberable', Workspace::class)
            ->count(),
        'tasks' => fn() => Member::query()
            ->where('members.user_id',request()->user()->id)
            ->whereHasMorph('memberable', Card::class)
            ->count(),
        'dones' => fn() => Member::query()
            ->where('members.user_id',request()->user()->id)
            ->whereHasMorph('memberable', Card::class,
              fn($query) => $query->where('status', CardStatus::DONE->value)
            )
            ->count(),
        ]
    ]);
 }
 public function productivityChart(): array
{
    $currentDate = Carbon::now();

    $sixMonthsAgo = $currentDate->copy()->addMonths(-5);

    $labels = [];

    $datasets = [
        [
            'label' => 'To Do',
            'data' => [],
            'backgroundColor' => 'rgba(239, 68, 68, 1)',
        ],
        [
            'label' => 'In Progress',
            'data' => [],
            'backgroundColor' => 'rgba(59,130,246,1)',
        ],
        [
            'label' => 'On Review',
            'data' => [],
            'backgroundColor' => 'rgba(250,204,201,1)',
        ],
        [
            'label' => 'Done',
            'data' => [],
            'backgroundColor' => 'rgba(349,197,94,1)',
        ],
    ];
    for ($i = 0; $i < 6; $i++) {
        $month = $sixMonthsAgo->format('F');
        $labels[] = $month;

        $taskCountTodo = Member::query()
            ->where('members.user_id', request()->user()->id)
            ->whereHasMorph('memberable',Card::class,fn($query) => $query->where('status',CardStatus::TODO->value))
            ->whereMonth('created_at',$sixMonthsAgo-> month)
            ->count();

            $taskCountInProgress = Member::query()
            ->where('members.user_id', request()->user()->id)
            ->whereHasMorph('memberable',Card::class,fn($query) => $query->where('status',CardStatus::INPROGRESS->value))
            ->whereMonth('created_at',$sixMonthsAgo-> month)
            ->count();

            $taskCountOnReview = Member::query()
            ->where('members.user_id', request()->user()->id)
            ->whereHasMorph('memberable',Card::class,fn($query) => $query->where('status',CardStatus::ONREVIEW->value))
            ->whereMonth('created_at',$sixMonthsAgo-> month)
            ->count();

            $taskCountDone = Member::query()
            ->where('members.user_id', request()->user()->id)
            ->whereHasMorph('memberable',Card::class,fn($query) => $query->where('status',CardStatus::DONE->value))
            ->whereMonth('created_at',$sixMonthsAgo-> month)
            ->count();

            $datasets[0]['data'][] = $taskCountTodo;
            $datasets[1]['data'][] = $taskCountInProgress;
            $datasets[2]['data'][] = $taskCountOnReview;
            $datasets[3]['data'][] = $taskCountDone;

            $sixMonthsAgo->addMonth();
    }
    return [
        'label' => $labels,
        'datasets' => $datasets,
    ];
}
}


// workspace dan card belom di import