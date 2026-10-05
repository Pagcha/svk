"use client";

import React, { useEffect } from "react";

type Product = {
  name: string;
  category: string;
  image: string;
};

const categoryGroups = [
  {
    category: "Актуаторы",
    items: [
      { name: "Пневмоцилиндры", category: "Актуаторы", image: "https://www.pemaks.ru/upload/dev2fun.imagecompress/webp/iblock/323/s0cc8gzgrkbth5gkkkan0vy13w3sr8tu/2.webp" },
      { name: "Пневмоприводы", category: "Актуаторы", image: "https://www.pemaks.ru/upload/dev2fun.imagecompress/webp/iblock/323/s0cc8gzgrkbth5gkkkan0vy13w3sr8tu/2.webp" },
      { name: "Пневмомоторы", category: "Актуаторы", image: "https://www.pemaks.ru/upload/dev2fun.imagecompress/webp/iblock/323/s0cc8gzgrkbth5gkkkan0vy13w3sr8tu/2.webp" },
    ],
  },
  {
    category: "Пневмомагистраль",
    items: [
      { name: "Фитинги", category: "Пневмомагистраль", image: "https://www.pemaks.ru/upload/dev2fun.imagecompress/webp/iblock/323/s0cc8gzgrkbth5gkkkan0vy13w3sr8tu/2.webp" },
      { name: "Трубы и шланги", category: "Пневмомагистраль", image: "https://www.pemaks.ru/upload/dev2fun.imagecompress/webp/iblock/323/s0cc8gzgrkbth5gkkkan0vy13w3sr8tu/2.webp" },
      { name: "Блоки подготовки воздуха", category: "Пневмомагистраль", image: "https://www.pemaks.ru/upload/dev2fun.imagecompress/webp/iblock/323/s0cc8gzgrkbth5gkkkan0vy13w3sr8tu/2.webp" },
    ],
  },
  {
    category: "Регулировка воздуха",
    items: [
      { name: "Распределители", category: "Регулировка воздуха", image: "https://www.pemaks.ru/upload/dev2fun.imagecompress/webp/iblock/323/s0cc8gzgrkbth5gkkkan0vy13w3sr8tu/2.webp" },
      { name: "Редукторы", category: "Регулировка воздуха", image: "https://www.pemaks.ru/upload/dev2fun.imagecompress/webp/iblock/323/s0cc8gzgrkbth5gkkkan0vy13w3sr8tu/2.webp" },
      { name: "Дроссели", category: "Регулировка воздуха", image: "https://www.pemaks.ru/upload/dev2fun.imagecompress/webp/iblock/323/s0cc8gzgrkbth5gkkkan0vy13w3sr8tu/2.webp" },
    ],
  },
  {
    category: "Управление",
    items: [
      { name: "Блоки распределения", category: "Управление", image: "https://www.pemaks.ru/upload/dev2fun.imagecompress/webp/iblock/323/s0cc8gzgrkbth5gkkkan0vy13w3sr8tu/2.webp" },
      { name: "Датчики и реле", category: "Управление", image: "https://www.pemaks.ru/upload/dev2fun.imagecompress/webp/iblock/323/s0cc8gzgrkbth5gkkkan0vy13w3sr8tu/2.webp" },
      { name: "Элементы ручного управления", category: "Управление", image: "https://www.pemaks.ru/upload/dev2fun.imagecompress/webp/iblock/323/s0cc8gzgrkbth5gkkkan0vy13w3sr8tu/2.webp" },
    ],
  },
] as const;

