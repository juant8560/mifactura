"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Constants for regex
const HEX_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
const HEX_VALID_REGEX = /^#[0-9A-Fa-f]{6}$/;

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  onClose: () => void;
}

// Convert hex to HSL
function hexToHSL(hex: string): { h: number; s: number; l: number } | null {
  const result = HEX_REGEX.exec(hex);
  if (!result) {
    return null;
  }

  const r = Number.parseInt(result[1], 16) / 255;
  const g = Number.parseInt(result[2], 16) / 255;
  const b = Number.parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
      default:
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

// Convert HSL to hex
function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const a = sNorm * Math.min(lNorm, 1 - lNorm);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const colorVal = lNorm - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * colorVal)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function ColorPicker({ color, onChange, onClose }: ColorPickerProps) {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [hexInput, setHexInput] = useState(color);

  const gradientRef = useRef<HTMLButtonElement>(null);
  const hueRef = useRef<HTMLButtonElement>(null);
  const isDraggingGradient = useRef(false);
  const isDraggingHue = useRef(false);

  // Parse initial color
  useEffect(() => {
    const parsed = hexToHSL(color);
    if (parsed) {
      setHue(parsed.h);
      setSaturation(parsed.s);
      setLightness(parsed.l);
    }
  }, [color]);

  const updateFromGradient = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      if (!gradientRef.current) {
        return;
      }
      const rect = gradientRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

      const newS = x * 100;
      const newL = (1 - y) * 50 + (1 - x) * (1 - y) * 50;

      const clampedL = Math.max(0, Math.min(100, newL));
      setSaturation(newS);
      setLightness(clampedL);

      const newHex = hslToHex(hue, newS, clampedL);
      setHexInput(newHex);
      onChange(newHex);
    },
    [hue, onChange]
  );

  const updateFromHue = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      if (!hueRef.current) {
        return;
      }
      const rect = hueRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const newHue = x * 360;

      setHue(newHue);
      const newHex = hslToHex(newHue, saturation, lightness);
      setHexInput(newHex);
      onChange(newHex);
    },
    [saturation, lightness, onChange]
  );

  // Mouse event handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingGradient.current) {
        updateFromGradient(e);
      }
      if (isDraggingHue.current) {
        updateFromHue(e);
      }
    };

    const handleMouseUp = () => {
      isDraggingGradient.current = false;
      isDraggingHue.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [updateFromGradient, updateFromHue]);

  const handleHexChange = (value: string) => {
    setHexInput(value);
    if (HEX_VALID_REGEX.test(value)) {
      const parsed = hexToHSL(value);
      if (parsed) {
        setHue(parsed.h);
        setSaturation(parsed.s);
        setLightness(parsed.l);
        onChange(value);
      }
    }
  };

  // Calculate picker position
  const pickerX = (saturation / 100) * 100;
  const pickerY = (1 - lightness / 100) * 100;

  return (
    <div className="absolute bottom-full left-0 z-50 mb-2 w-64 rounded-xl border border-border bg-card p-4 shadow-2xl">
      {/* Gradient area */}
      <button
        className="relative mb-3 h-36 w-full cursor-crosshair overflow-hidden rounded-lg"
        onMouseDown={(e) => {
          isDraggingGradient.current = true;
          updateFromGradient(e);
        }}
        ref={gradientRef}
        style={{
          background: `
            linear-gradient(to bottom, transparent 0%, black 100%),
            linear-gradient(to right, white 0%, hsl(${hue}, 100%, 50%) 100%)
          `,
        }}
        type="button"
      >
        {/* Picker circle */}
        <div
          className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
          style={{
            left: `${pickerX}%`,
            top: `${pickerY}%`,
            backgroundColor: hslToHex(hue, saturation, lightness),
          }}
        />
      </button>

      {/* Hue slider */}
      <button
        aria-label="Seleccionar tono"
        className="relative mb-4 h-4 w-full cursor-pointer rounded-full"
        onMouseDown={(e) => {
          isDraggingHue.current = true;
          updateFromHue(e);
        }}
        ref={hueRef}
        style={{
          background: `linear-gradient(to right, 
            hsl(0, 100%, 50%), 
            hsl(60, 100%, 50%), 
            hsl(120, 100%, 50%), 
            hsl(180, 100%, 50%), 
            hsl(240, 100%, 50%), 
            hsl(300, 100%, 50%), 
            hsl(360, 100%, 50%)
          )`,
        }}
        type="button"
      >
        <div
          className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-0 rounded-full border-2 border-gray-300 bg-white shadow-md"
          style={{
            left: `${(hue / 360) * 100}%`,
            top: "0",
          }}
        />
      </button>

      {/* Hex input */}
      <div className="flex items-center gap-2">
        <div
          className="h-8 w-8 flex-shrink-0 rounded-lg border border-border"
          style={{ backgroundColor: hexInput }}
        />
        <input
          className="flex-1 rounded-lg border border-border bg-muted px-3 py-1.5 font-mono text-foreground text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          onChange={(e) => handleHexChange(e.target.value)}
          placeholder="#000000"
          type="text"
          value={hexInput}
        />
      </div>

      {/* Quick colors */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {[
          "#6366f1",
          "#8b5cf6",
          "#ec4899",
          "#f43f5e",
          "#f97316",
          "#eab308",
          "#22c55e",
          "#14b8a6",
          "#3b82f6",
          "#0ea5e9",
        ].map((c) => (
          <button
            className="h-5 w-5 rounded border border-border transition-transform hover:scale-110"
            key={c}
            onClick={() => {
              setHexInput(c);
              handleHexChange(c);
            }}
            style={{ backgroundColor: c }}
            type="button"
          />
        ))}
      </div>

      {/* Close button */}
      <button
        className="mt-3 w-full rounded-lg bg-primary py-2 font-medium text-sm text-white transition-opacity hover:opacity-90"
        onClick={onClose}
        type="button"
      >
        Aplicar
      </button>
    </div>
  );
}
