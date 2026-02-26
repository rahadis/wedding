<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $transactions = Transaction::with(['user', 'package', 'confirmation'])->get();

        $data = $transactions->map(function ($trx) {
            return [
                'id' => $trx->id,
                'user_id' => $trx->user_id,
                'user_name' => $trx->user ? $trx->user->name : null,
                'packages_id' => $trx->packages_id,
                'package_name' => $trx->package ? $trx->package->name : null,
                'event_name' => $trx->event_name,
                'event_date' => $trx->event_date,
                'venue' => $trx->venue,
                'guest_count' => $trx->guest_count,
                'payment_method' => $trx->confirmation?->payment_method ?? null,
                'special_requests' => $trx->special_requests,
                'transaction_date' => $trx->transaction_date,
                'total' => $trx->total,
                'status' => $trx->status,
                'created_at' => $trx->created_at,
                'updated_at' => $trx->updated_at,
            ];
        });

        return response()->json([
            "success" => true,
            "message" => "Get All Resource",
            "data" => $data
        ], 200);
    }

    
    public function store(Request $request){
        $customerId = $request->user()->id;

        $validator = Validator::make($request->all(),[
            'packages_id' => 'required|integer',
            'event_name' => 'required|string',
            'event_date' => 'required|string',
            'event_time' => 'required|string',
            'venue' => 'required|string',
            'guest_count' => 'required|integer',
            'special_requests' => 'required|string'
        ]);

        if ($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $package = Package::findOrFail($request->packages_id);
        $total = $package->price;

        $transaction = Transaction::create([
            'user_id' => $customerId,
            'packages_id' => $request->packages_id,
            'event_name' => $request->event_name,
            'event_date' => $request->event_date,
            'event_time' => $request->event_time,
            'venue' => $request->venue,
            'guest_count' => $request->guest_count,
            'special_requests' => $request->special_requests,
            'total' => $total,
            'transaction_date' => now()->toDateString(),
            'status' => 'Waiting verification'
        ]);

        return response()->json([
            "success" => true,
                "message" => "Get All Resource",
                "data" => $transaction
        ], 201); 
    }

    public function show($id){
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json([
                'success' => false,
                'message' => 'Transaksi tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Transaksi ditemukan',
            'data' => $transaction
        ], 200);
    }

    public function destroy($id){
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json([
                'success' => false,
                'message' => 'Transaction tidak ditemukan'
            ], 404);
        }

        $transaction->delete();

        return response()->json([
            'success' => true,
            'message' => 'Transaction berhasil dihapus'
        ], 200);
    }
}
