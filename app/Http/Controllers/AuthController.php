<?php

namespace App\Http\Controllers;

use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use JWTAuth;
use Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'create']]);
    }

    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);

        $validator = Validator::make($credentials, [
            'email'    => 'required|max:255',
            'password' => 'required|max:255',
        ]);

        if ($validator->fails()) {
            return ['status' => 'validation', 'errors' => $validator->errors()];
        }

        if (!$token = auth()->attempt($credentials)) {
            return ['status' => 'unauthorized', 'errors' => ['The email and password combination are incorrect']];
        }

        return ['status' => 'success', 'data' => $this->getToken($token)];
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'            => 'required|email|unique:users|max:255',
            'password'         => 'required|max:255',
            'password_confirm' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return ['status' => 'validation', 'errors' => $validator->errors()];
        }

        $user = new User();
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();
        $user->postSignupActions();
        $token = JWTAuth::fromUser($user);

        return ['status' => 'success', 'data' => $this->getToken($token)];
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json($this->getToken($token));
    }

    protected function getToken($token)
    {
        return [
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth()->factory()->getTTL() * 60,
        ];
    }
}
