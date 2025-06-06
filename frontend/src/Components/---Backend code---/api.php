<?php

use App\Http\Controllers\BatchManagement\BatchManagementController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\CreateGroups\CreateGroupsController;
use App\Http\Controllers\ExamResults\ExamResultsController;
use App\Http\Controllers\InstructorTable\InstructorController;
use App\Http\Controllers\Logos\LogoController;
use App\Http\Controllers\ManagarCreateTest\ManageCreateTestController;
use App\Http\Controllers\ManagarTestPattern\ManageTestPatternController;
use App\Http\Controllers\ManageQB\ManageQuestionBankController;
use App\Http\Controllers\ReceiptController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DatabaseController;
use App\Http\Controllers\userController;
use App\Http\Controllers\EmailController\EmailController;
use App\Http\Controllers\navbarmenu\UserNavController;
use App\Http\Controllers\API_Controller\UserSettingApiController;
use App\Http\Controllers\AiQuestionGenerateBankController;
use App\Http\Controllers\Certificate_Controller;
use App\Http\Controllers\StudentProfileDetailsController;
use App\Http\Controllers\LanguageTranslator\LanguageTransatorController;
use App\Http\Controllers\Test_Controller\TestController;
use App\Http\Controllers\QuestionBlogController;
use App\Http\Controllers\ReplyController;
use App\Http\Controllers\TPACourse\TPACourseController;
use App\Http\Controllers\WebsiteTrackController;
use App\Http\Controllers\FAQContoller;
use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\CoursePageTable\CoursePageController;
use App\Http\Controllers\TPAReview\TPAReviewController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\ApplyJob\ApplyJobNotificationController;
use App\Http\Controllers\InterviweQuestion\InterviewQuestionController;
use App\Http\Controllers\EmployeeList\EmployeeListController;
use App\Http\Controllers\EmployeeData\Employee_Controller;
use App\Http\Controllers\BlogHandlingController;
use App\Http\Controllers\HTESContactUsController;
use App\Http\Controllers\HtesCareerController;
use App\Http\Controllers\ReachOutController;
use App\Http\Controllers\RollDefaultAccess\RollDefaultAccesController;
use App\Http\Controllers\EmployeeSalary\EmployeeSalaryController;
use App\Http\Controllers\HolidaysList\HolidaysListController;
use App\Http\Controllers\ContentSectionController;
use App\Http\Controllers\AddContentSectionController;
use App\Http\Controllers\AddContent_controller;
use App\Http\Controllers\TPAExam_controller;
use App\Http\Controllers\AdvertisementController;
use App\Http\Controllers\TestSeriesManagement\TestSeriesManagementController;
use App\Http\Controllers\PreviousQuestionPaperController;
use App\Http\Controllers\FromCompanyController;
use App\Http\Controllers\ToCompanyController;
use App\Http\Controllers\ProjectDetailsController;
use App\Http\Controllers\GenerateInvoiceController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\RazorpayOrderController;
use App\Http\Controllers\PaymentStorageController;
use App\Http\Controllers\NotificationAlert\NotificationAlertController;
use App\Http\Controllers\ExamPatternController;
use App\Http\Controllers\CurrentAffairCategoryController;
use App\Http\Controllers\CurrentAffairsArticlesController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*----------------------Admin Dashboard's APIs------------------------------------------ */

Route::post('/createCategory', [AdminController::class, 'createCategory']);
Route::post('/createSubject', [AdminController::class, 'createSubject']);
Route::post('/createChapter', [AdminController::class, 'createChapter']);
Route::post('/createTopic', [AdminController::class, 'createTopic']);
Route::get('/getSubject', [AdminController::class, 'getSubject']);
Route::get('/getChapters', [AdminController::class, 'getChapters']);
Route::get('/getTopics', [AdminController::class, 'getTopics']);

Route::get('/getQuestionBank', [AdminController::class, 'getQuestionBank']);
Route::post('/createQuestion', [AdminController::class, 'createQuestion']);
Route::post('/editQuestion', [AdminController::class, 'editQuestion']);

Route::put('/deleteQuestion/{delItemID}', [AdminController::class, 'deleteQuestion']);

Route::get('/getCategory', [AdminController::class, 'getCategory']);
Route::put('/deleteCategory/{delItemID}', [AdminController::class, 'deleteCategory']);

// Route::get('/getSubjectTable',                       [AdminController::class, 'getSubjectTable']);
Route::get('/getSubjectTable', [AdminController::class, 'getSubjectTable']);
Route::get('/getChapterTable', [AdminController::class, 'getChapterTable']);
Route::get('/getTopicTable', [AdminController::class, 'getTopicTable']);
Route::put('/deleteSubject/{delItemID}', [AdminController::class, 'deleteSubject']);
Route::put('/deleteChapter/{delItemID}', [AdminController::class, 'deleteChapter']);
Route::put('/deleteTopic/{delItemID}', [AdminController::class, 'deleteTopic']);
// Route::post('/create-table',                           'AdminController@createTable');
Route::post('/createTable', [AdminController::class, 'createTable']);
Route::post('/createBatch', [AdminController::class, 'createBatches']);
Route::get('/getBatchTable', [AdminController::class, 'getBatchTable']);
Route::post('/editBatch/{editBatchID}', [AdminController::class, 'editBatch']);

/// Register API - For creating New User  
Route::post('/register', [userController::class, 'createUser']);
Route::post('/register_google', [userController::class, 'CreateUser_Google']);
Route::post('/loginuser', [userController::class, 'loginUser']);  /// Login API - For Checking Login 
Route::post('/forgotpassword', [userController::class, 'ForgotPassword']);  /// Login API - For Checking Login 
Route::put('/signout', [userController::class, 'logoutUser']);  /// Logout API - For Checking Login 
Route::post('/ip_login', [userController::class, 'ip_login']);  /// IP Login 
Route::post('/google_login', [userController::class, 'GoogleloginUser']);  /// IP Login 
Route::get('/google-api', [userController::class, 'api_key']);  /// Google API Key
Route::post('/phone-login',[userController::class, 'createUserWithPhone']);
Route::get('/getLoginTable', [userController::class, 'getLoginTable']);
Route::put('/editUser/{editUserID}', [userController::class, 'editUser']);
Route::delete('/deleteUser/{delUserID}', [userController::class, 'deleteUser']);
//Grant access the tabs for the users
Route::put('/updatetabs/{id}', [userController::class, 'updatetabs']);
Route::delete('/deletetabs/{id}', [userController::class, 'deletetabs']);
/// Get the user detials by username
Route::get('/getUserDetailsByName', [UserController::class, 'getUserDetailsByName']);
Route::get('/send-otp', [UserController::class, 'sendOtp']);
Route::post('/verify-otp', [UserController::class, 'verifyOtp']);

