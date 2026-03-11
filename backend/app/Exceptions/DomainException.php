<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DomainException extends Exception
{
    public function __construct(string $message, int $code, ?Exception $previous = null, private ?bool $error = true)
    {
        parent::__construct($message, $code, $previous);
    }

    public function isError(): bool
    {
        return $this->error;
    }
}
