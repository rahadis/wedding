<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index(){
        $categories = Category::all();
        
        if ($categories->isEmpty()){
            return response()->json([
                "success" => true,
                "message" => "Resource data not found!"
            ], 200);
        }

        return response()->json([
            "success" => true,
            "message" => "Get All Resource",
            "data" => $categories
        ], 200);
    }

    public function store(Request $request){
        // 1. Validator
        $validator = Validator::make($request->all(), [
            'category_name' => 'required|string',
            'description' => 'required|string'
        ]);

        // 2. Check Validator eror
        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => $validator->errors()
            ], 422);
        }

        // 3. Insert data
        $category = Category::create([
            'category_name' => $request->category_name,
            'description' => $request->description
        ]);
        
        // 4. Response
        return response()->json([
            "success" => true,
            "message" => "Resource added successfully",
            "data" => $category
        ]);
    }

    public function show(string $id){
        $category = Category::find($id);
        
        if (!$category){
            return response()->json([
                "success" => false,
                "message" => "Resource not found"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Get detail resource",
            "data" => $category
        ], 200);
    }

     public function update(string $id, Request $request){
        // 1. Mencari data
        $category = Category::find($id);

        if (!$category){
            return response()->json([
                "success" => false,
                "message" => "Resource not found"
            ], 404);
        }

        // 2. Validator
        $validator = Validator::make($request->all(), [
            'category_name' => 'required|string',
            'description' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => $validator->errors()
            ], 422);
        }

        // 3. Siapkan data yang ingin diupdate
        $data = [
            'category_name' => $request->category_name,
            'description' => $request->description
        ];  

        // 4. Update data baru ke database
        $category->update($data);

        return response()->json([
            "success" => true,
            "message" => "Resource updated successfully",
            "data" => $category
        ], 200);
    }

    public function destroy(string $id){
       $category = Category::find($id);

       if (!$category){
            return response()->json([
                "success" => false,
                "message" => "Resource not found"
            ], 404);
       }

       $category->delete();
       return response()->json([
            "success" => true,
            "message" => "Delete resource successfully"
        ], 200);
    }
}
