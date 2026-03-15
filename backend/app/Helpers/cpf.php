<?php

use Illuminate\Support\Str;

function validar_cpf(string $cpf): bool
{
    $cpf = preg_replace('/[^0-9]/', '', $cpf);

    if (strlen($cpf) !== 11 || preg_match('/(\d)\1{10}/', $cpf)) {
        return false;
    }

    for ($t = 9; $t < 11; $t++) {
        $d = 0;
        for ($c = 0; $c < $t; $c++) {
            $d += $cpf[$c] * (($t + 1) - $c);
        }

        $d = ((10 * $d) % 11) % 10;
        if ($cpf[$t] != $d) {
            return false;
        }
    }

    return true;
}

function gerar_cpf(): string
{
    $n = [];

    for ($i = 0; $i < 9; $i++) {
        $n[$i] = random_int(0, 9);
    }

    $n[9] = calcular_digito($n, 10);

    $n[10] = calcular_digito($n, 11);

    return implode('', $n);
}

function calcular_digito(array $n, int $peso): int
{
    $soma = 0;
    for ($i = 0; $i < $peso - 1; $i++) {
        $soma += $n[$i] * ($peso - $i);
    }

    $resto = ($soma * 10) % 11;
    return ($resto == 10) ? 0 : $resto;
}
function validar_cnpj(string $cnpj): bool
{
    $cnpj = preg_replace('/[^0-9]/', '', $cnpj);

    if (strlen($cnpj) !== 14 || preg_match('/(\d)\1{13}/', $cnpj)) {
        return false;
    }

    $digits = array_map('intval', str_split($cnpj));

    $dv1 = calcular_digito_cnpj(array_slice($digits, 0, 12), 5);
    if ($digits[12] !== $dv1) {
        return false;
    }

    $dv2 = calcular_digito_cnpj(array_slice($digits, 0, 13), 6);
    if ($digits[13] !== $dv2) {
        return false;
    }

    return true;
}

function gerar_cnpj(): string
{
    $n = [];

    for ($i = 0; $i < 12; $i++) {
        $n[$i] = random_int(0, 9);
    }

    $n[12] = calcular_digito_cnpj($n, 5);
    $n[13] = calcular_digito_cnpj($n, 6);

    return implode('', $n);
}

function calcular_digito_cnpj(array $n, int $pesoInicial): int
{
    $soma = 0;
    $peso = $pesoInicial;

    for ($i = 0; $i < count($n); $i++) {
        $soma += $n[$i] * $peso;
        $peso--;
        if ($peso < 2) {
            $peso = 9;
        }
    }

    $resto = $soma % 11;
    return ($resto < 2) ? 0 : 11 - $resto;
}
