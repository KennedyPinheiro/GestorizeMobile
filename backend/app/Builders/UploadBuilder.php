<?php

namespace App\Builders;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facadesx\Storage;

class UploadBuilder
{
    protected ?UploadedFile $file = null;
    protected ?string $directory = null;
    protected ?string $disk = null;
    protected ?string $filename = null;

    public static function make(): self
    {
        return new self();
    }

    public function file(UploadedFile $file): self
    {
        $this->file = $file;
        return $this;
    }

    public function directory(string $directory): self
    {
        $this->directory = $directory;
        return $this;
    }

    public function disk(string $disk): self
    {
        $this->disk = $disk;
        return $this;
    }

    public function filename(string $filename): self
    {
        $this->filename = $filename;
        return $this;
    }

    public function save(): ?string
    {
        if (!$this->file) {
            return null;
        }

        $disk = $this->disk ?? config('filesystems.default');
        $directory = $this->directory ?? '';
        $filename = $this->filename ?? $this->file->hashName();
        
        return $this->file->storeAs($directory, $filename, $disk);
    }
}