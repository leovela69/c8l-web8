import { NextRequest, NextResponse } from 'next/server'

/**
 * API Route: /api/generate
 * Genera imágenes usando Pollinations AI (100% gratis, sin API key).
 * 
 * Flujo:
 * 1. Frontend envía prompt + tamaño + estilo
 * 2. Esta API construye la URL de Pollinations
 * 3. Devuelve las URLs de las imágenes generadas
 * 
 * Pollinations es gratuito e ilimitado.
 * Backup: HuggingFace FLUX (si Pollinations falla)
 */

const POLLINATIONS_BASE = 'https://image.pollinations.ai/prompt'

// Mejora el prompt para obtener mejores resultados
function enhancePrompt(prompt: string, niche: string, style: string): string {
  const nicheEnhancers: Record<string, string> = {
    portada: 'album cover art, music artwork, professional, high quality, square format',
    post: 'social media post design, modern, eye-catching, professional graphic design',
    poster: 'event poster, vertical format, bold typography space, professional print design',
    logo: 'logo design, vector style, clean, professional, minimal background, centered',
  }

  const styleEnhancers: Record<string, string> = {
    'Neon/Cyberpunk': 'neon lights, cyberpunk aesthetic, glowing, dark background, futuristic',
    'Neon': 'neon colors, glowing effects, dark background',
    'Minimalista': 'minimalist, clean, simple, lots of negative space, elegant',
    'Dark/Gothic': 'dark gothic, moody, dramatic lighting, black and dark tones',
    'Tropical': 'tropical vibes, palm trees, bright colors, paradise, summer',
    'Lo-fi/Anime': 'lo-fi aesthetic, anime art style, soft colors, chill atmosphere',
    'Retro/Vintage': 'retro vintage, 80s aesthetic, grain texture, warm colors',
    'Abstract': 'abstract art, geometric shapes, vibrant colors, artistic',
    'Street/Urban': 'street art, urban style, graffiti, concrete, raw',
    'Club/Fiesta': 'nightclub, party vibes, neon, dance, energy, lasers',
    'Gaming/Esports': 'gaming, esports, aggressive, dynamic, tech, RGB',
    'Elegante/Luxury': 'luxury, elegant, gold accents, premium, sophisticated',
    'Tech/Startup': 'tech startup, modern, digital, blue tones, futuristic',
  }

  let enhanced = prompt

  // Agregar contexto del nicho
  if (nicheEnhancers[niche]) {
    enhanced += `, ${nicheEnhancers[niche]}`
  }

  // Agregar estilo
  if (style && styleEnhancers[style]) {
    enhanced += `, ${styleEnhancers[style]}`
  }

  // Calidad
  enhanced += ', 4k, ultra detailed, professional quality'

  return enhanced
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, width, height, niche, style, num_images } = body

    if (!prompt) {
      return NextResponse.json({ success: false, error: 'Prompt requerido' }, { status: 400 })
    }

    const enhancedPrompt = enhancePrompt(prompt, niche || 'post', style || '')
    const count = Math.min(num_images || 2, 4)

    // Generar URLs de Pollinations (cada seed diferente = imagen diferente)
    const images: string[] = []
    for (let i = 0; i < count; i++) {
      const seed = Math.floor(Math.random() * 999999)
      const w = Math.min(width || 1024, 1024)  // Pollinations max 1024
      const h = Math.min(height || 1024, 1024)

      const encodedPrompt = encodeURIComponent(enhancedPrompt)
      const url = `${POLLINATIONS_BASE}/${encodedPrompt}?width=${w}&height=${h}&seed=${seed}&model=flux&nologo=true`

      images.push(url)
    }

    return NextResponse.json({
      success: true,
      images,
      prompt: enhancedPrompt,
      niche,
      style,
    })

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