//// Mail API Test
Route::post('/sendmail', [EmailController::class, 'sendEmail']);

///NavBarMenu Adding from UserMangement
Route::post('/addExam', [UserNavController::class, 'addExam']);
Route::get('/getExam', [userNavController::class, 'getExam']);
Route::post('/generate_mcqs', [UserNavController::class, 'generate_mcqs']);

///UserSettingController user settings
Route::post('/userApi', [UserSettingApiController::class, 'userApi']);
Route::delete('/deleteApiKey', [UserSettingApiController::class, 'deleteApiKey']);
Route::put('/updateUserApi', [UserSettingApiController::class, 'updateUserApi']);
Route::get('/getUserApi', [UserSettingApiController::class, 'getUserApi']);

Route::get('/tablesList', [AdminController::class, 'getTableNames']);
Route::get('/modelsList', [AdminController::class, 'getModelNames']);

/**---------------------------------------------------------------------------------------------------- */
/**not used below 2 functions */
Route::get('/migrationslist', [AdminController::class, 'getMigrationNames']);
Route::get('/modeldata', [AdminController::class, 'getModelData']);
/**---------------------------------------------------------------------------------------------------- */


Route::get('/tableColumns/{modelName}', [AdminController::class, 'getColumnNames']);
Route::get('/tableRows/{modelName}', [AdminController::class, 'getTableRows']);
Route::get('/getTableColumnRowsNames/{modelName}', [AdminController::class, 'getTableColumnRowsNames']);

/**          /................./modelName/id,       contName......          ..methodName            */
Route::post('/updateTableAdmin/batches/{rowID}', [AdminController::class, 'updateBatchesAdmin']);
Route::post('/updateTableAdmin/category/{rowID}', [AdminController::class, 'updateCategoryAdmin']);
Route::post('/updateTableAdmin/chapter/{rowID}', [AdminController::class, 'updateChapterAdmin']);
Route::post('/updateTableAdmin/login/{rowID}', [AdminController::class, 'updateLoginAdmin']);
Route::post('/updateTableAdmin/NavBarMenu/{rowID}', [AdminController::class, 'updateNavBarMenuAdmin']);
Route::post('/updateTableAdmin/questionBank/{rowID}', [AdminController::class, 'updateQuestionBankAdmin']);
Route::post('/updateTableAdmin/subject/{rowID}', [AdminController::class, 'updateSubjectAdmin']);
Route::post('/updateTableAdmin/topic/{rowID}', [AdminController::class, 'updateTopicAdmin']);

Route::put('/deleteItemAdmin/{modelName}/{rowID}', [AdminController::class, 'deleteItemAdmin']);

Route::post('/updateUserTypeAdmin/{ID}', [AdminController::class, 'updateUserTypeAdmin']);
Route::post('/blockUserByAdmin/{ID}', [AdminController::class, 'blockUserByAdmin']);

//Test-api
Route::post('/createTestGeneralInfo', [AdminController::class, 'createTestGeneralInfo']);
Route::post('/updateTestGeneralInfo/{updItemID}', [AdminController::class, 'updateTestGeneralInfo']);
Route::put('/deleteTestGeneralInfo/{delItemID}', [AdminController::class, 'deleteTestGeneralInfo']);
//Test-api - not used

Route::post('/createQuestions', [AdminController::class, 'createQuestions']);
Route::post('/updateQuestions/{updItemID}', [AdminController::class, 'updateQuestions']);
Route::put('/deleteQuestions/{delItemID}', [AdminController::class, 'deleteQuestions']);

Route::get('/getContentTable', [AdminController::class, 'getContentTable']);
Route::post('/createContent', [AdminController::class, 'createContent']);
// Route::post('/createContent',                       function () {   echo "Printing something..."; });

Route::post('/editContent', [AdminController::class, 'editContent']);
Route::delete('/deleteContent/{delItemID}', [AdminController::class, 'deleteContent']);


Route::put('/moveContentDownTopicWise/{position}', [AdminController::class, 'moveContentDownTopicWise']);
Route::put('/moveContentUpTopicWise/{position}', [AdminController::class, 'moveContentUpTopicWise']);
Route::post('/moveContentUpDownMouse', [AdminController::class, 'moveContentUpDownMouse']);

// Route::get('/getTopicsNoOfChildrens',                 [AdminController::class, 'getTopicsNoOfChildrens']);    
Route::get('/getTopicsNoOfChildrens/{edRoadMapID}', [AdminController::class, 'getTopicsNoOfChildrens']);

//-------------------------------------------------------------------------
//Student Dashboard's APIs / StudentProfileDetails Api
//-------------------------------------------------------------------------
Route::post('/getprofile', [StudentProfileDetailsController::class, 'fetchProfiledatas']);
Route::post('/updateProfile', [StudentProfileDetailsController::class, 'updateProfileDetails']);
Route::post('/getResumeHeadline', [StudentProfileDetailsController::class, 'fetchProfileResumeHeadline']);
Route::post('/updateResumeHeadline', [StudentProfileDetailsController::class, 'updateProfileResumeHeadline']);
Route::post('/updateCareerProfile', [StudentProfileDetailsController::class, 'updateCareerProfile']);
Route::post('/updateProfileSummary', [StudentProfileDetailsController::class, 'updateProfileSummary']);
Route::post('/updateItSkills/{updItSkillID}', [StudentProfileDetailsController::class, 'updateITSkills']);
Route::post('/createITSkills', [StudentProfileDetailsController::class, 'createITSkills']);
Route::put('/deleteITSkills/{delItSkillID}', [StudentProfileDetailsController::class, 'deleteITSkills']);
Route::post('/getITSkills', [StudentProfileDetailsController::class, 'fetchProfileITSkills']);
Route::post('/updateStudentKeySkills', [StudentProfileDetailsController::class, 'updateStudentKeySkills']);
Route::post('/getStudentKeySkills', [StudentProfileDetailsController::class, 'getStudentKeySkills']);


