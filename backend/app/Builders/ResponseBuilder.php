<?php

namespace App\Builders;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class ResponseBuilder
{
    protected bool $success = true;
    protected string $message = '';
    protected mixed $data = null;
    protected int $status = 200;

    public function success(): self
    {
        $this->success = true;
        return $this;
    }

    public function error(): self
    {
        $this->success = false;
        return $this;
    }

    public function message(string $message): self
    {
        $this->message = $message;
        return $this;
    }

    public function data(mixed $data): self
    {
        $this->data = $data;
        return $this;
    }


    public function status(int $status): self
    {
        if (!in_array($status, SymfonyResponse::$statusTexts)) {
            $status = $this->success ? Response::HTTP_OK : Response::HTTP_INTERNAL_SERVER_ERROR;
        }

        $this->status = $status;
        return $this;
    }

    public function send(): JsonResponse
    {
        return response()->json([
            'status'  => $this->success,
            'message' => $this->message,
            'data'    => $this->success ? $this->data : [],
        ], $this->status, options: JSON_UNESCAPED_SLASHES);
    }
}
