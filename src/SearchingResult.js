import React, { useState, useRef, useCallback, memo, useEffect } from "react";

// Memoized ProductCard to prevent unnecessary re-renders
const ProductCard = memo(({ rowType, product, index, onAddToCart }) => {
  const buttonRef = useRef(null);

  const handleAddToCart = useCallback(() => {
    onAddToCart();

    // Visual feedback without causing re-renders
    const button = buttonRef.current;
    if (button) {
      const originalStyle = button.style.background;
      const originalHTML = button.innerHTML;

      button.style.background = "rgba(76, 175, 80, 0.9)";
      button.innerHTML = `
        <svg class="small-icon" viewBox="0 0 24 24">
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
        </svg>
      `;

      setTimeout(() => {
        button.style.background = originalStyle;
        button.innerHTML = originalHTML;
      }, 1000);
    }
  }, [onAddToCart]);

  const getImageUrl = (rowType) => {
    const imageMap = {
      sofa: "https://classopenaiimage.s3.us-east-1.amazonaws.com/sofa.png",
      lamp: "https://classopenaiimage.s3.us-east-1.amazonaws.com/lamp.png",
      pillow: "https://classopenaiimage.s3.us-east-1.amazonaws.com/pillow.png",
      plant: "https://classopenaiimage.s3.us-east-1.amazonaws.com/plant.png",
    };
    return imageMap[rowType];
  };

  return (
    <div
      className="product-card fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <img src={getImageUrl(rowType)} alt="" className="product-image" />
      <div className={`probability-badge ${product.badge}`}></div>
      <div className="similarity-percentage">{product.match}</div>
      <div className="action-buttons">
        <button
          ref={buttonRef}
          className="action-btn add-to-cart-btn"
          onClick={handleAddToCart}
        >
          <svg className="small-icon" viewBox="0 0 24 24">
            <path d="M19 7H16V6C16 3.24 13.76 1 11 1S6 3.24 6 6V7H3C2.45 7 2 7.45 2 8S2.45 9 3 9H4V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V9H21C21.55 9 22 8.55 22 8S21.55 7 21 7H19ZM8 6C8 4.34 9.34 3 11 3S14 4.34 14 6V7H8V6ZM18 19H6V9H18V19Z" />
          </svg>
        </button>
        <button className="action-btn details-btn">
          <svg className="small-icon" viewBox="0 0 24 24">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9H21ZM19 21H5V3H13V9H19V21Z" />
          </svg>
        </button>
      </div>
    </div>
  );
});