Route::post('/createStudentEmployment', [StudentProfileDetailsController::class, 'createEmploymentDetails']);
Route::post('/getAllStudentEmployment', [StudentProfileDetailsController::class, 'getAllStudentEmployment']);
Route::post('/getCurrentEmployment', [StudentProfileDetailsController::class, 'getCurrentEmployment']);
Route::put('/deleteStudentEmployment/{delEmpID}', [StudentProfileDetailsController::class, 'deleteStudentEmployment']);
Route::post('/updateStudentEmployment/{updEmpID}', [StudentProfileDetailsController::class, 'updateStudentEmployment']);

Route::post('/createStudentEducation', [StudentProfileDetailsController::class, 'createStudentEducation']);
Route::post('/getAllStudentEducation', [StudentProfileDetailsController::class, 'getAllStudentEducation']);
Route::put('/deleteStudentEducation/{delEducID}', [StudentProfileDetailsController::class, 'deleteStudentEducation']);
Route::post('/updateStudentEducation/{updEducID}', [StudentProfileDetailsController::class, 'updateStudentEducation']);

Route::post('/createStudentProject', [StudentProfileDetailsController::class, 'createStudentProject']);
Route::put('/deleteStudentProject/{delProjectID}', [StudentProfileDetailsController::class, 'deleteStudentProject']);
Route::post('/getAllProjects', [StudentProfileDetailsController::class, 'getAllProjects']);
Route::post('/updateStudentProject/{updPrjID}', [StudentProfileDetailsController::class, 'updateStudentProject']);

Route::post('/createStudentPersonalDetails', [StudentProfileDetailsController::class, 'updatePersonalDetail']);

Route::post('/uploadProfilePicture', [StudentProfileDetailsController::class, 'uploadProfilePicture']);
Route::delete('/deleteProfilePicture/{userEmail}', [StudentProfileDetailsController::class, 'deleteProfilePicture']);
Route::get('/uploads/profile_Pictures/{userEmail}', [StudentProfileDetailsController::class, 'getProfilePhoto']);
Route::post('/uploadResume/{userEmail}', [StudentProfileDetailsController::class, 'uploadResume']);
Route::get('downloadResume/{userEmail}', [StudentProfileDetailsController::class, 'downloadResume']);
Route::delete('deleteResume/{userEmail}', [StudentProfileDetailsController::class, 'deleteResume']);
Route::get('getProfilePercentage/{userEmail}', [StudentProfileDetailsController::class, 'getProfilePercentage']);
Route::get('getCareerProfile/{userEmail}', [StudentProfileDetailsController::class, 'getCareerProfile']);

Route::post('/createInterviewBasicDetail', [StudentProfileDetailsController::class, 'createInterviewBasicDetail']);
Route::get('getInterviewBasicDetail/{userEmail}', [StudentProfileDetailsController::class, 'getAllInterviewBasicDetail']);
Route::put('deleteInterviewBasicDetail/{delID}', [StudentProfileDetailsController::class, 'deleteInterviewBasicDetail']);
Route::post('/createInterviewQas', [StudentProfileDetailsController::class, 'createInterviewQas']);    // ch
Route::get('getInterviewQasDetail/{userEmail}', [StudentProfileDetailsController::class, 'getAllInterviewQas']);
Route::put('deleteInterviewQAS/{delID}', [StudentProfileDetailsController::class, 'deleteInterviewQAS']);
Route::post('/updateInterviewQas/{updQASID}', [StudentProfileDetailsController::class, 'updateInterviewQas']);

Route::get('getAllApprovedQas', [StudentProfileDetailsController::class, 'getAllApprovedQas']);
Route::get('getUniqueInterviewRoles', [StudentProfileDetailsController::class, 'getUniqueInterviewRoles']);
// Route::get('getQASofRoles/{role}',                  [StudentProfileDetailsController::class, 'getQASofRoles']); 

Route::post('getStudentBatchAssigned', [StudentProfileDetailsController::class, 'getStudentBatchAssigned']);
Route::get('/checkResumeAvaialbility/{email}', [StudentProfileDetailsController::class, 'checkResumeAvaialbility']);
// ___________________________________________________________________________________________________________________________________

//Create a Route for the Question save in the database from AI-question Generate(questionBnak)
Route::post('/questiontodatabase', [AiQuestionGenerateBankController::class, 'questiontodatabase']);
Route::post('/templatequestiontodatabase', [AiQuestionGenerateBankController::class, 'templatequestiontodatabase']);
Route::put('/updatethequestions/{id}', [AiQuestionGenerateBankController::class, 'updatethequestions']);
Route::get('/getthequestions/{id}', [AiQuestionGenerateBankController::class, 'getthequestions']);
Route::get('/getAllAiGeneratedQuestions', [AiQuestionGenerateBankController::class, 'getAllAiGeneratedQuestions']);
Route::get('/getAllAiGeneratedQuestionsquiz', [AiQuestionGenerateBankController::class, 'getAllAiGeneratedQuestionsquiz']);
Route::get('/getAllAiGeneratedQuestionsquizanswer', [AiQuestionGenerateBankController::class, 'getAllAiGeneratedQuestionsquizanswer']);
Route::get('/getDetailsByQuestionIds/{id}', [AiQuestionGenerateBankController::class, 'getDetailsByQuestionIds']);
Route::delete('/deletequestionquestionbank/{id}', [AiQuestionGenerateBankController::class, 'deletequestionquestionbank']);

Route::post('/lang', [LanguageTransatorController::class, 'lang']);

/*Manage question bank educational road map*/
Route::post('/manageqb', [ManageQuestionBankController::class, 'manageqb']);
Route::get('/dropdownOptions', [ManageQuestionBankController::class, 'dropdownOptions']);
Route::put('/updateEdRoadMap/{id}', [ManageQuestionBankController::class, 'updateEdRoadMap']);
Route::delete('/deleteEdRoadMap/{id}', [ManageQuestionBankController::class, 'deleteEdRoadMap']);

// Route::middleware(['auth:api'])->group(function () {
//     Route::post('/manageqb', [ManageQuestionBankController::class, 'manageqb']);
//     Route::put('/updateEdRoadMap/{id}', [ManageQuestionBankController::class, 'updateEdRoadMap']);
//     Route::get('/dropdownOptions',[ManageQuestionBankController::class,'dropdownOptions']);
// });
Route::post('/createExamPattern', [TestController::class, 'createExamPattern']);
Route::get('/getExamPattern', [TestController::class, 'getExamPattern']);

Route::post('/createTestQas', [TestController::class, 'createTest']);
Route::get('/getAllTest', [TestController::class, 'getAllTest']);

