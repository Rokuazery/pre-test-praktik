<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Get all user IDs
        $userIds = User::pluck('id');

        // Define the number of tasks to create
        $numberOfTasks = 10;

        // Create random tasks for each user
        foreach ($userIds as $userId) {
            for ($i = 0; $i < $numberOfTasks; $i++) {
                Task::create([
                    'user_id' => $userId,
                    'is_completed' => (bool)rand(0,1),
                    'title' => 'Task ' . ($i + 1),
                    'due_date' => Carbon::now()->addDays(rand(1, 30))->toDateString(),
                ]);
            }
        }
    }
}
