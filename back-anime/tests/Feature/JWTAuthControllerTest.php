<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;

class JWTAuthControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testRegister()
    {
        $data = [
            'name' => 'Nuevo Usuario',
            'email' => 'nuevo@usuario.com',
            'password' => 'UNAclave1234',
            'password_confirmation' => 'UNAclave1234'
        ];

        $response = $this->json('POST', '/api/register', $data);

        $response->assertStatus(201)
            ->assertJsonStructure(['user' => ['id', 'name', 'email', 'created_at', 'updated_at']]);

        $this->assertDatabaseHas('users', ['email' => 'nuevo@usuario.com']);
    }

    public function testLogin()
    {
        $user = User::factory()->create(['password' => bcrypt('password123')]);
        $data = ['email' => $user->email, 'password' => 'password123'];

        $response = $this->json('POST', '/api/login', $data);

        $response->assertStatus(200)
            ->assertJsonStructure(['token', 'user' => ['id', 'name', 'email', 'created_at', 'updated_at']]);
    }

    public function testLoginWithInvalidCredentials()
    {
        $user = User::factory()->create(['password' => bcrypt('UNAclave1234')]);
        $data = ['email' => $user->email, 'password' => 'wrongpassword'];

        $response = $this->json('POST', '/api/login', $data);

        $response->assertStatus(401)
            ->assertJson(['error' => 'Credenciales inválidas']);
    }

    public function testLogout()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->json('POST', '/api/logout');

        $response->assertStatus(200)
            ->assertJson(['message' => 'Cierre de sesión exitoso']);
    }

    public function testRefresh()
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->json('POST', '/api/refresh');

        $response->assertStatus(200)
            ->assertJsonStructure(['access_token', 'token_type', 'expires_in']);
    }
}