//Manage Create_Test page Routes//
Route::post('/createtest', [ManageCreateTestController::class, 'createtest']);
Route::get('/gettestgeninfo', [ManageCreateTestController::class, 'gettestgeninfo']);
Route::get('/gettestgeninfo_specific/{id}', [ManageCreateTestController::class, 'gettestgeninfo_specific']);
Route::delete('/deletegetinfo/{id}', [ManageCreateTestController::class, 'deletegetinfo']);
Route::put('/updateTest/{id}', [ManageCreateTestController::class, 'updateTest']);

//Manage Test_pattern page Routes//
Route::post('/createpattern', [ManageTestPatternController::class, 'createpattern']);
Route::get('/getpattern', [ManageTestPatternController::class, 'getpattern']);
Route::delete('/deletetpattern/{id}', [ManageTestPatternController::class, 'deletepattern']);
Route::put('/updatepattern/{id}', [ManageTestPatternController::class, 'updatepattern']);

//Manage exam status
Route::post('/sendresult', [ExamResultsController::class, 'sendresult']);
Route::get('/getallresults', [ExamResultsController::class, 'getAllResults']);
Route::delete('/delete_result/{id}', [ExamResultsController::class, 'detele_Exam_Result']);
Route::put('/exam-results/update-result-array/{id}', [ExamResultsController::class, 'updateResultArray']);


//Manage Logos 
Route::post('/uploadlogos', [LogoController::class, 'uploadlogos']);
Route::get('/getimages', [LogoController::class, 'getimages']);
Route::put('/logos/{id}', [LogoController::class, 'updateLogo']);
Route::delete('/logos/{id}', [LogoController::class, 'deleteLogo']);


//Get Api for the Login_History
Route::get('/gethistory', [AdminController::class, 'gethistory']);

//___________________________Batch Mangaement Apis__________________________//
Route::post('/batchinfo', [BatchManagementController::class, 'batchinfo']);
Route::get('/getbatchinfo', [BatchManagementController::class, 'getbatchinfo']);
Route::delete('/deletebatchinfo/{id}', [BatchManagementController::class, 'deletebatchinfo']);
Route::put('/updatestudent/{id}', [BatchManagementController::class, 'updatestudent']);
Route::put('/updateInstructor/{id}', [BatchManagementController::class, 'updateInstructor']);
Route::put('/updateaddtest/{id}', [BatchManagementController::class, 'updateaddtest']);
Route::put('/updateaddsubject/{id}', [BatchManagementController::class, 'updateaddsubject']);
Route::put('/updateTestSeries/{id}', [BatchManagementController::class, 'updateTestSeries']);
Route::put('/updatebatchinfo/{id}', [BatchManagementController::class, 'updatebatchinfo']);
Route::put('/updatebatchExams/{id}', [BatchManagementController::class, 'updateExams']);

//____________________________QABlog Page APIs Start___________________________________//

//Manage questions page routes
Route::post('/questionblog', [QuestionBlogController::class, 'store']);
Route::get('/questionblog', [QuestionBlogController::class, 'index']);
Route::post('/questionblog/{id}/react', [QuestionBlogController::class, 'reactToquestion']);


//Manage replies page routes
Route::get('questions/{question}/replies', [ReplyController::class, 'index']);
Route::post('questions/{question}/replies', [ReplyController::class, 'store']);
Route::put('questions/{question}/replies/{reply}', [ReplyController::class, 'update']);
Route::delete('questions/{question}/replies/{reply}', [ReplyController::class, 'destroy']);

//____________________________QABlog Page APIs End___________________________________//

//-------------------------------------------------------------------------
// Current Affairs  API's
//-------------------------------------------------------------------------

Route::post('/createCurrentAffairs', [AdminController::class, 'createCurrentAffairs']);
Route::post('/updateCurrentAffairs', [AdminController::class, 'updateCurrentAffairs']);
Route::get('/getCurrentAffairs', [AdminController::class, 'getCurrentAffairs']);
Route::delete('/deleteCurrentAffairs/{delItemID}', [AdminController::class, 'deleteCurrentAffairs']);
Route::post('/updateCurrentAffairsDate', [AdminController::class, 'updateCurrentAffairsDate']);

//-------------------------------------------------------------------------
//ReceiptController
//-------------------------------------------------------------------------

Route::post('/Reciept', [ReceiptController::class, 'Reciept_insert']);
Route::put('/Reciept_edit', [ReceiptController::class, 'Reciept_edit']);
Route::get('/Reciept_fetch/{id}', [ReceiptController::class, 'Reciept_fetcha_specfic']);
Route::get('/Reciept_fetch_all', [ReceiptController::class, 'Reciept_fetch_all']);
Route::delete('/Reciept_delete/{id}', [ReceiptController::class, 'Reciept_delete']);
Route::put('/Receipt_DownloadCount/{id}', [ReceiptController::class, 'Receipt_DownloadCount']);


//-------------------------------------------------------------------------
//sendCertificateData
//-------------------------------------------------------------------------

Route::post('/sendCertificateData', [Certificate_Controller::class, 'saveCertificateData']);
Route::get('/getCertificate/{id}', [Certificate_Controller::class, 'getCertificateData']);
Route::get('/getAllCertificate', [Certificate_Controller::class, 'getAllCertificates']);
Route::delete('/deleteCertificate/{id}', [Certificate_Controller::class, 'deleteCertificatedata']);


//-------------------------------------------------------------------------
//Website Track
//-------------------------------------------------------------------------
Route::post('/websiteTrack', [WebsiteTrackController::class, 'website_track_insert']);
Route::post('/websiteTrack_edit', [WebsiteTrackController::class, 'website_track_edit']);
Route::get('/websiteTrack_fetch/{id}', [WebsiteTrackController::class, 'website_track_fetcha_specfic']);
Route::get('/websiteTrack_fetch_all', [WebsiteTrackController::class, 'website_track_fetch_all']);
Route::delete('/websiteTrack_delete/{id}', [WebsiteTrackController::class, 'website_track_delete']);

//-------------------------------------------------------------------------
//createcourse
//-------------------------------------------------------------------------
Route::post('/createcourse', [TPACourseController::class, 'createcourse']);
Route::get('/getcourse', [TPACourseController::class, 'getcourse']);
Route::delete('/deletecourse/{id}', [TPACourseController::class, 'deletecourse']);
Route::put('/updatecourse/{id}', [TPACourseController::class, 'updatecourse']);
Route::post('/uploadcourses', [TPACourseController::class, 'uploadCoursesFromTemplate']);

