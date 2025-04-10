
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

// This is a standalone component for embedding in external sites like Webflow
const FleetVisualizationEmbed = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  // This data would typically be fetched from an API in a real-world application
  const fleetData = [
    { model: "Hyundai I30 Combi", count: 70, manufacturer: "Hyundai" },
    { model: "Skoda Octavia", count: 20, manufacturer: "Skoda" },
    { model: "Hyundai I40 Combi", count: 19, manufacturer: "Hyundai" },
    { model: "Skoda Superb", count: 8, manufacturer: "Skoda" },
    { model: "Skoda Octavia III Combi", count: 7, manufacturer: "Skoda" },
    { model: "Skoda Fabia", count: 5, manufacturer: "Skoda" },
    { model: "Skoda Rapid", count: 4, manufacturer: "Skoda" },
    { model: "Skoda Octavia IV Combi", count: 4, manufacturer: "Skoda" },
    { model: "Skoda Scala", count: 4, manufacturer: "Skoda" },
    { model: "VW Golf", count: 1, manufacturer: "VW" },
    { model: "Skoda Superb III Combi", count: 1, manufacturer: "Skoda" },
    { model: "Audi A6", count: 1, manufacturer: "Audi" },
    { model: "VW Jetta", count: 1, manufacturer: "VW" },
    { model: "Audi A6 Allroad", count: 1, manufacturer: "Audi" },
    { model: "VW Passat", count: 1, manufacturer: "VW" },
    { model: "VW Touareg", count: 1, manufacturer: "VW" }
  ];
  
  // Sort data by count in descending order
  const sortedData = [...fleetData].sort((a, b) => b.count - a.count);
  const maxCount = Math.max(...sortedData.map(item => item.count));
  
  // Map manufacturers to colors
  const getManufacturerColor = (manufacturer: string): string => {
    switch(manufacturer.toLowerCase()) {
      case "hyundai": return "#60a5fa";
      case "skoda": return "#4ade80";
      case "vw": return "#93c5fd";
      case "audi": return "#f87171";
      default: return "#a78bfa";
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      // Animate the bars when component mounts
      const bars = chartRef.current.querySelectorAll(".vehicle-bar");
      
      gsap.fromTo(bars, 
        { width: 0, opacity: 0 },
        { 
          width: "100%", 
          opacity: 1, 
          duration: 1, 
          stagger: 0.08,
          ease: "power3.out"
        }
      );
      
      // Animate the count numbers
      const counters = chartRef.current.querySelectorAll(".count-value");
      gsap.fromTo(
        counters,
        { textContent: "0" },
        {
          textContent: (i) => sortedData[i].count.toString(),
          duration: 1.5,
          stagger: 0.08,
          ease: "power2.out",
          snap: { textContent: 1 },
          delay: 0.3
        }
      );
    }
  }, []);

  return (
    <div style={{ 
      fontFamily: "system-ui, sans-serif",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#1e293b",
      borderRadius: "12px",
      color: "white"
    }}>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Fleet Composition
        <span style={{ fontSize: "14px", color: "#94a3b8", marginLeft: "10px" }}>
          ({sortedData.reduce((acc, item) => acc + item.count, 0)} vehicles)
        </span>
      </h2>
      
      <div ref={chartRef} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {sortedData.map((vehicle, index) => {
          const percentWidth = Math.max((vehicle.count / maxCount) * 100, 5);
          
          return (
            <div key={index} style={{ marginBottom: "8px" }}>
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                fontSize: "14px", 
                color: "#cbd5e1", 
                marginBottom: "4px" 
              }}>
                <span style={{ marginRight: "8px" }}>🚗</span>
                <span>{vehicle.model}</span>
              </div>
              <div style={{ 
                position: "relative",
                height: "32px",
                backgroundColor: "#334155",
                borderRadius: "6px",
                overflow: "hidden"
              }}>
                <div 
                  className="vehicle-bar"
                  style={{ 
                    height: "100%",
                    width: `${percentWidth}%`,
                    background: `linear-gradient(to right, ${getManufacturerColor(vehicle.manufacturer)}, ${getManufacturerColor(vehicle.manufacturer)}cc)`,
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "12px",
                    paddingRight: "12px"
                  }}
                >
                  <span 
                    className="count-value"
                    style={{ 
                      marginLeft: "auto", 
                      fontWeight: "bold",
                      color: "white"
                    }}
                  >
                    {vehicle.count}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: "8px",
        marginTop: "20px",
        justifyContent: "center"
      }}>
        {Array.from(new Set(fleetData.map(item => item.manufacturer))).map((manufacturer, index) => (
          <div
            key={index}
            style={{ 
              display: "flex",
              alignItems: "center",
              padding: "4px 12px",
              backgroundColor: "#334155",
              borderRadius: "16px",
              fontSize: "14px"
            }}
          >
            <span 
              style={{ 
                display: "inline-block",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: getManufacturerColor(manufacturer.toString()),
                marginRight: "6px"
              }}
            />
            {manufacturer}
          </div>
        ))}
      </div>
      
      <div style={{ fontSize: "12px", color: "#64748b", textAlign: "center", marginTop: "20px" }}>
        Interactive Fleet Visualization
      </div>
    </div>
  );
};

export default FleetVisualizationEmbed;
