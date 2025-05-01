"use client";

import { useEffect, useRef } from "react";

export function NetworkTopology() {
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
        type: "router",
      },
      {
        id: 2,
        x: canvas.width * 0.3,
        y: canvas.height * 0.4,
        label: "Switch 1",
        status: "online",
        type: "switch",
      },
      {
        id: 3,
        x: canvas.width * 0.7,
        y: canvas.height * 0.4,
        label: "Switch 2",
        status: "online",
        type: "switch",
      },
      {
        id: 4,
        x: canvas.width * 0.2,
        y: canvas.height * 0.6,
        label: "PC-001",
        status: "online",
        type: "workstation",
      },
      {
        id: 5,
        x: canvas.width * 0.4,
        y: canvas.height * 0.6,
        label: "PC-002",
        status: "offline",
        type: "workstation",
      },
      {
        id: 6,
        x: canvas.width * 0.6,
        y: canvas.height * 0.6,
        label: "PC-003",
        status: "online",
        type: "workstation",
      },
      {
        id: 7,
        x: canvas.width * 0.8,
        y: canvas.height * 0.6,
        label: "PC-004",
        status: "warning",
        type: "workstation",
      },
      {
        id: 8,
        x: canvas.width * 0.3,
        y: canvas.height * 0.8,
        label: "Printer",
        status: "online",
        type: "printer",
      },
      {
        id: 9,
        x: canvas.width * 0.7,
        y: canvas.height * 0.8,
        label: "Server",
        status: "online",
        type: "server",
      },
    ];

    // Network connections
    const connections = [
      { from: 1, to: 2, bandwidth: 1000 },
      { from: 1, to: 3, bandwidth: 1000 },
      { from: 2, to: 4, bandwidth: 100 },
      { from: 2, to: 5, bandwidth: 100 },
      { from: 2, to: 8, bandwidth: 100 },
      { from: 3, to: 6, bandwidth: 100 },
      { from: 3, to: 7, bandwidth: 100 },
      { from: 3, to: 9, bandwidth: 1000 },
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

        // Adjust line width based on bandwidth
        if (conn.bandwidth >= 1000) {
          ctx.lineWidth = 3;
        } else {
          ctx.lineWidth = 2;
        }

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

      // Node type icon (simplified)
      ctx.font = "14px sans-serif";
      ctx.fillStyle = "currentColor";
      ctx.textAlign = "center";

      let icon = "?";
      switch (node.type) {
        case "router":
          icon = "📡";
          break;
        case "switch":
          icon = "🔌";
          break;
        case "workstation":
          icon = "💻";
          break;
        case "printer":
          icon = "🖨️";
          break;
        case "server":
          icon = "🖥️";
          break;
      }

      ctx.fillText(icon, node.x, node.y + 5);
    });
  }, []);

  return (
    <div className="h-[600px] w-full">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ maxHeight: "600px" }}
      />
    </div>
  );
}
