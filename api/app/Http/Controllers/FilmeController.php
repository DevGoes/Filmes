<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Filme;

class FilmeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $filmes = Filme::all();
        return response()->json($filmes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'titulo' => 'required|string|max:255',
            'ano_lancamento' => 'required|integer|min:1800|max:' . now()->year,
            'genero' => 'required|string|max:100',
            'sinopse' => 'nullable|string',
            'url_imagem' => 'nullable|string',
        ]);

        $filme = Filme::create($data);

        return response()->json([
            'message' => 'Filme criado com sucesso!',
            'filme' => $filme
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $filme = Filme::find($id);

        if (!$filme) {
            return response()->json(['error' => 'Filme não encontrado'], 404);
        }

        return response()->json($filme);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $filme = Filme::find($id);

        if (!$filme) {
            return response()->json(['error' => 'Filme não encontrado'], 404);
        }

        $data = $request->validate([
            'titulo' => 'sometimes|required|string|max:255',
            'ano_lancamento' => 'sometimes|required|integer|min:1800|max:' . now()->year,
            'genero' => 'sometimes|required|string|max:100',
            'sinopse' => 'nullable|string',
            'url_imagem' => 'nullable|string',
        ]);

        $filme->update($data);

        return response()->json([
            'message' => 'Filme atualizado com sucesso!',
            'filme' => $filme
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $filme = Filme::find($id);

        if (!$filme) {
            return response()->json(['error' => 'Filme não encontrado'], 404);
        }

        $filme->delete();

        return response()->json(['message' => 'Filme removido com sucesso']);
    }
}
