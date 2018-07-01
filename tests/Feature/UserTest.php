<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function testRegister()
    {
        //Test registration
        $this->post('/api/auth/create',
            ['name' => 'TestUser', 'email' => 'test@example.com', 'password' => 'password123', 'password_confirm' => 'password123']
        )->assertJsonStructure(['status', 'data' => ['access_token', 'token_type', 'expires_in']]);
        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);

        //Test registration with invalid data
        $this->post('/api/auth/create', ['name' => 'TestUser', 'email' => 'test@notOkayEmail', 'password' => 'password123', 'password_confirm' => 'password123'])
          ->assertJson(['status' => 'validation', 'errors' => ['email' => []]]);
    }

    public function testLogin()
    {
        //Register a user
        $this->post('/api/auth/create',
            ['name' => 'TestUser', 'email' => 'test@example.com', 'password' => 'password123', 'password_confirm' => 'password123']
        )->assertJsonStructure(['status', 'data' => ['access_token', 'token_type', 'expires_in']]);

        //Try Valid login
        $this->post('/api/auth/login', ['email' => 'test@example.com', 'password' => 'password123'])
          ->assertJsonStructure(['status', 'data' => ['access_token', 'token_type', 'expires_in']]);
        //Try Invalid Login
        $this->post('/api/auth/login', ['email' => 'test@example.com', 'password' => 'wrongPassword'])
          ->assertJson(['status' => 'unauthorized']);

        //Try Missing Field
        $this->post('/api/auth/login', ['email' => 'test@example.com'])
          ->assertJson(['status' => 'validation', 'errors' => ['password' => []]]);
    }
}
