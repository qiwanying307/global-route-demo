// middleware.ts
import { type NextRequest, NextResponse } from 'next/server'
import { geolocation } from '@vercel/functions'

export function middleware(request: NextRequest) {
  const country = geolocation(request).country // 🎯 一行获取国家
  
  // 只处理这三个国家
  const countryMap: Record<string, string> = {
    'CN': 'cn',
    'US': 'us', 
    'JP': 'jp'
  }
  
  const targetCountry = countryMap[country || 'US'] || 'us'
  
  // 如果已经在目标路径，不重定向
  if (request.nextUrl.pathname === `/${targetCountry}`) {
    return NextResponse.next()
  }
  
  // 重定向到对应国家页面
  return NextResponse.redirect(new URL(`/${targetCountry}`, request.url))
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}