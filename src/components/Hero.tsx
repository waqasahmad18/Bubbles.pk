export default function Hero() {
  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero.jpg')"
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-24 flex flex-col justify-center h-full">
        <div className="w-full md:w-1/2 text-left text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">
            Discover Stylish Comfort
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-200">
            Premium shoes & snikers, delivered by{' '}
            <span className="text-blue-300 font-semibold">Bubbles.pk</span>
          </p>
          <a
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-sm md:text-base font-medium hover:bg-blue-700 transition drop-shadow"
          >
            🛍️ Shop Now
          </a>
        </div>
      </div>
    </section>
  )
}
