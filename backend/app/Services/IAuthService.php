<?php

namespace App\Services;

interface IAuthService
{
    /**
     * @param array{email:string,password:string} $credentials
     * @return array{token:string,user:array{id:int,name:string,email:string,roles:mixed}}
     */
    public function login(array $credentials): array;

    public function logout(): void;

    /**
     * @return array{token:string,user:array{id:int,name:string,email:string,roles:mixed}}
     */
    public function refresh(): array;
}
