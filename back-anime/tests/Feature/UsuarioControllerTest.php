<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class UsuarioControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testShowUser()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->json('GET', "/api/showUser/{$user->id}");

        $response->assertStatus(200)
            ->assertJson([
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'created_at' => $user->created_at->toJSON(),
                'updated_at' => $user->updated_at->toJSON(),
            ]);
    }

    public function testUpdateUser()
    {
        $user = User::factory()->create();
        $data = ['name' => 'Nombre Actualizado'];

        $response = $this->actingAs($user)->json('PATCH', "/api/updateUser/{$user->id}", $data);

        $response->assertStatus(200)
            ->assertJson(['success' => true])
            ->assertJsonStructure(['success', 'editarUsuario' => ['id', 'name', 'email', 'created_at', 'updated_at']]);

        $this->assertDatabaseHas('users', ['id' => $user->id, 'name' => 'Nombre Actualizado']);
    }
}
