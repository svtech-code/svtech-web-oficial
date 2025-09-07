export async function POST({ request }: { request: Request }) {
  try {
    const { token } = await request.json();

    if (!token) {
      return new Response(JSON.stringify({ success: false, error: 'Token requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verificar con Cloudflare Turnstile
    const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: import.meta.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    });

    const result = await response.json();

    return new Response(
      JSON.stringify({
        success: result.success,
        error: result.success ? null : 'Verificación fallida',
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
