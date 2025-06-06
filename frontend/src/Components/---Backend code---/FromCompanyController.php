<?php

namespace App\Http\Controllers;

use App\Models\FromCompany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class FromCompanyController extends Controller
{
    // Base URL for constructing absolute paths
    protected $baseURL = 'http://localhost:8000';

    // List all From companies (Index)
    public function index()
    {
        $companies = FromCompany::all();
        return response()->json($companies);
    }

    // Create a new From company (Store)
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:from_company,name',
            'address' => 'nullable|string',
            'gst' => 'nullable|string',
            'pan_number' => 'nullable|string',
            'logo' => 'nullable|string', // Base64 encoded string
            'official_mail_id' => 'nullable|email',
            'phone_number' => 'nullable|string',
            'mail_id' => 'nullable|email',
            'contact_person_name' => 'nullable|string',
            'designation' => 'nullable|string',
            'bank_name' => 'nullable|string',
            'bank_branch' => 'nullable|string',
            'bank_account_no' => 'nullable|string',
            'bank_ifsc_code' => 'nullable|string',
            'sign_image' => 'nullable|string',
            'stamp_image' => 'nullable|string',
            'website_link' => 'nullable|url', // New validation
            'is_approved' => 'boolean',
            'created_by' => 'nullable|string',
            'modified_by' => 'nullable|string',
        ]);

        // Handle Base64 logo upload
        if (!empty($data['logo'])) {
            $logoData = explode(',', $data['logo']);
            $image = base64_decode(end($logoData));
            $fileName = uniqid() . '.png';
            $filePath = public_path('uploads/logos/' . $fileName);
            file_put_contents($filePath, $image);

            $croppedLogoURL = 'uploads/logos/' . $fileName;
            $data['logo'] = "{$this->baseURL}/{$croppedLogoURL}";
        }

        // Handle Base64 sign_image upload
        if (!empty($data['sign_image'])) {
            $signData = explode(',', $data['sign_image']);
            $image = base64_decode(end($signData));
            $fileName = uniqid() . '_sign.png';
            $filePath = public_path('uploads/company_signs/' . $fileName);
            file_put_contents($filePath, $image);

            $croppedSignImageURL = 'uploads/company_signs/' . $fileName;
            $data['sign_image'] = "{$this->baseURL}/{$croppedSignImageURL}";
        }

        // Handle Base64 stamp_image upload
        if (!empty($data['stamp_image'])) {
            $stampData = explode(',', $data['stamp_image']);
            $image = base64_decode(end($stampData));
            $fileName = uniqid() . '_stamp.png';
            $filePath = public_path('uploads/company_stamps/' . $fileName);
            file_put_contents($filePath, $image);

            $croppedStampImageURL = 'uploads/company_stamps/' . $fileName;
            $data['stamp_image'] = "{$this->baseURL}/{$croppedStampImageURL}";
        }

        $company = FromCompany::create($data);

        return response()->json(['message' => 'Company created successfully.', 'data' => $company], 201);
    }

    // Show a specific From company by ID (Show)
    public function show($id)
{
    $company = FromCompany::find($id);

    if (!$company) {
        return response()->json(['message' => 'Company not found'], 404);
        // return response()->json($company);
    }

    return response()->json([
        'name' => $company->name,
        'logo' => $company->logo, // URL to the logo
        'sign_image' => $company->sign_image, // URL to the sign image
        'stamp_image' => $company->stamp_image, // URL to the stamp image
        // other company details
    ]);
}

    // Update an existing From company (Update)
    public function update(Request $request, $id)
    {
        $company = FromCompany::find($id);
    
        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }
    
        $data = $request->validate([
            'name' => 'nullable|string',
            'address' => 'nullable|string',
            'gst' => 'nullable|string',
            'pan_number' => 'nullable|string',
            'logo' => 'nullable|string',
            'official_mail_id' => 'nullable|email',
            'phone_number' => 'nullable|string',
            'mail_id' => 'nullable|email',
            'contact_person_name' => 'nullable|string',
            'designation' => 'nullable|string',
            'bank_name' => 'nullable|string',
            'bank_branch' => 'nullable|string',
            'bank_account_no' => 'nullable|string',
            'bank_ifsc_code' => 'nullable|string',
            'sign_image' => 'nullable|string',
            'stamp_image' => 'nullable|string',
            'website_link' => 'nullable|url', // New validation
            'is_approved' => 'boolean',
            'created_by' => 'nullable|string',
            'modified_by' => 'nullable|string',
        ]);
    
        // Preserve existing fields if not updated
        $data['logo'] = $data['logo'] ?? $company->logo;
        $data['sign_image'] = $data['sign_image'] ?? $company->sign_image;
        $data['stamp_image'] = $data['stamp_image'] ?? $company->stamp_image;
    
        // Handle Base64 logo upload
        if (!empty($data['logo']) && $data['logo'] !== $company->logo) {
            if ($company->logo && file_exists(public_path(str_replace($this->baseURL . '/', '', $company->logo)))) {
                unlink(public_path(str_replace($this->baseURL . '/', '', $company->logo)));
            }
    
            $logoData = explode(',', $data['logo']);
            $image = base64_decode(end($logoData));
            $fileName = uniqid() . '.png';
            $filePath = public_path('uploads/logos/' . $fileName);
            file_put_contents($filePath, $image);
    
            $croppedLogoURL = 'uploads/logos/' . $fileName;
            $data['logo'] = "{$this->baseURL}/{$croppedLogoURL}";
        }
    
        // Handle Base64 sign_image upload
        if (!empty($data['sign_image']) && $data['sign_image'] !== $company->sign_image) {
            if ($company->sign_image && file_exists(public_path(str_replace($this->baseURL . '/', '', $company->sign_image)))) {
                unlink(public_path(str_replace($this->baseURL . '/', '', $company->sign_image)));
            }
    
            $signData = explode(',', $data['sign_image']);
            $image = base64_decode(end($signData));
            $fileName = uniqid() . '_sign.png';
            $filePath = public_path('uploads/company_signs/' . $fileName);
            file_put_contents($filePath, $image);
    
            $croppedSignImageURL = 'uploads/company_signs/' . $fileName;
            $data['sign_image'] = "{$this->baseURL}/{$croppedSignImageURL}";
        }
    
        // Handle Base64 stamp_image upload
        if (!empty($data['stamp_image']) && $data['stamp_image'] !== $company->stamp_image) {
            if ($company->stamp_image && file_exists(public_path(str_replace($this->baseURL . '/', '', $company->stamp_image)))) {
                unlink(public_path(str_replace($this->baseURL . '/', '', $company->stamp_image)));
            }
    
            $stampData = explode(',', $data['stamp_image']);
            $image = base64_decode(end($stampData));
            $fileName = uniqid() . '_stamp.png';
            $filePath = public_path('uploads/company_stamps/' . $fileName);
            file_put_contents($filePath, $image);
    
            $croppedStampImageURL = 'uploads/company_stamps/' . $fileName;
            $data['stamp_image'] = "{$this->baseURL}/{$croppedStampImageURL}";
        }
    
        $company->update($data);
    
        return response()->json($company);
    }
    

    // Delete a specific From company (Destroy)
    public function destroy($id)
    {
        $company = FromCompany::find($id);

        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }

        if ($company->logo && file_exists(public_path(str_replace($this->baseURL . '/', '', $company->logo)))) {
            unlink(public_path(str_replace($this->baseURL . '/', '', $company->logo)));
        }

        $company->delete();

        return response()->json(['message' => 'From company deleted successfully']);
    }


    // Upload From company data from Excel (Store via batch upload)
    public function uploadFromCompanies(Request $request)
    {
        $data = $request->all();

        foreach ($data as $fromCompanyData) {
            $validator = Validator::make($fromCompanyData, [
                'name' => 'required|string|unique:from_company,name',
                'address' => 'nullable|string',
                'official_mail_id' => 'nullable|email',
                'phone_number' => 'nullable|string',
                'contact_person_name' => 'nullable|string',
                'is_approved' => 'boolean',
                'created_by' => 'nullable|string',
                'modified_by' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => 'Validation failed', 'details' => $validator->errors()], 400);
            }

            $duplicateFromCompany = FromCompany::where('name', $fromCompanyData['name'])
                ->where('phone_number', $fromCompanyData['phone_number'])
                ->where('official_mail_id', $fromCompanyData['official_mail_id'])
                ->first();

            if ($duplicateFromCompany) {
                continue;
            }

            $company = new FromCompany($fromCompanyData);
            $company->save();
        }

        return response()->json(['message' => 'Companies uploaded successfully, duplicates skipped'], 200);
    }
