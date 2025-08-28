<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class RefreshToken extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param \Closure $next
     * @param string|null $guard
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $guard = 'api')
    {
        try {
            // Tenta autenticar o usuário com o token atual
            if (!$this->auth->parseToken()->authenticate()) {
                return response()->json(['error' => 'Usuário não encontrado'], 401);
            }

            return $next($request);

        } catch (TokenExpiredException $tee) {
            try {
                // Tenta renovar o token
                $newToken = Auth::guard($guard)->refresh();
                $user = Auth::guard($guard)->user();

            } catch (JWTException $jwte) {
                return response()->json(['error' => 'Token inválido! Conecte-se para continuar.'], 401);
            }

            // Define o novo token no cabeçalho
            $request->headers->set('Authorization', 'Bearer ' . $newToken);

            // Retorna a resposta com o novo token
            return response()->json([
                'message' => 'Token renovado com sucesso',
                'access_token' => $newToken,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60,
                'user' => $user
            ]);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token inválido! Conecte-se para continuar.'], 401);
        }

        return $next($request);
    }
}
