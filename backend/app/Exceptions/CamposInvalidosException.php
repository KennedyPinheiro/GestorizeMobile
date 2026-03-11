<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Response;

class CamposInvalidosException extends DomainException
{
    protected $errors = [];

    public function __construct(
        mixed $message = null,
        int $code = Response::HTTP_UNPROCESSABLE_ENTITY,
        ?Exception $previous = null
    ) {
        if (is_array($message)) {
            $this->errors = $message;
            $message = 'Os campos informados são inválidos: ' . implode(', ', array_keys($message));
        }

        if (!is_string($message)) {
            $message = 'Os campos informados são inválidos.';
        }

        parent::__construct($message, $code, $previous);
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

    public function getStatusCode(): int
    {
        return Response::HTTP_UNPROCESSABLE_ENTITY;
    }
}
