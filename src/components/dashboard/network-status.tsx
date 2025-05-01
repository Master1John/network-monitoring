"use client";

import { useEffect, useRef } from "react";

export function NetworkStatus() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Network nodes
    const nodes = [
      {
        id: 1,
        x: canvas.width * 0.5,
        y: canvas.height * 0.2,
        label: "Router",
        status: "online",
      },
      {
        id: 2,
        x: canvas.width * 0.3,
        y: canvas.height * 0.4,
        label: "Switch 1",
        status: "online",
      },
      {
        id: 3,
        x: canvas.width * 0.7,
        y: canvas.height * 0.4,
        label: "Switch 2",
        status: "online",
      },
      {
        id: 4,
        x: canvas.width * 0.2,
        y: canvas.height * 0.6,
        label: "PC-001",
        status: "online",
      },
      {
        id: 5,
        x: canvas.width * 0.4,
        y: canvas.height * 0.6,
        label: "PC-002",
        status: "offline",
      },
      {
        id: 6,
        x: canvas.width * 0.6,
        y: canvas.height * 0.6,
        label: "PC-003",
        status: "online",
      },
      {
        id: 7,
        x: canvas.width * 0.8,
        y: canvas.height * 0.6,
        label: "PC-004",
        status: "warning",
      },
    ];

    // Network connections
    const connections = [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 6 },
      { from: 3, to: 7 },
    ];

    // Draw connections
    connections.forEach((conn) => {
      const fromNode = nodes.find((n) => n.id === conn.from);
      const toNode = nodes.find((n) => n.id === conn.to);

      if (fromNode && toNode && ctx) {
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);

        // Change line style based on status
        if (toNode.status === "offline") {
          ctx.strokeStyle = "rgba(239, 68, 68, 0.5)"; // Red for offline
          ctx.setLineDash([5, 3]);
        } else if (toNode.status === "warning") {
          ctx.strokeStyle = "rgba(245, 158, 11, 0.5)"; // Amber for warning
        } else {
          ctx.strokeStyle = "rgba(16, 185, 129, 0.5)"; // Green for online
          ctx.setLineDash([]);
        }

        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });

    // Draw nodes
    nodes.forEach((node) => {
      if (!ctx) return;

      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);

      // Fill based on status
      if (node.status === "offline") {
        ctx.fillStyle = "rgba(239, 68, 68, 0.2)"; // Red for offline
        ctx.strokeStyle = "rgb(239, 68, 68)";
      } else if (node.status === "warning") {
        ctx.fillStyle = "rgba(245, 158, 11, 0.2)"; // Amber for warning
        ctx.strokeStyle = "rgb(245, 158, 11)";
      } else {
        ctx.fillStyle = "rgba(16, 185, 129, 0.2)"; // Green for online
        ctx.strokeStyle = "rgb(16, 185, 129)";
      }

      ctx.fill();
      ctx.lineWidth = 2;
      ctx.stroke();

      // Node label
      ctx.font = "12px sans-serif";
      ctx.fillStyle = "currentColor";
      ctx.textAlign = "center";
      ctx.fillText(node.label, node.x, node.y + 35);
    });
  }, []);

  return (
    <div className="h-[500px] w-full">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ maxHeight: "500px" }}
      />
    </div>
  );
}