/*----------------------------------------------------------image delete-------------------------------------*/
    public function deleteLogo(Request $request)
{
    $companyId = $request->input('companyId');

    // Find the company record
    $company = FromCompany::find($companyId);

    if (!$company) {
        return response()->json(['message' => 'Company not found.'], 404);
    }

    // Delete the logo file from storage
    if ($company->logo) {
        Storage::delete($company->logo);
        $company->logo = null; // Set the logo field to null
        $company->save();
        return response()->json(['message' => 'Logo deleted successfully.'], 200);
    }

    return response()->json(['message' => 'No logo to delete.'], 400);
}

public function deleteSignImage(Request $request)
{
    $companyId = $request->input('companyId');

    // Find the company record
    $company = FromCompany::find($companyId);

    if (!$company) {
        return response()->json(['message' => 'Company not found.'], 404);
    }

    // Delete the signature file from storage
    if ($company->sign_image) {
        Storage::delete($company->sign_image);
        $company->sign_image = null; // Set the sign_image field to null
        $company->save();
        return response()->json(['message' => 'Signature image deleted successfully.'], 200);
    }

    return response()->json(['message' => 'No signature image to delete.'], 400);
}
public function deleteStampImage(Request $request)
{
    $companyId = $request->input('companyId');

    // Find the company record
    $company = FromCompany::find($companyId);

    if (!$company) {
        return response()->json(['message' => 'Company not found.'], 404);
    }

    // Delete the stamp file from storage
    if ($company->stamp_image) {
        Storage::delete($company->stamp_image);
        $company->stamp_image = null; // Set the stamp_image field to null
        $company->save();
        return response()->json(['message' => 'Stamp image deleted successfully.'], 200);
    }

    return response()->json(['message' => 'No stamp image to delete.'], 400);
}
}