Route::get('/getUniqueCourseNames', [TPACourseController::class, 'getUniqueCourseNames']);


//-------------------------------------------------------------------------
//FAQ
//-------------------------------------------------------------------------
Route::post('/FAQ', [FAQContoller::class, 'FAQ_insert']);
Route::put('/FAQ_edit/{id}', [FAQContoller::class, 'FAQ_edit']);
Route::put('/FAQ_edit_isapproved/{id}', [FAQContoller::class, 'FAQ_edit_isapproved']);
Route::get('/FAQ_fetch/{id}', [FAQContoller::class, 'FAQ_fetcha_specfic']);
Route::get('/FAQ_fetch_all', [FAQContoller::class, 'FAQ_fetch_all']);
Route::delete('/FAQ_delete/{id}', [FAQContoller::class, 'FAQ_delete']);

//-------------------------------------------------------------------------
//Enquiry From TPA Frontend
//-------------------------------------------------------------------------
Route::post('/createEnquiry', [EnquiryController::class, 'createEnquiry']);
Route::get('/enquiry_fetch_all', [EnquiryController::class, 'enquiry_fetch_all']);
Route::delete('/enquiry_delete/{id}', [EnquiryController::class, 'enquiry_delete']);
Route::put('/enquiry_update/{id}', [EnquiryController::class, 'enquiry_update']);


//-------------------------------------------------------------------------
//Instructor
//-------------------------------------------------------------------------
Route::post('/instructor', [InstructorController::class, 'instructor_insert']);
Route::put('/instructor_edit/{id}', [InstructorController::class, 'instructor_edit']);
Route::get('/Instructor_fetch/{id}', [InstructorController::class, 'Instructor_fetch_specfic']);
Route::get('/Instructor_fetch_all', [InstructorController::class, 'Instructor_fetch_all']);
Route::delete('/Instructor_delete/{id}', [InstructorController::class, 'Instructor_delete']);


//-------------------------------------------------------------------------
//Course Page
//-------------------------------------------------------------------------
Route::post('/coursepage', [CoursePageController::class, 'coursepage_insert']);
Route::put('/coursepage_edit/{id}', [CoursePageController::class, 'coursepage_edit']);
Route::get('/coursepage_fetch_all', [CoursePageController::class, 'coursepage_fetch_all']);
Route::delete('/coursepage_delete/{id}', [CoursePageController::class, 'coursepage_delete']);

//-------------------------------------------------------------------------
// Placement Record API's
//-------------------------------------------------------------------------
Route::post('/createPlacementRecord', [AdminController::class, 'createPlacementRecord']);
Route::get('/placements_fetch_all', [AdminController::class, 'placements_fetch_all']);
Route::put('/placement_edit/{id}', [AdminController::class, 'placement_edit']);
Route::delete('/placements_delete/{id}', [AdminController::class, 'placements_delete']);

//-------------------------------------------------------------------------
// Company Job-Posts API's
//-------------------------------------------------------------------------
Route::post('/jobPost_insert', [AdminController::class, 'jobPost_insert']);
Route::get('/jobPost_fetch_all', [AdminController::class, 'jobPost_fetch_all']);
Route::get('/jobPost_fetch_specfic/{id}', [AdminController::class, 'jobPost_fetch_specfic']);
Route::put('/jobPost_edit/{id}', [AdminController::class, 'jobPost_edit']);
Route::delete('/jobPost_delete/{id}', [AdminController::class, 'jobPost_delete']);
// approveJobPost
Route::put('/jobPost_approve/{ID}', [AdminController::class, 'jobPost_approve']);

//-------------------------------------------------------------------------
// Company Profile- API's
//-------------------------------------------------------------------------
Route::post('/companyProflie_insert', [AdminController::class, 'companyProflie_insert']);
Route::put('/companyProflie_edit/{id}', [AdminController::class, 'companyProflie_edit']);
Route::get('/companyProflie_fetch_all', [AdminController::class, 'companyProflie_fetch_all']);
Route::delete('/companyProflie_delete/{id}', [AdminController::class, 'companyProflie_delete']);


//-------------------------------------------------------------------------
//TPA Review
//------------------------------------------------------------------------
Route::post('/review', [TPAReviewController::class, 'review_insert']);
Route::put('/review_edit/{id}', [TPAReviewController::class, 'review_edit']);
Route::get('/review_fetch_all', [TPAReviewController::class, 'review_fetch_all']);
Route::delete('/review_delete/{id}', [TPAReviewController::class, 'review_delete']);
Route::put('/review_edit_approved/{id}', [TPAReviewController::class, 'review_edit_approved']);


//-------------------------------------------------------------------------
//Apply job Notificataion
//-------------------------------------------------------------------------
Route::post('/Apply_Job', [ApplyJobNotificationController::class, 'ApplyJobNotification_insert']);
Route::put('/Apply_Job_edit/{id}', [ApplyJobNotificationController::class, 'ApplyJobNotificationTable_edit']);
Route::get('/Apply_Job_fetch/{id}', [ApplyJobNotificationController::class, 'ApplyJobNotificationTable_fetch_specific']);
Route::get('/Apply_Job_fetch_all', [ApplyJobNotificationController::class, 'ApplyJobNotificationTable_fetch_all']);
Route::delete('/Apply_Job_delete/{id}', [ApplyJobNotificationController::class, 'ApplyJobNotificationTable_delete']);

Route::get('/getApplicantsCount/{jobId}', [ApplyJobNotificationController::class, 'getApplicantsCount']);



//-------------------------------------------------------------------------
//Interview_Questions
//-------------------------------------------------------------------------
Route::post('/Interview_Questions', [InterviewQuestionController::class, 'Interview_Questions_insert']);
Route::post('/Interview_Questions_frontend', [InterviewQuestionController::class, 'Interview_Questions_insert_frontend']);
Route::put('/Interview_Questions/{id}', [InterviewQuestionController::class, 'Interview_Questions_isapproved']);
Route::put('/Interview_Questions_edit/{id}', [InterviewQuestionController::class, 'Interview_Questions_edit']);
Route::get('/Interview_Questions_fetch/{id}', [InterviewQuestionController::class, 'Interview_Questions_fetch_specific']);
Route::get('/Interview_Questions_fetch_all', [InterviewQuestionController::class, 'Interview_Questions_fetch_all']);
Route::delete('/Interview_Questions_delete/{id}', [InterviewQuestionController::class, 'Interview_Questions_delete']);


