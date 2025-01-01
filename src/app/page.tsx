import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ana Sayfa | Modern Next.js Uygulaması",
  description: "Modern ve kişisel Next.js web uygulaması",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Hoş Geldiniz
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Modern ve güçlü Next.js web uygulamamıza hoş geldiniz.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                Özellikler
              </h2>
              <ul className="text-left text-gray-600 dark:text-gray-300 space-y-2">
                <li>✨ Modern Tasarım</li>
                <li>🚀 Yüksek Performans</li>
                <li>🌙 Karanlık Mod Desteği</li>
                <li>📱 Mobil Uyumlu</li>
              </ul>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                Başlayın
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Projemizi keşfetmeye başlamak için hazır mısınız?
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors">
                Keşfet
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
