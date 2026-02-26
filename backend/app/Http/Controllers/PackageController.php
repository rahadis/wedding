<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PackageController extends Controller
{
    public function index(){
        $packages = Package::with('category')->get();

        if ($packages->isEmpty()){
            return response()->json([
                "success" => true,
                "message" => "Resource data not found!"
            ], 200);
        }

        $data = $packages->map(function ($pkg) {
            return [
                'id' => $pkg->id,
                'name' => $pkg->name,
                'description' => $pkg->description,
                'image' => $pkg->image,
                'price' => $pkg->price,
                'categories_id' => $pkg->categories_id,
                'category_name' => $pkg->category ? $pkg->category->category_name : null,
                'created_at' => $pkg->created_at,
                'updated_at' => $pkg->updated_at
            ];
        });

        return response()->json([
            "success" => true,
            "message" => "Get All Resource",
            "data" => $data
        ], 200);
    }

    public function store(Request $request){
        // 1. Validator
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,jpg,png|max:2048',
            'price' => 'required|numeric',
            'categories_id' => 'required|exists:categories,id',
        ]);

        // 2. Check Validator eror
        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => $validator->errors()
            ], 422);
        }

        // 3. Upload Image
        $image = $request->file('image');
        $image->store('packages', 'public');

        // 4. Insert data
        $package = Package::create([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $image->hashName(),
            'price' => $request->price,
            'categories_id' => $request->categories_id
        ]);

        // 5. Response
        return response()->json([
            "success" => true,
            "message" => "Resource added successfully",
            "data" => $package
        ]);
    }

    public function show(string $id){
        $package = Package::find($id);

        if (!$package){
            return response()->json([
                "success" => false,
                "message" => "Resource not found"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Get detail resource",
            "data" => $package
        ], 200);
    }

    public function update(string $id, Request $request){
        // 1. Mencari data
        $package = Package::find($id);

        if (!$package){
            return response()->json([
                "success" => false,
                "message" => "Resource not found"
            ], 404);
        }

        // 2. Validator
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
            'price' => 'required|numeric',
            'categories_id' => 'required|exists:categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => $validator->errors()
            ], 422);
        }

        // 3. Siapkan data yang ingin diupdate
        $data = [
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'categories_id' => $request->categories_id
        ];

        // 4. Handle image (upload & delete image)
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image->store('packages', 'public');

            if ($package->image){
                Storage::disk('public')->delete('packages/'.$package->image);
            }

            $data['image'] = $image->hashName();
        }


        // 5. Update data baru ke database
        $package->update($data);

        return response()->json([
            "success" => true,
            "message" => "Resource updated successfully",
            "data" => $package
        ], 200);
    }

    public function destroy(string $id){
       $package = Package::find($id);

       if (!$package){
            return response()->json([
                "success" => false,
                "message" => "Resource not found"
            ], 404);
       }

       if ($package->image){
        // delete from storage
        Storage::disk('public')->delete('packages/'.$package->image);
       }

       $package->delete();

       return response()->json([
            "success" => true,
            "message" => "Delete resource successfully"
        ], 200);
    }
}
