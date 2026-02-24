import Link from "next/link";

const products = [
  {
    id: 1,
    name: "A2 Cow Ghee",
    description: "Pure Bilona method ghee from indigenous Gir cows",
    price: "₹899",
    image: "🫙",
  },
  {
    id: 2,
    name: "Raw Forest Honey",
    description: "Unprocessed, wild honey from Himalayan forests",
    price: "₹499",
    image: "🍯",
  },
  {
    id: 3,
    name: "Buffalo Ghee",
    description: "Traditional buffalo ghee, rich and aromatic",
    price: "₹749",
    image: "🫙",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cream via-amber-50 to-orange-50 py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-6xl mb-4">🕉️</div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-darkBrown mb-4">
            Golden Elixir of Life
          </h1>
          <p className="text-xl text-secondary mb-2">
            Pure. Authentic. Traditional.
          </p>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Experience the ancient wisdom of Vedic nutrition with our hand-crafted
            ghee and natural products, made the traditional way.
          </p>
          <Link
            href="#shop"
            className="inline-block bg-primary text-white font-semibold px-8 py-4 rounded-xl hover:bg-orange-600 transition-colors text-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-darkBrown text-center mb-10">
            Our Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-cream rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-amber-100"
              >
                <div className="text-5xl mb-4 text-center">{product.image}</div>
                <h3 className="text-xl font-serif font-bold text-darkBrown mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">{product.price}</span>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-darkBrown mb-10">
            Why Vedic Origins?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: "🌿", title: "100% Natural", desc: "No additives, preservatives or artificial ingredients" },
              { icon: "🐄", title: "A2 Milk Only", desc: "Sourced from indigenous Gir and Sahiwal cow breeds" },
              { icon: "✨", title: "Traditional Process", desc: "Bilona method preserving ancient nutritional wisdom" },
            ].map((value) => (
              <div key={value.title} className="flex flex-col items-center">
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="font-serif font-bold text-darkBrown text-lg mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
