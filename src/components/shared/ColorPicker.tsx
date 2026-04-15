import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Color } from '../../types/index';
import { generateId } from '../../utils/formatters';

interface ColorPickerProps {
  colors: Color[];
  onColorsChange: (colors: Color[]) => void;
  error?: string;
}

export function ColorPicker({ colors, onColorsChange, error }: ColorPickerProps) {
  const [selectedHex, setSelectedHex] = React.useState('#004ac6');
  const [colorName, setColorName] = React.useState('');
  const [duplicateError, setDuplicateError] = React.useState('');

  const isDuplicateColor = (hex: string) => {
    return colors.some(c => c.hex.toLowerCase() === hex.toLowerCase());
  };

  const handleAddColor = () => {
    if (!selectedHex) return;

    // Check for duplicate color
    if (isDuplicateColor(selectedHex)) {
      setDuplicateError('This color has already been added');
      return;
    }

    setDuplicateError('');
    const newColor: Color = {
      id: generateId(),
      hex: selectedHex,
      name: colorName || undefined,
    };

    onColorsChange([...colors, newColor]);
    setColorName('');
  };

  const handleRemoveColor = (id: string) => {
    onColorsChange(colors.filter((c) => c.id !== id));
  };

  const handleColorHexChange = (id: string, newHex: string) => {
    // Check if new hex would be a duplicate (excluding current color)
    const isDuplicate = colors.some(c =>
      c.hex.toLowerCase() === newHex.toLowerCase() && c.id !== id
    );

    if (isDuplicate) {
      setDuplicateError('This color is already in use');
      return;
    }

    setDuplicateError('');
    onColorsChange(
      colors.map((c) => (c.id === id ? { ...c, hex: newHex } : c))
    );
  };

  const handleColorNameChange = (id: string, newName: string) => {
    onColorsChange(
      colors.map((c) => (c.id === id ? { ...c, name: newName } : c))
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-headline font-bold text-on-surface dark:text-slate-100">Available Colors</h3>

      {/* Color Picker Input */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="new-color-value" className="sr-only">
              Pick a color
            </label>
            <input
              id="new-color-value"
              type="color"
              value={selectedHex}
              onChange={(e) => setSelectedHex(e.target.value)}
              className="w-12 h-11 rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-shadow"
            />
            <label htmlFor="new-color-hex" className="sr-only">
              New color hex code
            </label>
            <input
              id="new-color-hex"
              type="text"
              value={selectedHex}
              onChange={(e) => setSelectedHex(e.target.value)}
              placeholder="#000000"
              className="arch-input w-32"
            />
          </div>
          <input
            id="new-color-name"
            type="text"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
            placeholder="Color name (optional)"
            className="arch-input flex-1"
          />
          <button
            type="button"
            onClick={handleAddColor}
            disabled={isDuplicateColor(selectedHex)}
            className="px-6 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-lg font-bold shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            title={isDuplicateColor(selectedHex) ? 'This color is already added' : ''}
          >
            <Plus className="w-4 h-4" />
            Add Color
          </button>
        </div>
        {error && <p className="error-text">{error}</p>}
        {duplicateError && <p className="text-sm text-error font-body">{duplicateError}</p>}
      </div>

      {/* Selected Colors Display */}
      {colors.length > 0 && (
        <div className="bg-surface-container-low dark:bg-slate-800/50 rounded-xl p-6 space-y-4">
          <h4 className="text-sm font-headline font-bold text-on-surface dark:text-slate-200 uppercase tracking-wide">
            Selected Colors ({colors.length})
          </h4>
          <div className="space-y-3">
            {colors.map((color) => (
              <div
                key={color.id}
                className="flex items-center gap-4 p-4 bg-surface-container-lowest dark:bg-slate-700/30 rounded-lg hover:shadow-ambient transition-all"
              >
                <div
                  className="w-10 h-10 rounded-lg shadow-md flex-shrink-0 cursor-pointer hover:scale-110 transition-transform border-2 border-outline-variant/20"
                  style={{ backgroundColor: color.hex }}
                  title={`Click to change color`}
                  onClick={() => setSelectedHex(color.hex)}
                />
                <div className="flex-1 space-y-2 min-w-0">
                  <input
                    type="text"
                    value={color.hex}
                    onChange={(e) => handleColorHexChange(color.id, e.target.value)}
                    className="arch-input text-sm"
                    placeholder="Hex code"
                  />
                  <input
                    type="text"
                    value={color.name || ''}
                    onChange={(e) => handleColorNameChange(color.id, e.target.value)}
                    placeholder="Color name"
                    className="arch-input text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveColor(color.id)}
                  aria-label={`Remove ${color.name || color.hex} color`}
                  title="Remove color"
                  className="p-2 text-error hover:bg-error/10 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
