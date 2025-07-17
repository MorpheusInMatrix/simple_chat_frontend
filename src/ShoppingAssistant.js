import React, { useState, useEffect } from "react";

const ShoppingAssistant = (props) => {
  const { setIsResultPage, currentScreen, setCurrentScreen } = props;
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedObjects, setSelectedObjects] = useState(new Set());
  const [searchProgress, setSearchProgress] = useState(0);

  // Mock detected objects from uploaded workspace image
  const detectedObjects = [
    {
      id: 1,
      name: "Sofa",
      confidence: 0.96,
      boundingBox: { x: 350, y: 220, width: 120, height: 160 },
      extractedImage:
        "https://classopenaiimage.s3.us-east-1.amazonaws.com/sofa.png",
    },
    {
      id: 2,
      name: "Lamp",
      confidence: 0.91,
      boundingBox: { x: 120, y: 10, width: 120, height: 260 },
      extractedImage:
        "https://classopenaiimage.s3.us-east-1.amazonaws.com/lamp.png",
    },
    {
      id: 3,
      name: "Pillow",
      confidence: 0.87,
      boundingBox: { x: 300, y: 180, width: 100, height: 80 },
      extractedImage:
        "https://classopenaiimage.s3.us-east-1.amazonaws.com/pillow.png",
    },
    {
      id: 4,
      name: "Plant",
      confidence: 0.83,
      boundingBox: { x: 50, y: 130, width: 60, height: 90 },
      extractedImage:
        "https://classopenaiimage.s3.us-east-1.amazonaws.com/plant.png",
    },
  ];

  const startSearch = () => {
    setCurrentScreen("searching");
    setUploadedImage(
      "https://classopenaiimage.s3.us-east-1.amazonaws.com/Demo+image.png"
    );
    setSearchProgress(0);

    // Simulate image upload and processing
    const interval = setInterval(() => {
      setSearchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setCurrentScreen("objectDetection");
          return 100;
        }
        return prev + 15;
      });
    }, 1200);
  };

  const toggleObjectSelection = (objectId) => {
    const newSelection = new Set(selectedObjects);
    if (newSelection.has(objectId)) {
      newSelection.delete(objectId);
    } else {
      newSelection.add(objectId);
    }
    setSelectedObjects(newSelection);
  };

  const searchSelectedObjects = () => {
    if (selectedObjects.size > 0) {
      setIsResultPage(true);
    }
  };

  const goHome = () => {
    setCurrentScreen("home");
    setSelectedObjects(new Set());
    setUploadedImage(null);
    setSearchProgress(0);
  };

  // Icons
  const CameraIcon = () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C13.1 2 14 2.9 14 4H18C19.1 4 20 4.9 20 6V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V6C4 4.9 4.9 4 6 4H10C10 2.9 10.9 2 12 2M12 7C9.24 7 7 9.24 7 12S9.24 17 12 17 17 14.76 17 12 14.76 7 12 7M12 9C13.66 9 15 10.34 15 12S13.66 15 12 15 9 13.66 9 12 10.34 9 12 9Z" />
    </svg>
  );

  const SearchIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
    </svg>
  );

  const LoadingSpinner = () => (
    <div
      style={{
        width: "20px",
        height: "20px",
        border: "2px solid currentColor",
        borderTop: "2px solid transparent",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
  );

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background: "#f0f0f0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        
        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        .pulse {
          animation: pulse 2s infinite;
        }
        
        .slide-up {
          animation: slideUp 0.4s ease-out;
        }
        
        .material-elevation-3 {
          box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        }
        
        .material-elevation-8 {
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        
        .ripple-effect {
          position: relative;
          overflow: hidden;
          transform: translate3d(0, 0, 0);
        }
      `}</style>

      {/* iPhone 14 Pro Frame */}
      <div
        style={{
          width: "393px",
          height: "852px",
          background: "#1d1d1f",
          borderRadius: "47px",
          padding: "8px",
          position: "relative",
        }}
        className="material-elevation-8"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#000",
            borderRadius: "39px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Dynamic Island */}
          <div
            style={{
              position: "absolute",
              top: "11px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "126px",
              height: "37px",
              background: "#000",
              borderRadius: "19px",
              zIndex: 10,
            }}
          />

          {/* Home Screen */}
          {currentScreen === "home" && (
            <div
              style={{
                height: "100%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Status Bar */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "59px 24px 20px 24px",
                  color: "white",
                  fontSize: "17px",
                  fontWeight: "600",
                }}
              >
                {/* <div style={{ marginLeft: "20px" }}>9:41</div> */}
                {/* <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    marginRight: "20px",
                  }}
                >
                  <span>📶</span>
                  <span>📡</span>
                  <span>🔋</span>
                </div> */}
              </div>

              {/* App Header */}
              {/* <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "0",
                  right: "0",
                  padding: "0 32px",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontSize: "28px",
                    fontWeight: "700",
                    textAlign: "center",
                    opacity: "0.95",
                  }}
                >
                  ShopLens
                </div>
              </div> */}

              {/* Main Content */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 32px",
                  textAlign: "center",
                  position: "relative",
                  minHeight: "calc(100% - 120px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "24px",
                    marginTop: "-40px",
                  }}
                  className="fade-in"
                >
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      background: "rgba(255,255,255,0.15)",
                      borderRadius: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                    }}
                    className="material-elevation-3"
                  >
                    <CameraIcon />
                  </div>

                  <div>
                    <h1
                      style={{
                        color: "white",
                        fontSize: "32px",
                        fontWeight: "700",
                        lineHeight: "1.2",
                        marginBottom: "8px",
                      }}
                    >
                      Find Everything
                    </h1>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "18px",
                        fontWeight: "400",
                        lineHeight: "1.4",
                        maxWidth: "280px",
                      }}
                    >
                      Snap a photo and shop for multiple items at once
                    </p>
                  </div>

                  <button
                    onClick={startSearch}
                    style={{
                      width: "280px",
                      height: "56px",
                      background: "white",
                      border: "none",
                      borderRadius: "28px",
                      color: "#333",
                      fontSize: "18px",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "20px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    className="material-elevation-3 ripple-effect"
                    onMouseOver={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)";
                    }}
                  >
                    Start Shopping
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          startSearch(file); // Your function with the selected image
                        }
                      }}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        cursor: "pointer",
                      }}
                    />
                  </button>
                </div>
              </div>

              {/* Home Indicator */}
              <div
                style={{
                  height: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: "34px",
                }}
              >
                <div
                  style={{
                    width: "134px",
                    height: "5px",
                    background: "rgba(255,255,255,0.3)",
                    borderRadius: "3px",
                  }}
                />
              </div>
            </div>
          )}

          {/* Searching Screen */}
          {currentScreen === "searching" && (
            <div
              style={{
                height: "100%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Status Bar */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "59px 24px 20px 24px",
                  color: "white",
                  fontSize: "17px",
                  fontWeight: "600",
                }}
              >
                {/* <div style={{ marginLeft: "20px" }}>9:41</div> */}
                {/* <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    marginRight: "20px",
                  }}
                >
                  <span>📶</span>
                  <span>📡</span>
                  <span>🔋</span>
                </div> */}
              </div>

              {/* App Header */}
              {/* <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "0",
                  right: "0",
                  padding: "0 32px",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontSize: "28px",
                    fontWeight: "700",
                    textAlign: "center",
                    opacity: "0.95",
                  }}
                >
                  ShopLens
                </div>
              </div> */}

              {/* Main Content */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 32px",
                  textAlign: "center",
                  position: "relative",
                  minHeight: "calc(100% - 120px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "32px",
                    marginTop: "-40px",
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      background: "rgba(255,255,255,0.15)",
                      borderRadius: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                    }}
                    className="pulse"
                  >
                    <SearchIcon />
                  </div>

                  <div>
                    <h1
                      style={{
                        color: "white",
                        fontSize: "24px",
                        fontWeight: "700",
                        lineHeight: "1.2",
                        marginBottom: "8px",
                      }}
                    >
                      Detecting Objects...
                    </h1>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "18px",
                        fontWeight: "400",
                        lineHeight: "1.4",
                        maxWidth: "280px",
                      }}
                    >
                      AI is identifying products in your photo
                    </p>
                  </div>

                  <button
                    style={{
                      width: "280px",
                      height: "56px",
                      background: "rgba(255,255,255,0.2)",
                      border: "none",
                      borderRadius: "28px",
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                      marginTop: "20px",
                      pointerEvents: "none",
                    }}
                  >
                    <LoadingSpinner />
                    AI agent is analyzing ...
                  </button>
                </div>
              </div>

              {/* Home Indicator */}
              <div
                style={{
                  height: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: "34px",
                }}
              >
                <div
                  style={{
                    width: "134px",
                    height: "5px",
                    background: "rgba(255,255,255,0.3)",
                    borderRadius: "3px",
                  }}
                />
              </div>
            </div>
          )}

          {/* Object Detection Screen - Pinterest Style */}
          {currentScreen === "objectDetection" && (
            <div
              style={{
                height: "100%",
                background: "#000",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Full Screen Image */}
              <img
                src="https://classopenaiimage.s3.us-east-1.amazonaws.com/Demo+image.png"
                alt="Workspace"
                style={{
                  //   position: "absolute",
                  //   top: "0",
                  //   left: "0",
                  //   width: "100%",
                  //   height: "100%",
                  objectFit: "fill",
                  objectPosition: "center",
                }}
              />

              {/* Pinterest-style minimal header */}
              <div
                style={{
                  position: "absolute",
                  top: "59px",
                  left: "16px",
                  right: "16px",
                  zIndex: 20,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Back button */}
                <div
                  onClick={goHome}
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "rgba(0,0,0,0.6)",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    cursor: "pointer",
                    backdropFilter: "blur(10px)",
                    fontSize: "20px",
                  }}
                >
                  ←
                </div>

                {/* Shop button - Pinterest style */}
                {selectedObjects.size > 0 && (
                  <div
                    onClick={searchSelectedObjects}
                    style={{
                      background: "#E60023",
                      color: "white",
                      padding: "12px 20px",
                      borderRadius: "24px",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: "pointer",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    }}
                    className="fade-in"
                  >
                    Shop {selectedObjects.size}
                  </div>
                )}
              </div>

              {/* Minimal detection dots directly on image */}
              {detectedObjects.map((object, index) => {
                const isSelected = selectedObjects.has(object.id);
                return (
                  <div
                    key={object.id}
                    onClick={() => toggleObjectSelection(object.id)}
                    style={{
                      position: "absolute",
                      left: `${(object.boundingBox.x / 400) * 100}%`,
                      top: `${((object.boundingBox.y + 100) / 600) * 100}%`,
                      width: "24px",
                      height: "24px",
                      background: isSelected
                        ? "#E60023"
                        : "rgba(255,255,255,0.9)",
                      border: isSelected
                        ? "3px solid white"
                        : "2px solid rgba(0,0,0,0.2)",
                      borderRadius: "50%",
                      cursor: "pointer",
                      zIndex: 15,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isSelected ? "white" : "#333",
                      fontSize: "12px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      transform: isSelected ? "scale(1.2)" : "scale(1)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                      animationDelay: `${index * 0.2}s`,
                    }}
                    className="fade-in"
                    onMouseOver={(e) => {
                      if (!isSelected) {
                        e.target.style.transform = "scale(1.1)";
                        e.target.style.background = "white";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isSelected) {
                        e.target.style.transform = "scale(1)";
                        e.target.style.background = "rgba(255,255,255,0.9)";
                      }
                    }}
                  >
                    {isSelected ? "✓" : "+"}
                  </div>
                );
              })}

              {/* Subtle product preview - Pinterest style */}
              {selectedObjects.size > 0 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "100px",
                    left: "16px",
                    right: "16px",
                    zIndex: 20,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      overflowX: "auto",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    {Array.from(selectedObjects).map((objectId) => {
                      const object = detectedObjects.find(
                        (obj) => obj.id === objectId
                      );
                      return (
                        <div
                          key={objectId}
                          style={{
                            flexShrink: 0,
                            width: "60px",
                            height: "60px",
                            borderRadius: "12px",
                            overflow: "hidden",
                            background: "rgba(255,255,255,0.95)",
                            padding: "4px",
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                          }}
                          className="fade-in"
                        >
                          <img
                            src={object.extractedImage}
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Home Indicator */}
              <div
                style={{
                  position: "absolute",
                  bottom: "8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "134px",
                  height: "5px",
                  background: "rgba(255,255,255,0.6)",
                  borderRadius: "3px",
                  zIndex: 40,
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Demo Controls */}
      {/* <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          onClick={goHome}
          style={{
            padding: "6px 12px",
            background: "#E60023",
            color: "white",
            border: "none",
            borderRadius: "16px",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          Home
        </button>
        <button
          onClick={() => setCurrentScreen("objectDetection")}
          style={{
            padding: "6px 12px",
            background: "#E60023",
            color: "white",
            border: "none",
            borderRadius: "16px",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          Detection
        </button>
      </div> */}
    </div>
  );
};

export default ShoppingAssistant;
