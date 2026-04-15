import { Color } from '../../types/index';

interface ColorSwatchesProps {
  colors: Color[];
  maxVisible?: number;
}

export function ColorSwatches({ colors, maxVisible = 4 }: ColorSwatchesProps) {
  const visibleColors = colors.slice(0, maxVisible);
  const remainingCount = colors.length - maxVisible;

  return (
    <div className="flex items-center gap-2">
      {visibleColors.map((color) => (
        <div
          key={color.id}
          className="group relative"
          
        >
          <div
            className="w-6 h-6 rounded-full border-2 border-border hover:scale-110 transition-transform cursor-pointer shadow-sm hover:shadow-md"
            style={{ backgroundColor: color.hex }}
          />
        
        </div>
      ))}

      {remainingCount > 0 && (
        <div
          className="w-6 h-6 rounded-full bg-secondary text-white dark:text-gray-900 text-xs flex items-center justify-center font-medium border border-border hover:scale-110 transition-transform cursor-pointer"
          
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
