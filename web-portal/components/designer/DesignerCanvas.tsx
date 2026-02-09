'use client';

import { useState, useRef, useEffect } from 'react';
import { Move, Square, Type, Image as ImageIcon, MousePointer } from 'lucide-react';

interface DesignerCanvasProps {
  elements: any[];
  selectedElement: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: any) => void;
  tool: string;
  zoom: number;
  showGrid: boolean;
  previewMode: boolean;
}

export default function DesignerCanvas({
  elements,
  selectedElement,
  onSelectElement,
  onUpdateElement,
  tool,
  zoom,
  showGrid,
  previewMode
}: DesignerCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [elementStart, setElementStart] = useState({ x: 0, y: 0 });
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    if (previewMode) return;
    
    const element = elements.find(el => el.id === elementId);
    if (!element) return;

    if (tool === 'select') {
      onSelectElement(elementId);
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setElementStart({ x: element.x, y: element.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElement || previewMode) return;

    const deltaX = (e.clientX - dragStart.x) / zoom;
    const deltaY = (e.clientY - dragStart.y) / zoom;

    onUpdateElement(selectedElement, {
      x: Math.max(0, elementStart.x + deltaX),
      y: Math.max(0, elementStart.y + deltaY)
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      onSelectElement(null);
    }
  };

  const getElementIcon = (type: string) => {
    switch (type) {
      case 'text': return <Type className="w-4 h-4" />;
      case 'image': return <ImageIcon className="w-4 h-4" />;
      case 'button': return <Square className="w-4 h-4" />;
      case 'container': return <Move className="w-4 h-4" />;
      default: return <Square className="w-4 h-4" />;
    }
  };

  const renderElement = (element: any) => {
    const isSelected = selectedElement === element.id;
    const style: React.CSSProperties = {
      position: 'absolute',
      left: `${element.x * zoom}px`,
      top: `${element.y * zoom}px`,
      width: `${element.width * zoom}px`,
      height: `${element.height * zoom}px`,
      transform: `scale(${zoom})`,
      transformOrigin: 'top left',
      cursor: tool === 'select' ? 'move' : 'default',
      outline: isSelected ? '2px solid #3b82f6' : '1px dashed #6b7280',
      outlineOffset: isSelected ? '2px' : '1px',
      pointerEvents: previewMode ? 'none' : 'auto',
      zIndex: isSelected ? 10 : 1
    };

    switch (element.type) {
      case 'container':
        return (
          <div
            key={element.id}
            style={{
              ...style,
              backgroundColor: element.backgroundColor || '#f3f4f6',
              borderRadius: '8px'
            }}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            className="relative"
          >
            {isSelected && !previewMode && (
              <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                {getElementIcon(element.type)}
                <span>Container</span>
              </div>
            )}
          </div>
        );

      case 'text':
        return (
          <div
            key={element.id}
            style={{
              ...style,
              color: element.color || '#000000',
              fontSize: `${(element.fontSize || 16) * zoom}px`,
              fontWeight: element.bold ? 'bold' : 'normal',
              fontStyle: element.italic ? 'italic' : 'normal',
              textAlign: element.align || 'left',
              display: 'flex',
              alignItems: 'center'
            }}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            className="whitespace-nowrap"
          >
            {element.content || 'Text'}
            {isSelected && !previewMode && (
              <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                {getElementIcon(element.type)}
                <span>Text</span>
              </div>
            )}
          </div>
        );

      case 'image':
        return (
          <div
            key={element.id}
            style={style}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            className="relative bg-gray-200 rounded overflow-hidden"
          >
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
              <ImageIcon className="w-12 h-12 text-gray-500" />
            </div>
            {isSelected && !previewMode && (
              <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                {getElementIcon(element.type)}
                <span>Image</span>
              </div>
            )}
          </div>
        );

      case 'button':
        return (
          <button
            key={element.id}
            style={{
              ...style,
              backgroundColor: element.backgroundColor || '#3b82f6',
              color: element.color || '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: `${(element.fontSize || 14) * zoom}px`,
              fontWeight: '500',
              cursor: previewMode ? 'pointer' : 'move'
            }}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            onClick={(e) => {
              if (previewMode) {
                e.stopPropagation();
                alert('Button clicked!');
              }
            }}
            className="hover:opacity-90 transition-opacity"
          >
            {element.text || 'Button'}
            {isSelected && !previewMode && (
              <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                {getElementIcon(element.type)}
                <span>Button</span>
              </div>
            )}
          </button>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full min-h-[600px] bg-gray-900 overflow-auto"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleCanvasClick}
    >
      {/* Grid Background */}
      {showGrid && !previewMode && (
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #4b5563 1px, transparent 1px),
              linear-gradient(to bottom, #4b5563 1px, transparent 1px)
            `,
            backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
            opacity: 0.3
          }}
        />
      )}

      {/* Canvas Container */}
      <div
        className="relative m-8"
        style={{
          width: `${1200 * zoom}px`,
          height: `${800 * zoom}px`,
          backgroundColor: previewMode ? '#ffffff' : '#1f2937',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        {/* Canvas Border */}
        <div className="absolute inset-0 border-2 border-gray-700 rounded-[10px] pointer-events-none" />

        {/* Render Elements */}
        {elements.map(renderElement)}

        {/* Canvas Dimensions Label */}
        {!previewMode && (
          <div className="absolute -bottom-8 left-0 text-xs text-gray-400">
            Canvas: 1200 × 800px
          </div>
        )}

        {/* Tool Indicator */}
        {!previewMode && (
          <div className="absolute top-4 right-4 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg flex items-center gap-2">
            {tool === 'select' ? (
              <>
                <MousePointer className="w-4 h-4" />
                <span>Select Tool</span>
              </>
            ) : (
              <>
                <Square className="w-4 h-4" />
                <span>Add {tool.charAt(0).toUpperCase() + tool.slice(1)}</span>
              </>
            )}
          </div>
        )}

        {/* Preview Mode Indicator */}
        {previewMode && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2">
            <span className="animate-pulse">●</span>
            <span>Preview Mode - Click buttons to test</span>
          </div>
        )}
      </div>

      {/* Drop Zone Hint */}
      {tool !== 'select' && !previewMode && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="bg-blue-600/20 border-2 border-dashed border-blue-500 rounded-lg p-8">
            <div className="text-blue-400 mb-2">
              {tool === 'text' && <Type className="w-12 h-12 mx-auto" />}
              {tool === 'image' && <ImageIcon className="w-12 h-12 mx-auto" />}
              {tool === 'button' && <Square className="w-12 h-12 mx-auto" />}
              {tool === 'container' && <Move className="w-12 h-12 mx-auto" />}
            </div>
            <p className="text-blue-300 font-medium">
              Click on canvas to add {tool}
            </p>
            <p className="text-blue-400 text-sm mt-1">
              Or select an element first
            </p>
          </div>
        </div>
      )}
    </div>
  );
}