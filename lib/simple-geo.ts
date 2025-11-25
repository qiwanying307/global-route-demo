// lib/simple-geo.ts
import { geolocation } from '@vercel/functions'

export function getUserCountry(request: Request): string {
  return geolocation(request).country || 'US'
}

// 三国配置
export const COUNTRY_CONFIG = {
  'CN': {
    name: '中国',
    lang: 'zh',
    greeting: '你好！欢迎来到美食世界',
    color: 'red',
    currency: '¥'
  },
  'US': {
    name: 'USA', 
    lang: 'en',
    greeting: 'Hello! Welcome to Food World',
    color: 'blue',
    currency: '$'
  },
  'JP': {
    name: '日本',
    lang: 'ja', 
    greeting: 'こんにちは！美食の世界へようこそ',
    color: 'red',
    currency: '¥'
  }
}