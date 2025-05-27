const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Logo & Brief */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide text-primary mb-2">
            Nox Cart
          </h2>
          <p className="text-sm text-base-content/70 leading-relaxed">
            Elevate your lifestyle with Nox Cart — your trusted destination for
            premium products, unmatched quality, and effortless shopping.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/products" className="hover:text-primary transition">
                All Products
              </a>
            </li>
            <li>
              <a href="/categories" className="hover:text-primary transition">
                Categories
              </a>
            </li>
            <li>
              <a href="/featured" className="hover:text-primary transition">
                Featured
              </a>
            </li>
            <li>
              <a href="/new-arrivals" className="hover:text-primary transition">
                New Arrivals
              </a>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/contact" className="hover:text-primary transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-primary transition">
                FAQs
              </a>
            </li>
            <li>
              <a href="/shipping" className="hover:text-primary transition">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-primary transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm text-base-content/70 mb-4">
            Get exclusive offers and the latest updates straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full sm:flex-1"
            />
            <button className="btn btn-primary w-full sm:w-auto">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-base-300 text-xs text-center py-6 text-base-content/60">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Nox Cart. All rights reserved.</p>
          <div className="flex space-x-4 text-base-content/60 text-lg">
            {/* Replace with your actual social media links/icons */}
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-primary transition"
            >
              🐦
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-primary transition"
            >
              📸
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-primary transition"
            >
              📘
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
