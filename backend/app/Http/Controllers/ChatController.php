<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    // ===============================
    // USER KIRIM PESAN KE ADMIN
    // ===============================
    public function sendFromUser(Request $request)
    {
        $request->validate([
            'message' => 'required|string'
        ]);

        $user = auth()->guard('api')->user();

        if (!$user) {
            return response()->json([
                'message' => 'User tidak terautentikasi'
            ], 401);
        }

        $admin = User::where('role', 'admin')->first();

        if (!$admin) {
            return response()->json([
                'message' => 'Admin tidak ditemukan'
            ], 404);
        }

        $chat = Chat::create([
            'user_id' => $user->id,
            'admin_id' => $admin->id,
            'message' => $request->message,
            'sender' => 'user'
        ]);

        return response()->json([
            'success' => true,
            'data' => $chat
        ]);
    }

    // ===============================
    // ADMIN BALAS KE USER
    // ===============================
    public function sendFromAdmin(Request $request, $userId)
    {
        $request->validate([
            'message' => 'required|string'
        ]);

        $admin = auth()->guard('api')->user();

        if (!$admin || $admin->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $chat = Chat::create([
            'user_id' => $userId,
            'admin_id' => $admin->id,
            'message' => $request->message,
            'sender' => 'admin'
        ]);

        return response()->json([
            'success' => true,
            'data' => $chat
        ]);
    }

    // ===============================
    // AMBIL CHAT USER
    // ===============================
    public function getChat($userId)
    {
        $user = auth()->guard('api')->user();

        if (!$user) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $chats = Chat::where('user_id', $userId)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($chats);
    }
}