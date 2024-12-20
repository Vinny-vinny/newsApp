<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegisterUserTest extends TestCase
{
    use RefreshDatabase;

    public function testItCanRegisterUserSuccessfully()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'john@doe.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(200)->assertJson([
            'success' => true,
            'message' => 'Registration successful.'
        ]);
    }

    public function testItFailsRegistrationWithMissingFields()
    {
        $response = $this->postJson('/api/register', []);

        $response->assertStatus(422);
    }

    public function testItFailsRegistrationWithDuplicateEmail()
    {
        User::factory()->create([
            'email' => 'testuser@example.com',
        ]);

        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'testuser@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(422);
    }

    public function testItFailsRegistrationWithPasswordMismatch()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'testuser@example.com',
            'password' => 'password',
            'password_confirmation' => 'different_password',
        ]);

        $response->assertStatus(422);
    }
}
