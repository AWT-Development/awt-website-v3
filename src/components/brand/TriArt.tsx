import type { ComponentProps } from "react";

const compositions: { polygons: string[]; line?: string }[] = [
  { polygons: ["100,20 180,170 20,170", "100,80 140,150 60,150"] },
  {
    polygons: [
      "100,15 185,175 15,175",
      "100,55 150,145 50,145",
      "100,95 118,125 82,125",
    ],
  },
  {
    polygons: [
      "10,180 70,180 10,120",
      "70,180 130,180 70,100",
      "130,180 190,180 130,80",
    ],
  },
  {
    polygons: [
      "100,20 140,90 60,90",
      "60,90 100,160 20,160",
      "140,90 180,160 100,160",
      "60,90 140,90 100,160",
    ],
  },
  { polygons: ["100,20 175,150 25,150", "100,180 175,50 25,50"] },
  {
    polygons: ["50,40 95,125 5,125", "150,75 195,160 105,160"],
    line: "50,97 150,132",
  },
];

type TriArtProps = ComponentProps<"svg"> & { variant: number };

export function TriArt({ variant, className = "", ...props }: TriArtProps) {
  const { polygons, line } = compositions[variant % compositions.length];

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      strokeWidth={2.5}
      strokeLinejoin="miter"
      aria-hidden
      className={className}
      {...props}
    >
      {polygons.map((points, index) => (
        <polygon
          key={points}
          points={points}
          className={
            index % 2 === 0
              ? "fill-violet-700/25 stroke-violet-400"
              : "fill-orange-500/10 stroke-orange-500"
          }
        />
      ))}
      {line && (
        <polyline
          points={line}
          strokeDasharray="4 6"
          className="stroke-muted"
        />
      )}
    </svg>
  );
}
