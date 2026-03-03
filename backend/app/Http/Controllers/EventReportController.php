<?php

namespace App\Http\Controllers;
use App\Models\Transaction;
use App\Models\EventReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

    public function show($id)
    {
        $report = EventReport::findOrFail($id);
        return response()->json($report);
    }

    public function update(Request $request, $id)
    {
        $report = EventReport::findOrFail($id);

        $request->validate([
            'evaluation' => 'required|string',
            'documentation' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('documentation')) {
            if ($report->documentation) {
                Storage::disk('public')->delete($report->documentation);
            }
            $report->documentation = $request->file('documentation')->store('reports', 'public');
        }

        $report->evaluation = $request->evaluation;
        $report->save();

        return response()->json([
            'success' => true,
            'data' => $report
        ]);
    }

    public function destroy($id)
    {
        $report = EventReport::findOrFail($id);
        if ($report->documentation) {
            Storage::disk('public')->delete($report->documentation);
        }
        $report->delete();

        return response()->json(['success' => true]);
    }
}