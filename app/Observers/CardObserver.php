<?php

namespace App\Observers;

use App\Models\Card;
use Illuminate\Support\Facades\Auth;

class CardObserver
{
    public function created(Card $card)
    {
        $user = Auth::user();

        $card->members()->create([
            'user_id' => $user->id,
            'role' => $card->user_id == $user->id ? 'Owner' : 'Member',
        ]);
    }

    public function deleted(Card $card)
    {
        $card->members()->delete();
    }
}