//-------------------------------------------------------------------------
//Employees_List
//-------------------------------------------------------------------------
Route::post('/Employees', [EmployeeListController::class, 'Employees_insert']);
Route::put('/Employees_edit/{id}', [EmployeeListController::class, 'Employees_edit']);
Route::get('/Employees_fetch/{id}', [EmployeeListController::class, 'Employees_fetcha_specfic']);
Route::get('/Employees_fetch_all', [EmployeeListController::class, 'Employees_fetch_all']);
Route::delete('/Employees_delete/{id}', [EmployeeListController::class, 'Employees_delete']);

//-------------------------------------------------------------------------
//Email controller Api
//-------------------------------------------------------------------------

Route::post('/sendEnquiryMail', [EmailController::class, 'sendEmail']);
Route::post('/sendEmailForRejectionDocuments', [EmailController::class, 'sendEmailForRejectionDocuments']);
Route::post('/validate_Tokens', [EmailController::class, 'validateToken']);
Route::post('/check_for_validity', [EmailController::class, 'checkTokenValidity']);

//-------------------------------------------------------------------------
//Employee_Data
//-------------------------------------------------------------------------
Route::post('/Employee_Data', [Employee_Controller::class, 'Employee_Data_insert']);
Route::post('/employee/update', [Employee_Controller::class, 'updateEmployeeDetails']);
Route::get('/Employee_Data_fetch_all', [Employee_Controller::class, 'Employee_Data_fetch_all']);
Route::delete('/Employee_Data_delete/{id}', [Employee_Controller::class, 'Employee_Data_Delete']);
Route::put('/Employee_Data_edit_doc_status/{id}', [Employee_Controller::class, 'Employee_Data_edit_doc_status']);
Route::post('/get_employee_by_personal_mail', [Employee_Controller::class, 'getEmployeeByPersonalMailId']);
Route::post('/Employee_Data_edit', [Employee_Controller::class, 'Employee_Data_edit']);
Route::get('/Employees_fetch/{id}', [Employee_Controller::class, 'Employees_fetcha_specfic']);
Route::delete('/Employee_Data_delete_file', [Employee_Controller::class, 'Employee_Data_Delete_file']);
Route::post('/get-employee-id-by-email', [Employee_Controller::class, 'getEmployeeIdByEmail']);
Route::get('/download-document/{email}/{filename}', [Employee_Controller::class, 'downloadDocument']);



//-------------------------------------------------------------------------
//Roll_Access_Management
//-------------------------------------------------------------------------
Route::post('/Roll_Default_Tabs', [RollDefaultAccesController::class, 'Roll_Default_Tabs_insert']);
Route::get('/Roll_Default_Access_Fetch_All', [RollDefaultAccesController::class, 'Roll_Default_Access_Fetch_All']);
Route::delete('/Access_Roll_Default_delete/{id}', [RollDefaultAccesController::class, 'Access_Roll_Default_delete']);
Route::put('/Roll_Default_Tabs_update/{id}', [RollDefaultAccesController::class, 'Roll_Default_Tabs_update']);


//-------------------------------------------------------------------------
//Blogs
//-------------------------------------------------------------------------
Route::get('/blogs_getall', [BlogHandlingController::class, 'BlogGetAll']);
Route::get('/blogs_get/{id}', [BlogHandlingController::class, 'BlogGetById']);
Route::post('/blogs', [BlogHandlingController::class, 'BlogStore']);
Route::put('/blogs_edit/{id}', [BlogHandlingController::class, 'BlogUpdate']);
Route::delete('/blogs_delete/{id}', [BlogHandlingController::class, 'BlogDestroy']);
Route::put('/blogs_update_isapproved/{id}', [BlogHandlingController::class, 'BlogUpdateIsApproved']);

//-------------------------------------------------------------------------
//HTES Contact
//-------------------------------------------------------------------------
Route::post('/contact-us', [HTESContactUsController::class, 'contact_store']);
Route::get('/contact-us-get', [HTESContactUsController::class, 'contact_index']);
Route::delete('/contact-us-delete/{id}', [HTESContactUsController::class, 'contact_destroy']);


//-------------------------------------------------------------------------
//HTES Careers
//-------------------------------------------------------------------------
Route::post('/careers_post', [HtesCareerController::class, 'career_store']);
Route::get('/careers_getall', [HtesCareerController::class, 'career_index']);
Route::get('/careers_get/{id}', [HtesCareerController::class, 'career_show']);
Route::delete('/careers_delete/{id}', [HtesCareerController::class, 'career_destroy']);
Route::get('/career_download/{id}', [HtesCareerController::class, 'career_download']);
Route::get('/career_view/{id}', [HtesCareerController::class, 'career_view']);

//--------------------------------------------------------------------------
//Reach Out
//---------------------------------------------------------------------------
Route::post('/reach_out', [ReachOutController::class, 'reachout_store']);
Route::get('/reach_out-get', [ReachOutController::class, 'reachout_index']);
Route::delete('/reach_out-delete/{id}', [ReachOutController::class, 'reachout_destroy']);

//-------------------------------------------------------------------------
//Employee_Salary_slips
//-------------------------------------------------------------------------
Route::get('/Employee_salary_slips_fetch', [EmployeeSalaryController::class, 'Employees_salary_fetch_all']);
Route::put('/Employee_salary_slip_update/{id}', [EmployeeSalaryController::class, 'UpdateEmployeeDetails']);

//-------------------------------------------------------------------------
//Employee_Holidays_list
//-------------------------------------------------------------------------
Route::post('/Employee_Holidays', [HolidaysListController::class, 'Employees_Holidays_insert']);
Route::post('/Employee_upload', [HolidaysListController::class, 'Employee_upload']);
Route::get('/Employee_Holidays_fetch_all', [HolidaysListController::class, 'Holidays_fetch_all']);
Route::delete('/Employee_Holidays_Data_Delete/{id}', [HolidaysListController::class, 'Holidays_Data_Delete']);
Route::put('/Employees_Holidays_update/{id}', [HolidaysListController::class, 'Employees_Holidays_update']);

