<?php

namespace App\Http\Controllers;

use App\Models\FormDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class FormController extends Controller
{
    public function submitForm(Request $request)
    {
        // Validation rules
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|unique:form_details,email|max:255',
            'mobileNumber' => 'required|numeric|digits_between:10,15',
            'address' => 'required|string|max:500',
            'profilePhoto' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'resume' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        // Handle file uploads
        $profilePhotoPath = $request->file('profilePhoto')->store('uploads/profile_photos', 'public');
        $resumePath = $request->file('resume')->store('uploads/resumes', 'public');

        // Save to database
        $formDetail = FormDetail::create([
            'first_name' => $request->input('firstName'),
            'last_name' => $request->input('lastName'),
            'email' => $request->input('email'),
            'mobile_number' => $request->input('mobileNumber'),
            'address' => $request->input('address'),
            'profile_photo' => $profilePhotoPath,
            'resume' => $resumePath,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Form submitted successfully!',
            'data' => $formDetail,
        ]);
    }

    public function getAllForms()
    {
        $forms = FormDetail::all();
        return response()->json([
            'success' => true,
            'data' => $forms,
        ]);
    }

    public function getForm($id)
    {
        $form = FormDetail::find($id);
        if (!$form) {
            return response()->json(['success' => false, 'message' => 'Form not found.'], 404);
        }

        return response()->json(['success' => true, 'data' => $form]);
    }

    public function updateForm(Request $request, $id)
    {
        $form = FormDetail::find($id);
        if (!$form) {
            return response()->json(['success' => false, 'message' => 'Form not found.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|unique:form_details,email,' . $id . '|max:255',
            'mobileNumber' => 'required|numeric|digits_between:10,15',
            'address' => 'required|string|max:500',
            'profilePhoto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $form->first_name = $request->input('firstName');
        $form->last_name = $request->input('lastName');
        $form->email = $request->input('email');
        $form->mobile_number = $request->input('mobileNumber');
        $form->address = $request->input('address');

        if ($request->hasFile('profilePhoto')) {
            if ($form->profile_photo) {
                Storage::delete('public/' . $form->profile_photo);
            }
            $form->profile_photo = $request->file('profilePhoto')->store('uploads/profile_photos', 'public');
        }

        if ($request->hasFile('resume')) {
            if ($form->resume) {
                Storage::delete('public/' . $form->resume);
            }
            $form->resume = $request->file('resume')->store('uploads/resumes', 'public');
        }

        $form->save();

        return response()->json([
            'success' => true,
            'message' => 'Form updated successfully!',
            'data' => $form,
        ]);
    }

    public function deleteForm($id)
    {
        $form = FormDetail::find($id);
        if (!$form) {
            return response()->json(['success' => false, 'message' => 'Form not found.'], 404);
        }

        Storage::delete('public/' . $form->profile_photo);
        Storage::delete('public/' . $form->resume);

        $form->delete();

        return response()->json([
            'success' => true,
            'message' => 'Form deleted successfully!',
        ]);
    }

}
