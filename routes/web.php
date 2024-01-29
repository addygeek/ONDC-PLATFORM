<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('home',function()
{
   
    return view('home');
});


Route::get('about', function () {
    return view('about');})->name('about');

Route::get('contact', function () {
        return view('contact');})->name('contact');




// //ROUTE GROUPING
// Route::group(['prefix'=> 'customer'], function(){
//     Route::get('/', function(){
//         return "<h1>Customer List</h1>";
//     });
//     Route::get('/create', function(){
//         return "<h1>Customer Create</h1>";
//     });
//     Route::get('/show', function(){
//         return "<h1>Customer Show</h1>";
//     });
// });
// Route::get('about', function () {
//     return "<h1>About Page</h1>";})->name("aboutpg");

// Route::get('contact', function () {
//     return "<h1>Contact Page</h1>";});
// //Below is the dynamic routing of website with {Id} is parameter
// Route::get('contact/{id}', function ($id) {
// return $id;
// });
// Route::get('home', function () {
// return "<h1>Home Page</h1>
//         <a href='/about'>About us</a> <br>
//         <a href='".route("aboutpg")."'>About us</a>
//     <br>    <a href='/contact'>Contact us</a> <br>
//        <a href='/contact/ADDY'>Contact Me</a> <br>
// ";});


// //if any wrong route then lead to this page
// Route::fallback(function(){
//     return "ITS NOT FOUND";
// });











//LEARNINGS BELOW FOR UNDERSTAND MY CONCEPTS AND LOGIC PURPOSE
// //below is static pages routing
// Route::get('about', function () {
//     return "<h1>About Page</h1>";})->name("aboutpg");

// Route::get('contact', function () {
//     return "<h1>Contact Page</h1>";});
// //Below is the dynamic routing of website with {Id} is parameter
// Route::get('contact/{id}', function ($id) {
// return $id;
// });
// //route with multiple links
// Route::get('home', function () {
// return "<h1>Home Page</h1>
//         <a href='/about'>About us</a> <br>
//         <a href='".route("aboutpg")."'>About us</a>
//     <br>    <a href='/contact'>Contact us</a> <br>
//        <a href='/contact/ADDY'>Contact Me</a> <br>
// ";});

//ROUTE METHODS
//GET- request from resource
//POST - create a new resource
//PUT- uplaod the resource
//patch- modify update the resource
//delete - simply delete resource