//----------------------------------------------------------------
//Content Rendering
//----------------------------------------------------------------
Route::post('/create-topic', [ContentSectionController::class, 'createTopic']);
Route::put('/topic-update/{id}', [ContentSectionController::class, 'updateContent']);
Route::delete('/deletecontent/{id}', [ContentSectionController::class, 'deleteContent']);
Route::get('/getcontent ', [ContentSectionController::class, 'getContent']);
Route::put('/update-order', [ContentSectionController::class, 'updateOrder']);
Route::post('/uploadcontents', [ContentSectionController::class, 'uploadContentsFromTemplate']);
Route::get('/getUniqueContentNames', [ContentSectionController::class, 'getUniqueContentNames']);


//----------------------------------------------------------------
//Content Adding for specific topic
//----------------------------------------------------------------
Route::post('/education_addcontent', [AddContent_controller::class, 'addContent']);
Route::get('/getaddedcontent/section/{sectionId}', [AddContent_controller::class, 'getContentBySection']);
Route::put('/updateaddcontent/{id}', [AddContent_controller::class, 'updateContent']);
Route::delete('/deleteaddcontent/{id}', [AddContent_controller::class, 'deleteContent']);

//----------------------------------------------------------------
//TPA Exam Creation
//----------------------------------------------------------------
Route::get('/TPA_exams_getAll', [TPAExam_controller::class, 'TPAExam_getAll']);
Route::get('/TPA_exams_getByID/{id}', [TPAExam_controller::class, 'TPAExam_getByID']);
Route::post('/TPA_exams_create', [TPAExam_controller::class, 'TPAExam_store']);
Route::put('/TPA_exams_update/{id}', [TPAExam_controller::class, 'TPAExam_update']);
Route::delete('/TPA_exams_delete/{id}', [TPAExam_controller::class, 'TPAExam_destroy']);
Route::get('/TPA_exams_viewImage/{id}', [TPAExam_controller::class, 'TPAExam_viewImage']);
Route::get('/TPA_exams_viewPDF/{id}', [TPAExam_controller::class, 'TPAExam_viewPdf']);
Route::get('/TPA_exams_downloadPDF/{id}', [TPAExam_controller::class, 'TPAExam_downloadPdf']);
Route::put('/TPA_exams_updateIsApproved/{id}', [TPAExam_controller::class, 'TPAExam_updateIsApproved']);
Route::post('/uploadexams', [TPAExam_controller::class, 'uploadExamsFromTemplate']);
Route::get('/getUniqueExamNames', [TPAExam_controller::class, 'getUniqueExamNames']);
Route::get('/getExamNameWithID', [TPAExam_controller::class, 'getExamNames']);

//----------------------------------------------------------------
//Advertisement
//----------------------------------------------------------------
Route::post('/advertisements', [AdvertisementController::class, 'addAdvertisements']);
Route::get('/get_advertisements', [AdvertisementController::class, 'getAdvertisements']);
Route::put('/advertisements/{id}', [AdvertisementController::class, 'updateAdvertisement']);
Route::delete('/advertisements/{id}', [AdvertisementController::class, 'deleteAdvertisement']);


//-------------------------------------------------------------------------
//Test Management 
//-------------------------------------------------------------------------
Route::post('/TestManagement', [TestSeriesManagementController::class, 'TestManagement_insert']);
Route::put('/TestManagement_edit/{id}', [TestSeriesManagementController::class, 'TestManagement_edit']);
Route::get('/TestManagement_fetch/{id}', [TestSeriesManagementController::class, 'TestManagement_fetch_specfic']);
Route::get('/TestManagement_fetch_all', [TestSeriesManagementController::class, 'TestManagement_fetch_all']);
Route::delete('/TestManagement_delete/{id}', [TestSeriesManagementController::class, 'TestManagement_delete']);
//-------------------------------------------------------------------------
//Previous Question Paper
//-------------------------------------------------------------------------
Route::post('/previous-question-papers-store', [PreviousQuestionPaperController::class, 'store']);
Route::get('/previous-question-papers-show-all', [PreviousQuestionPaperController::class, 'index']);
Route::get('/previous-question-papers-show/{id}', [PreviousQuestionPaperController::class, 'show']);
Route::put('/previous-question-papers-update/{id}', [PreviousQuestionPaperController::class, 'update']);
Route::delete('/previous-question-papers-delete/{id}', [PreviousQuestionPaperController::class, 'destroy']);
Route::put('/previous-question-papers-isapprove/{id}', [PreviousQuestionPaperController::class, 'approve']);
Route::get('question-papers-view/{id}', [PreviousQuestionPaperController::class, 'viewPdf']);
Route::get('question-papers-download/{id}', [PreviousQuestionPaperController::class, 'downloadPdf']);

//----------------------------------------------------------------
//From Company 
//----------------------------------------------------------------


Route::get('/from-companies-index', [FromCompanyController::class, 'index']);           // Get all From companies (Index)
Route::post('/from-company-store', [FromCompanyController::class, 'store']);            // Create a new From company (Store)  
Route::get('/from-company-show/{id}', [FromCompanyController::class, 'show']);          // Get a specific From company by ID (Show)
Route::put('/from-company-update/{id}', [FromCompanyController::class, 'update']);      // Update an existing From company (Update)
Route::delete('/from-company-destroy/{id}', [FromCompanyController::class, 'destroy']);  // Delete a specific From company (Destroy)
Route::post('/from-company-upload', [FromCompanyController::class, 'uploadFromCompanies']);    // Upload From company data from Excel (Upload) 

Route::delete('/company/logo', [FromCompanyController::class, 'deleteLogo']);   // deleteLogo
Route::delete('/company/sign', [FromCompanyController::class, 'deleteSignImage']);  // deleteSignImage
Route::delete('/company/stamp', [FromCompanyController::class, 'deleteStampImage']);  // deleteStampImage
//----------------------------------------------------------------
//To Company 
//----------------------------------------------------------------


Route::get('/to-companies-index', [ToCompanyController::class, 'index']);                 // Index (get all companies)
Route::post('/to-company-store', [ToCompanyController::class, 'store']);                  // Store (create new company)
Route::get('/to-company-show/{id}', [ToCompanyController::class, 'show']);                // Show (get specific company)
Route::put('/to-company-update/{id}', [ToCompanyController::class, 'update']);             // Update (update specific company)
Route::delete('/to-company-destroy/{id}', [ToCompanyController::class, 'destroy']);       // Destroy (delete specific company)
Route::post('/to-company-upload', [ToCompanyController::class, 'upload']);               // Upload (upload multiple companies)

//----------------------------------------------------------------
//Project Details
//----------------------------------------------------------------

