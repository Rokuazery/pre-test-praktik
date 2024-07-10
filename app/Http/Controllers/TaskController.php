<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::findOrFail(auth()->id());
        $tasks = $user->tasks()->paginate(5);

        return Inertia::render('Task/Index', ['tasks' => $tasks]);
    }
    public function showCreate()
    {
        return Inertia::render('Task/Create');

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $request->validate([
            'title' => ['required', 'max:255'],
            'due_date' => ['nullable'], // Validate ISO 8601 format
        ]);

        // Parse and format due_date if provided
        $dueDate = $request->filled('due_date') ? date('Y-m-d', strtotime($request->due_date)) : null;

        Task::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'due_date' => $dueDate, // Use formatted due_date
        ]);


        return Redirect::route('tasks.index');
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //

        // return Inertia::render('Profile/Edit', [
        //     'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
        //     'status' => session('status'),
        // ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateStatus(string $id, string $status)
    {
        $task = Task::findOrFail($id);
        Log::info($status);
        $task->is_completed = $status == 'true' ? 1 : 0;
        $task->save();
        // $task->update(
        //     ['is_completed' => $status]
        // );

        return redirect()->route('tasks.index');
    }

    public function update(string $id)
    {
        // Log::debug('Request data for updating task:', $request->all());
        // $task = Task::findOrFail($id);
        // $task->update($request->all());



        return redirect()->route('tasks.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return redirect()->route('tasks.index');
    }
}