export default function ProductsSection() {
  const photoRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-on-scroll");

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
      }
    );

    elements.forEach((element) => observer.observe(element));

    if (!photoRef.current) {
      return () => observer.disconnect();
    }

    const photo = photoRef.current;
    const updateParallax = () => {
      const section = photo.closest(".products-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const translate = (progress - 0.5) * 28;
      photo.style.transform = `translate3d(0, ${translate}px, 0) scale(1.06)`;
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateParallax);
      window.removeEventListener("resize", updateParallax);
    };
  }, []);

  return (
    <section className="products-section" id="products">
      <div className="products-shell">
        <div className="products-layout">
          <div className="products-main">
            <div className="section-header reveal-on-scroll">
              <span className="section-kicker">Каталог</span>
              <h2>Что мы предлагаем?</h2>
            </div>

            <div className="products-grid">
              {categoryGroups.map(({ category, items }, groupIndex) => (
                <div key={category} className="category-column reveal-on-scroll" style={{ transitionDelay: `${groupIndex * 80}ms` }}>
                  <div className="category-label">{category}</div>

                  <div className="column-items">
                    {items.map((product, index) => (
                      <article
                        key={`${product.name}-${category}-${index}`}
                        className="product-card reveal-on-scroll"
                        style={{ transitionDelay: `${index * 40}ms` }}
                      >
                        <div
                          className="product-image"
                          style={{ backgroundImage: `url(${product.image})` }}
                          aria-label={product.name}
                        >
                          <div className="product-image-overlay" />
                          <div className="product-content">
                            <h3>{product.name}</h3>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sticky-visual reveal-on-scroll" ref={photoRef} aria-hidden="true">
            <div className="visual-blob" />
            <div
              className="visual-photo"
              style={{ backgroundImage: `url(${categoryGroups[0].items[0].image})` }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .products-section {
          position: relative;
          overflow: hidden;
          padding: clamp(72px, 8vw, 120px) 0;
          background: linear-gradient(180deg, #ffffff 0%, #fff7f7 38%, #f8fafc 100%);
          color: #111827;
        }

        .products-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top left, rgba(239, 68, 68, 0.12), transparent 38%);
          pointer-events: none;
        }

        .products-shell {
          position: relative;
          z-index: 1;
          max-width: 1150px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .products-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(200px, 280px);
          gap: 24px;
          align-items: start;
        }

        .products-main {
          min-width: 0;
        }
        .section-header {
          margin-bottom: 28px;
        }

        .section-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          padding: 0.5rem 0.85rem;
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 999px;
          background: rgba(254, 242, 242, 0.9);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #b91c1c;
        }

        .section-kicker::before {
          content: "";
          display: block;
          width: 26px;
          height: 2px;
          background: linear-gradient(90deg, #ef4444, rgba(239, 68, 68, 0.2));
        }

        .section-header h2 {
          margin: 0;
          font-size: clamp(2rem, 3vw, 3.2rem);
          line-height: 1.08;
          letter-spacing: -0.05em;
          font-weight: 900;
          color: #111827;
        }

        .section-header h2 {
          background: linear-gradient(90deg, #b91c1c 0%, #ef4444 28%, #111827 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .category-column {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 0;
        }

        .category-label {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.18);
          color: #b91c1c;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .column-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sticky-visual {
          position: relative;
          height: min(68vh, 620px);
          min-height: 420px;
          margin-top: 30px;
          border-radius: 30px;
          overflow: hidden;
          border: 1px solid rgba(239, 68, 68, 0.18);
          background: rgba(255, 255, 255, 0.6);
          box-shadow: 0 22px 50px rgba(15, 23, 42, 0.08);
        }

        .visual-blob {
          position: absolute;
          inset: 24px 18px auto auto;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(239, 68, 68, 0.34), rgba(239, 68, 68, 0.04) 55%, transparent 70%);
          filter: blur(16px);
          animation: floatBlob 10s ease-in-out infinite alternate;
        }

        .visual-photo {
          position: absolute;
          inset: 0;
          background-position: center;
          background-size: cover;
          transform: scale(1.06);
          filter: saturate(1.15) contrast(1.05);
          animation: photoFloat 12s ease-in-out infinite alternate;
        }

        .product-card {
          position: relative;
          display: block;
          border-radius: 22px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(254, 202, 202, 0.8);
          box-shadow: 0 16px 34px rgba(15, 23, 42, 0.06);
          transform: translateY(26px);
          opacity: 0;
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, border-color 0.35s ease, opacity 0.7s ease;
        }

        .product-card:hover {
          transform: translateY(-8px);
          border-color: rgba(239, 68, 68, 0.25);
          box-shadow: 0 18px 40px rgba(239, 68, 68, 0.12);
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .product-card:hover .product-image-overlay {
          background: linear-gradient(180deg, rgba(17, 24, 39, 0.15), rgba(17, 24, 39, 0.78));
        }

        .product-image {
          position: relative;
          width: 100%;
          aspect-ratio: 5 / 4;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease;
        }

        .product-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(17, 24, 39, 0.15), rgba(17, 24, 39, 0.72));
          transition: background 0.45s ease;
        }

        .product-content {
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 16px;
          z-index: 1;
        }

        .product-content h3 {
          margin: 10px 0 0;
          color: #ffffff;
          font-size: clamp(0.96rem, 1.2vw, 1.22rem);
          line-height: 1.2;
          letter-spacing: -0.04em;
          font-weight: 700;
        }

        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(26px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes floatBlob {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(-12px, 12px, 0) scale(1.08);
          }
        }

        @keyframes photoFloat {
          0% {
            transform: translate3d(0, 0, 0) scale(1.06);
          }
          100% {
            transform: translate3d(-8px, 10px, 0) scale(1.1);
          }
        }

        @media (max-width: 1100px) {
          .products-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 920px) {
          .products-layout {
            grid-template-columns: 1fr;
          }

          .sticky-visual {
            position: relative;
            height: 360px;
            min-height: 360px;
            margin-top: 0;
          }
        }

        @media (max-width: 520px) {
          .products-shell {
            padding: 0 16px;
          }

          .products-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .product-card {
            border-radius: 22px;
          }

          .product-content {
            left: 16px;
            right: 16px;
            bottom: 16px;
          }
        }
      `}</style>
    </section>
  );
}