Route::get('/project-details-index', [ProjectDetailsController::class, 'index']);   // Get all project details
Route::post('/project-details-store', [ProjectDetailsController::class, 'store']);  // Store new project details
Route::get('/project-details-show/{id}', [ProjectDetailsController::class, 'show']); // Show specific project details
Route::put('/project-details-update/{id}', [ProjectDetailsController::class, 'update']); // Update project details
Route::delete('/project-details-destroy/{id}', [ProjectDetailsController::class, 'destroy']); // Delete project details
Route::post('/project-details-upload', [ProjectDetailsController::class, 'upload']);
Route::get('/get-deliverables', [ProjectDetailsController::class, 'getDeliverables']);


//----------------------------------------------------------------
//Generate Invoice
//----------------------------------------------------------------

Route::get('/generate-invoices-index', [GenerateInvoiceController::class, 'index']);
Route::post('/generate-invoices-store', [GenerateInvoiceController::class, 'store']);
Route::get('/generate-invoices-show/{id}', [GenerateInvoiceController::class, 'show']);
Route::put('/generate-invoices-update/{id}', [GenerateInvoiceController::class, 'update']);
Route::delete('/generate-invoices-destroy/{id}', [GenerateInvoiceController::class, 'destroy']);
Route::post('/generate-invoices-upload', [GenerateInvoiceController::class, 'upload']);
Route::get('/get-common-projects', [GenerateInvoiceController::class, 'getCommonProjects']);


//----------------------------------------------------------------
//Invoice
//----------------------------------------------------------------


// List all invoices
Route::get('/invoices', [InvoiceController::class, 'index']);

// Create a new invoice
Route::post('/invoices/store', [InvoiceController::class, 'store']);

// Show a single invoice by ID
Route::get('/invoices/show/{id}', [InvoiceController::class, 'show']);

// Update an existing invoice by ID
Route::put('/invoices/update/{id}', [InvoiceController::class, 'update']);

// Delete an existing invoice by ID
Route::delete('/invoices/delete/{id}', [InvoiceController::class, 'destroy']);


//-------------------------------------------------------------------------
//CreateGroup Management 
//-------------------------------------------------------------------------
Route::post('/CreateGroup', [CreateGroupsController::class, 'CreateGroup_insert']);
Route::put('/CreateGroup_edit/{id}', [CreateGroupsController::class, 'CreateGroup_edit']);
Route::get('/CreateGroup_fetch/{id}', [CreateGroupsController::class, 'CreateGroup_fetch_specfic']);
Route::get('/CreateGroup_fetch_all', [CreateGroupsController::class, 'CreateGroup_fetch_all']);
Route::delete('/CreateGroup_delete/{id}', [CreateGroupsController::class, 'CreateGroup_delete']);
Route::post('/CreateGroup_clone/{id}', [CreateGroupsController::class, 'CreateGroup_clone']);


//-------------------------------------------------------------------------
//RazorPay Online Payment Configuration
//-------------------------------------------------------------------------
Route::post('/create-order', [RazorpayOrderController::class, 'createOrder']);

Route::get('/get-razorpay-key', [RazorpayOrderController::class, 'getRazorpayKey']);

//-------------------------------------------------------------------------
//RazorPay Online Payment Storage
//-------------------------------------------------------------------------
Route::post('/store-payment-details', [PaymentStorageController::class, 'storePaymentDetails']);
Route::put('/payment-update/{id}', [PaymentStorageController::class, 'updatePaymentDetails']);
Route::get('/payment-get-all', [PaymentStorageController::class, 'getAllPayments']);
Route::get('/payment-get/{id}', [PaymentStorageController::class, 'getPaymentById']);
Route::delete('/payment-delete/{id}', [PaymentStorageController::class, 'deletePayment']);
Route::get('/check-payment-status', [PaymentStorageController::class, 'checkPaymentStatus']);
Route::post('/store-payment-status', [PaymentStorageController::class, 'storePaymentStatus']);




//-------------------------------------------------------------------------
//Notification alert
//-------------------------------------------------------------------------
Route::post('/Createnotificationalert', [NotificationAlertController::class, 'Createnotificationalert_insert']);
Route::put('/Createnotificationalert_edit/{id}', [NotificationAlertController::class, 'Createnotificationalert_edit']);
Route::get('/Createnotificationalert_fetch_all', [NotificationAlertController::class, 'Createnotificationalert_fetch_all']);
Route::delete('/Createnotificationalert_delete/{id}', [NotificationAlertController::class, 'Createnotificationalert_delete']);


//-------------------------------------------------------------------------
//Exam Pattern
//-------------------------------------------------------------------------
Route::get('/exam-pattern-show-all', [ExamPatternController::class, 'index']); // Get all exam patterns
Route::get('/exam-pattern/{id}', [ExamPatternController::class, 'show']); // Get a specific exam pattern
Route::post('/exam-pattern/store', [ExamPatternController::class, 'store']); // Store a new exam pattern
Route::put('/exam-pattern/update/{id}', [ExamPatternController::class, 'update']); // Update an exam pattern
Route::delete('/exam-pattern-delete/{id}', [ExamPatternController::class, 'destroy']); // Delete an exam pattern

//-------------------------------------------------------------------------
//Current Affairs Category
//-------------------------------------------------------------------------
Route::get('/getAll_categories', [CurrentAffairCategoryController::class, 'AffairCategory_getAll']);
Route::get('/get_categories/{id}', [CurrentAffairCategoryController::class, 'AffairCategory_show']);
Route::get('/get_categories_bySlug/{slug}', [CurrentAffairCategoryController::class, 'AffairCategory_getBy_slug']);
Route::post('/store_categories', [CurrentAffairCategoryController::class, 'AffairCategory_store']);
Route::put('/update_categories/{id}', [CurrentAffairCategoryController::class, 'AffairCategory_update']);
Route::delete('/delete_categories/{id}', [CurrentAffairCategoryController::class, 'AffairCategory_destroy']);

//-----------------------------------------------------------------------
//Current Affairs Articles
//-----------------------------------------------------------------------
Route::post('/articles_create', [CurrentAffairsArticlesController::class, 'create']);
Route::get('/articles_getAll', [CurrentAffairsArticlesController::class, 'getAll']);
Route::get('/articles_get/{id}', [CurrentAffairsArticlesController::class, 'getIndividual']);
Route::put('/articles_update/{id}', [CurrentAffairsArticlesController::class, 'update']);
Route::delete('/articles_delete/{id}', [CurrentAffairsArticlesController::class, 'delete']);