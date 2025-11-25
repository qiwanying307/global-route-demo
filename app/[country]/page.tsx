// app/[country]/page.tsx
import { type NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { getUserCountry, COUNTRY_CONFIG } from '@/lib/simple-geo'

// 动态页面：cn/us/jp
export default async function CountryPage({ params }: { params: { country: string } }) {
  // 🎯 从 URL 参数获取国家
  const countryCode = params?.country?.toUpperCase()
  const config = COUNTRY_CONFIG[countryCode as keyof typeof COUNTRY_CONFIG] || COUNTRY_CONFIG['US']
  
  // 🎯 也可以从 middleware 注入的 headers 获取
  const headersList = headers()
  const detectedCountry = (await headersList).get('x-user-country')
  
  return (
    <div className={`min-h-screen bg-gray-50 flex items-center justify-center`}>
      <div className="text-center p-8">
        {/* 国旗颜色背景 */}
        <div className={`w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold bg-${config.color}-500`}>
          {countryCode}
        </div>
        
        {/* 个性化问候语 */}
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          {config.greeting}
        </h1>
        
        {/* 国家信息 */}
        <div className="bg-white p-6 rounded-lg shadow-md inline-block">
          <p className="text-xl mb-2">国家: <strong>{config.name}</strong></p>
          <p className="text-lg text-gray-600">语言: {config.lang.toUpperCase()}</p>
          <p className="text-lg text-gray-600">货币: {config.currency}</p>
        </div>
        
        {/* 当前 URL 显示 */}
        <p className="mt-6 text-gray-500">
          当前页面: /{params.country}
        </p>
      </div>
    </div>
  )
}

// 生成三个国家的静态页面
export function generateStaticParams() {
  return [
    { country: 'cn' },
    { country: 'us' }, 
    { country: 'jp' }
  ]
}