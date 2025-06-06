<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        $todos = Todo::where('user_id', auth()->user()->id)->get();

        return response()->json($todos);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'todo' => 'required|string|max:255',
            'priority' => 'required|in:low,medium,high',
            'deadline_date' => 'required|date',
        ]);

        $todo = Todo::create([
            'user_id' => auth()->user()->id,
            'todo' => $validated['todo'],
            'priority' => $validated['priority'],
            'deadline_date' => $validated['deadline_date'],
            'status' => 'waiting',
        ]);

        return response()->json([
            'message' => 'Todo created successfully!',
            'data' => $todo,
        ], 201);
    }

    public function show($id)
    {
        $todo = Todo::where('id', $id)->where('user_id', auth()->user()->id)->first();

        if (!$todo) {
            return response()->json(['message' => 'Todo not found.'], 404);
        }

        return response()->json($todo);
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::where('id', $id)->where('user_id', auth()->user()->id)->first();

        if (!$todo) {
            return response()->json(['message' => 'Todo not found.'], 404);
        }

        $validated = $request->validate([
            'todo' => 'required|string|max:255',
            'priority' => 'required|in:low,medium,high',
            'deadline_date' => 'required|date',
        ]);

        $todo->update($validated);

        return response()->json([
            'message' => 'Todo updated successfully!',
            'data' => $todo,
        ]);
    }

    public function toggleStatus($id)
    {
        $todo = Todo::where('id', $id)->where('user_id', auth()->user()->id)->first();

        if (!$todo) {
            return response()->json(['message' => 'Todo not found.'], 404);
        }

        $todo->status = $todo->status === 'done' ? 'waiting' : 'done';
        $todo->save();

        return response()->json([
            'message' => 'Todo status updated successfully!',
            'data' => $todo,
        ]);
    }

    public function destroy($id)
    {
        $todo = Todo::where('id', $id)->where('user_id', auth()->user()->id)->first();

        if (!$todo) {
            return response()->json(['message' => 'Todo not found.'], 404);
        }

        $todo->delete();

        return response()->json(['message' => 'Todo deleted successfully.']);
    }
}