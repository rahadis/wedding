<?php

namespace App\Http\Controllers;
use App\Models\Transaction;
use App\Models\EventReport;
use Illuminate\Http\Request;

class EventReportController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'transaction_id' => 'required|exists:transactions,id',
            'evaluation' => 'required|string',
            'documentation' => 'nullable|image|max:2048'
        ]);

        $path = null;

        if ($request->hasFile('documentation')) {
            $path = $request->file('documentation')
                ->store('reports', 'public');
        }

        $report = EventReport::create([
            'transaction_id' => $request->transaction_id,
            'evaluation' => $request->evaluation,
            'documentation' => $path
        ]);

        return response()->json([
            'success' => true,
            'data' => $report
        ]);
    }

    public function index()
    {
        return response()->json(EventReport::all());
    }
}