// Memoized ProductRow that manages its own state
const ProductRow = memo(
  ({ rowType, originalImage, initialProducts, onAddToCart }) => {
    // Each row manages its own state to prevent global re-renders
    const [loadedProducts, setLoadedProducts] = useState([]);
    const [loadCount, setLoadCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [currentProducts, setCurrentProducts] = useState([]);
    const scrollRef = useRef(null);

    // Query descriptions for each row type
    const getQueryDescription = useCallback((rowType) => {
      const descriptions = {
        sofa: "Searching for similar sofas and seating furniture...",
        lamp: "Finding matching lighting and lamp designs...",
        pillow: "Looking for comparable pillows and cushions...",
        plant: "Discovering similar plants and greenery...",
      };
      return descriptions[rowType] || "Searching for similar items...";
    }, []);

    // Different loading times for each row (2-5 seconds) with randomness
    const getLoadingTime = useCallback((rowType) => {
      const baseTimes = {
        sofa: 2000, // 2 seconds base
        lamp: 3000, // 3 seconds base
        pillow: 3500, // 3.5 seconds base
        plant: 4000, // 4 seconds base
      };

      // Add random variation of ±1.5 seconds to make it unpredictable
      const baseTime = baseTimes[rowType] || 3000;
      const randomVariation = (Math.random() - 0.5) * 3000; // -1500ms to +1500ms
      const finalTime = Math.max(1500, baseTime + randomVariation); // Minimum 1.5s

      return Math.min(6000, finalTime); // Maximum 6s
    }, []);

    // Initial loading effect
    useEffect(() => {
      const loadingTime = getLoadingTime(rowType);

      const timer = setTimeout(() => {
        setCurrentProducts(initialProducts);
        setIsInitialLoading(false);
      }, loadingTime);

      return () => clearTimeout(timer);
    }, [rowType, initialProducts, getLoadingTime]);

    // Additional products data for this specific row
    const getAdditionalProducts = useCallback((rowType) => {
      const additionalProducts = {
        sofa: [
          [
            { match: "84%", badge: "medium-match" },
            { match: "81%", badge: "medium-match" },
          ],
          [
            { match: "78%", badge: "medium-match" },
            { match: "75%", badge: "low-match" },
          ],
          [
            { match: "71%", badge: "low-match" },
            { match: "68%", badge: "low-match" },
          ],
          [
            { match: "65%", badge: "low-match" },
            { match: "62%", badge: "low-match" },
          ],
        ],
        lamp: [
          [
            { match: "82%", badge: "medium-match" },
            { match: "79%", badge: "medium-match" },
          ],
          [
            { match: "76%", badge: "low-match" },
            { match: "73%", badge: "low-match" },
          ],
          [
            { match: "70%", badge: "low-match" },
            { match: "67%", badge: "low-match" },
          ],
          [
            { match: "64%", badge: "low-match" },
            { match: "61%", badge: "low-match" },
          ],
        ],
        pillow: [
          [
            { match: "81%", badge: "medium-match" },
            { match: "78%", badge: "medium-match" },
          ],
          [
            { match: "75%", badge: "low-match" },
            { match: "72%", badge: "low-match" },
          ],
          [
            { match: "69%", badge: "low-match" },
            { match: "66%", badge: "low-match" },
          ],
          [
            { match: "63%", badge: "low-match" },
            { match: "60%", badge: "low-match" },
          ],
        ],
        plant: [
          [
            { match: "75%", badge: "low-match" },
            { match: "72%", badge: "low-match" },
          ],
          [
            { match: "69%", badge: "low-match" },
            { match: "66%", badge: "low-match" },
          ],
          [
            { match: "63%", badge: "low-match" },
            { match: "60%", badge: "low-match" },
          ],
          [
            { match: "57%", badge: "low-match" },
            { match: "54%", badge: "low-match" },
          ],
        ],
      };
      return additionalProducts[rowType] || [];
    }, []);

    const handleScroll = useCallback(() => {
      const container = scrollRef.current;
      if (!container || isLoading) return;

      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const containerWidth = container.clientWidth;

      // Trigger when 80% scrolled to the right
      if (scrollLeft + containerWidth >= scrollWidth * 0.8) {
        const additionalProducts = getAdditionalProducts(rowType);
        const maxLoads = additionalProducts.length;

        if (loadCount < maxLoads) {
          loadMoreProducts(additionalProducts[loadCount]);
        }
      }
    }, [isLoading, loadCount, rowType, getAdditionalProducts]);

    const loadMoreProducts = useCallback((products) => {
      setIsLoading(true);

      // Show loading state for 1 second
      setTimeout(() => {
        setLoadedProducts((prev) => [...prev, ...products]);
        setLoadCount((prev) => prev + 1);
        setIsLoading(false);
      }, 1000);
    }, []);

    const additionalProducts = getAdditionalProducts(rowType);
    const hasMoreToLoad = loadCount < additionalProducts.length;

    return (
      <div className="product-row">
        <div className="row-content">
          <div className="original-object-card">
            <img src={originalImage} alt="" className="original-image" />
            <div className="original-indicator"></div>
          </div>

          <div
            className="horizontal-scroll"
            ref={scrollRef}
            onScroll={handleScroll}
          >
            {isInitialLoading ? (
              /* Initial Loading State */
              <div className="initial-loading-container">
                <div className="loading-spinner"></div>
                <div className="loading-query-text">
                  {getQueryDescription(rowType)}
                </div>
              </div>
            ) : (
              <>
                {/* Initial Products */}
                {currentProducts.map((product, index) => (
                  <ProductCard
                    key={`initial-${index}`}
                    rowType={rowType}
                    product={product}
                    index={index}
                    onAddToCart={onAddToCart}
                  />
                ))}

                {/* Dynamically Loaded Products */}
                {loadedProducts.map((product, index) => (
                  <ProductCard
                    key={`loaded-${index}`}
                    rowType={rowType}
                    product={product}
                    index={index + currentProducts.length}
                    onAddToCart={onAddToCart}
                  />
                ))}

                {/* Loading Card for additional products */}
                {hasMoreToLoad && (
                  <div className="product-card loading-card">
                    <div className="loading-spinner"></div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
);

const VisualSearchResults = ({ handleOnBack }) => {
  const [cartCount, setCartCount] = useState(0);
  const cartButtonRef = useRef(null);
  const checkoutButtonRef = useRef(null);

  // Memoized cart handler to prevent unnecessary re-renders
  const handleAddToCart = useCallback(() => {
    setCartCount((prev) => prev + 1);

    // Add pulse animation to cart without re-render
    const cartButton = cartButtonRef.current;
    if (cartButton) {
      cartButton.style.animation = "cartPulse 0.4s ease-out";
      setTimeout(() => {
        cartButton.style.animation = "";
      }, 400);
    }

    // Add pulse to checkout button
    const checkoutButton = checkoutButtonRef.current;
    if (checkoutButton && cartCount === 0) {
      // Only add on first item
      checkoutButton.style.animation = "pulse 2s infinite";
    }
  }, [cartCount]);

  const handleCheckout = useCallback(() => {
    if (cartCount > 0) {
      alert(`Proceeding to checkout with ${cartCount} items!`);
    } else {
      alert("Your cart is empty. Add some items first!");
    }
  }, [cartCount]);

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center p-5">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .iphone-frame {
          width: 393px;
          height: 852px;
          background: #1d1d1f;
          border-radius: 47px;
          padding: 8px;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .iphone-screen {
          width: 100%;
          height: 100%;
          background: #000;
          border-radius: 39px;
          overflow: hidden;
          position: relative;
        }

        .dynamic-island {
          position: absolute;
          top: 11px;
          left: 50%;
          transform: translateX(-50%);
          width: 126px;
          height: 37px;
          background: #000;
          border-radius: 19px;
          z-index: 10;
        }

        .results-screen {
          height: 100%;
          background: #000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .header {
          padding: 59px 16px 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(20px);
        }

        .back-button {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .cart-button {
          position: relative;
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .cart-count {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #e60023;
          color: white;
          border-radius: 10px;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          min-width: 20px;
        }

        .checkout-button {
          background: #e60023;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          border: none;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 12px rgba(230, 0, 35, 0.3);
        }

        .content-area {
          flex: 1;
          padding: 8px 0 100px 0;
          overflow-y: auto;
        }

        .product-row {
          margin-bottom: 16px;
          position: relative;
        }

        .row-content {
          display: flex;
          gap: 12px;
          padding: 0 16px;
        }

        .original-object-card {
          flex-shrink: 0;
          width: 140px;
          height: 140px;
          border-radius: 12px;
          overflow: hidden;
          background: #222;
          position: relative;
          border: 2px solid #e60023;
        }

        .original-indicator {
          position: absolute;
          top: 8px;
          left: 8px;
          width: 12px;
          height: 12px;
          background: #e60023;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .original-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .horizontal-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scroll-behavior: smooth;
          flex: 1;
          padding-right: 16px;
          padding-bottom: 8px;
        }

        .horizontal-scroll::-webkit-scrollbar {
          height: 6px;
        }

        .horizontal-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .horizontal-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.4);
          border-radius: 3px;
        }

        .horizontal-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.6);
        }

        .product-card {
          position: relative;
          flex-shrink: 0;
          width: 140px;
          height: 140px;
          border-radius: 12px;
          overflow: hidden;
          background: #111;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .probability-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .similarity-percentage {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 10px;
          font-weight: 600;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .high-match {
          background: #4caf50;
        }
        .medium-match {
          background: #ff9800;
        }
        .low-match {
          background: #757575;
        }

        .action-buttons {
          position: absolute;
          bottom: 8px;
          left: 8px;
          right: 8px;
          display: flex;
          gap: 6px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-card:hover .action-buttons {
          opacity: 1;
        }

        .action-btn {
          flex: 1;
          height: 28px;
          border: none;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        }

        .add-to-cart-btn {
          background: rgba(230, 0, 35, 0.9);
          color: white;
        }

        .add-to-cart-btn:hover {
          background: rgba(230, 0, 35, 1);
          transform: scale(1.05);
        }

        .details-btn {
          background: rgba(255, 255, 255, 0.9);
          color: #333;
        }

        .details-btn:hover {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.05);
        }

        .loading-card {
          background: #222;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .initial-loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 300px;
          height: 140px;
          background: rgba(34, 34, 34, 0.8);
          border-radius: 12px;
          padding: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .loading-query-text {
          color: rgba(255, 255, 255, 0.8);
          font-size: 12px;
          text-align: center;
          margin-top: 12px;
          font-weight: 500;
          line-height: 1.4;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .home-indicator {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 134px;
          height: 5px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 3px;
        }

        .icon {
          width: 16px;
          height: 16px;
          fill: currentColor;
        }

        .small-icon {
          width: 12px;
          height: 12px;
          fill: currentColor;
        }

        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes cartPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 4px 12px rgba(230, 0, 35, 0.3);
          }
          50% {
            box-shadow: 0 4px 12px rgba(230, 0, 35, 0.6);
          }
          100% {
            box-shadow: 0 4px 12px rgba(230, 0, 35, 0.3);
          }
        }
      `}</style>

      <div className="iphone-frame">
        <div className="iphone-screen">
          <div className="dynamic-island"></div>

          <div className="results-screen">
            {/* Header */}
            <div className="header">
              <div className="back-button" onClick={handleOnBack}>
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
              </div>

              <div className="header-actions">
                <div className="cart-button" ref={cartButtonRef}>
                  <svg className="icon" viewBox="0 0 24 24">
                    <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
                  </svg>
                  <div className="cart-count">{cartCount}</div>
                </div>

                <button
                  className="checkout-button"
                  ref={checkoutButtonRef}
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="content-area">
              <ProductRow
                rowType="sofa"
                originalImage="https://classopenaiimage.s3.us-east-1.amazonaws.com/sofa.png"
                initialProducts={[
                  { match: "94%", badge: "high-match" },
                  { match: "89%", badge: "high-match" },
                ]}
                onAddToCart={handleAddToCart}
              />

              <ProductRow
                rowType="lamp"
                originalImage="https://classopenaiimage.s3.us-east-1.amazonaws.com/lamp.png"
                initialProducts={[
                  { match: "91%", badge: "high-match" },
                  { match: "87%", badge: "medium-match" },
                ]}
                onAddToCart={handleAddToCart}
              />

              <ProductRow
                rowType="pillow"
                originalImage="https://classopenaiimage.s3.us-east-1.amazonaws.com/pillow.png"
                initialProducts={[
                  { match: "88%", badge: "medium-match" },
                  { match: "84%", badge: "medium-match" },
                ]}
                onAddToCart={handleAddToCart}
              />

              <ProductRow
                rowType="plant"
                originalImage="https://classopenaiimage.s3.us-east-1.amazonaws.com/plant.png"
                initialProducts={[
                  { match: "83%", badge: "medium-match" },
                  { match: "79%", badge: "low-match" },
                ]}
                onAddToCart={handleAddToCart}
              />
            </div>

            <div className="home-indicator"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualSearchResults;
