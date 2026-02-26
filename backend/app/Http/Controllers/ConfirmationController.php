<?php

namespace App\Http\Controllers;

use App\Models\Confirmation;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ConfirmationController extends Controller
{
    public function index(){
        $confirmations = Confirmation::with(['user', 'transaction.user'])->get();

        $data = $confirmations->map(function ($item) {
            return [
                'id' => $item->id,
                'transactions_id' => $item->transactions_id,
                'user_id' => $item->user_id,
                'user_name' => $item->user ? $item->user->name : ($item->transaction->user->name ?? null),
                'image' => $item->image,
                'payment_date' => $item->payment_date,
                'payment_method' => $item->payment_method,
                'status' => $item->status,
                'admin_name' => $item->admin_name,
                'created_at' => $item->created_at,
                'updated_at' => $item->updated_at,
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
            'image' => 'required|image|mimes:jpeg,jpg,png|max:2048',
            'payment_method' => 'required|string',
            'payment_date' => 'required|date_format:Y-m-d',
        ]);

        if ($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $transaction = Transaction::where('user_id', $customerId)
                    ->where('status', 'Waiting verification')
                    ->latest()
                    ->first();

        if (!$transaction) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak ada transaksi aktif untuk dikonfirmasi.'
            ], 404);
        }

        $image = $request->file('image');
        $image->store('confirmations', 'public');

        $confirmation = Confirmation::create([
            'transactions_id' => $transaction->id,
            'image' => $image->hashName(),
            'payment_date' =>  $request-> payment_date,
            'payment_method' =>  $request-> payment_method,
            'status' => 'Waiting verification',
            'user_id' => null,
            'admin_name' => null
        ]);

        return response()->json([
            "success" => true,
                "message" => "Get All Resource",
                "data" => $confirmation
        ], 201); 
    }

    public function show($id){
        $confirmation = Confirmation::find($id);

        if (!$confirmation) {
            return response()->json([
                'success' => false,
                'message' => 'Data konfirmasi tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Data konfirmasi ditemukan',
            'data' => $confirmation
        ], 200);
    }

    public function update(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:Waiting verification,Paid,Rejected'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $confirmation = Confirmation::findOrFail($id);

        $confirmation->user_id = auth()->id();
        $confirmation->admin_name = auth()->user()->name; 
        $confirmation->status = $request->status;
        $confirmation->save();

        $confirmation->transaction->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'message' => 'Status berhasil diperbarui',
            'data' => [
                'confirmation' => $confirmation,
                'admin_name' => $confirmation->admin->name,
        ]
        ]);
    }

    public function destroy($id){
        $confirmation = Confirmation::find($id);

        if (!$confirmation) {
            return response()->json([
                'success' => false,
                'message' => 'Data konfirmasi tidak ditemukan'
            ], 404);
        }

        $confirmation->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data konfirmasi berhasil dihapus'
        ], 200);
    }
}
