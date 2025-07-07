<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Model;

trait HasFile
{
    /**
     * Mengunggah file ke disk 'public'.
     */
    public function upload_file(Request $request, string $column, string $folder): ?string
    {
        // Tambahkan 'public' sebagai parameter kedua untuk menyimpan ke disk publik
        return $request->hasFile($column) ? $request->file($column)->store($folder, 'public') : null;
    }

    /**
     * Memperbarui file di disk 'public'.
     */
    public function update_file(Request $request, Model $model, string $column, string $folder): ?string
    {
        if ($request->hasFile($column)) {
            // Hapus file lama dari disk 'public' jika ada
            if ($model->$column) {
                Storage::disk('public')->delete($model->$column);
            }

            // Simpan file baru ke disk 'public'
            $thumbnail = $request->file($column)->store($folder, 'public');
        } else {
            $thumbnail = $model->$column;
        }

        return $thumbnail;
    }

    /**
     * Menghapus file dari disk 'public'.
     */
    public function delete_file(Model $model, string $column): void
    {
        if ($model->$column) {
            // Hapus file dari disk 'public'
            Storage::disk('public')->delete($model->$column);
        }
    }
}