import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
            QuickVeggie Market
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with local vegetable vendors, find the best prices, and shop smarter
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <Link href="/search" className="block">
              <div className="flex items-center bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 cursor-pointer">
                <input
                  type="text"
                  placeholder="Search for vegetables or vendors..."
                  className="w-full bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-500"
                  readOnly
                />
                <span className="text-green-600">Search →</span>
              </div>
            </Link>
          </div>

          <div className="flex justify-center gap-4">
            <Link href="/markets" 
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
              Find Markets
            </Link>
            <Link href="/vendors/register"
              className="bg-white text-green-600 border border-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition">
              Register as Vendor
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose QuickVeggie?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Real-time Prices"
              description="Get up-to-date prices from various vendors in your local market"
              icon="💰"
            />
            <FeatureCard 
              title="Find Nearby Markets"
              description="Discover and navigate local vegetable markets easily"
              icon="📍"
            />
            <FeatureCard 
              title="Compare & Save"
              description="Compare prices across different vendors to get the best deals"
              icon="📊"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-green-50 p-6 rounded-xl text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
