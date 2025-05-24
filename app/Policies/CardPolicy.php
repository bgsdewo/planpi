<?php

namespace App\Policies;

use App\Models\Card;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use App\Models\Member;
class CardPolicy
{
   public function edit_card(User $user, Card $card): bool
   {
    return $user->id === $card->user_id;
   }
   public function update_card(User $user, Card $card): bool
   {
    return $user->id === $card->user_id
    || Member::query()
        ->whereHasMorph('memberable', Card::class)
        ->where([
            ['user_id', $user->id],
            ['memberable_id', $card->id],
        ])
        ->exists();
   }
   public function delete_card(User $user, Card $card): bool
   {
    return $user->id === $card->user_id;
   }
   public function member_card(User $user, Card $card): bool
   {
    return $user->id === $card->user_id;
   }
   public function task_card(User $user, Card $card): bool
   {
    return Member::query()
    ->whereHasMorph(
        'memberable',
        Card::class
    )
    ->where([
        ['user_id',$user->id],
        ['memberable_id',$card->id],
    ])
    ->exists();
   }


}