<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Helper\CodeUUID;

class Filme extends Model
{
    use CodeUUID;

    protected $table = 'filmes';

    protected $fillable = [
        'id',
        'titulo',
        'ano_lancamento',
        'genero',
        'sinopse',
        'url_imagem'
    ];
}
