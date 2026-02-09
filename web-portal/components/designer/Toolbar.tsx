'use client';

import { 
  MousePointer,
  Type,
  Image,
  Square,
  Move,
  Grid,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  Save,
  Download,
  Upload,
  Trash2,
  Settings,
  HelpCircle
} from 'lucide-react';

interface ToolbarProps {
  tool: string;
  setTool: (tool: string) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  previewMode: boolean;
  setPreviewMode: (mode: boolean) => void;
  onSave: () => void;
  onExport: () => void;
  onLoad: () => void;
}

export default function Toolbar({
  tool,
  setTool,
  zoom,
  setZoom,
  showGrid,
  setShowGrid,
  previewMode,
  setPreviewMode,
  onSave,
  onExport,
  onLoad
}: ToolbarProps) {
  const tools = [
    { id: 'select', label: 'Select', icon: MousePointer, description: 'Select and move elements' },
    { id: 'text', label: 'Text', icon: Type, description: 'Add text elements' },
    { id: 'image', label: 'Image', icon: Image, description: 'Add image elements' },
    { id: 'button', label: 'Button', icon: Square, description: 'Add button elements' },
    { id: 'container', label: 'Container', icon: Move, description: 'Add container elements' },
  ];

  const handleZoomIn = () => {
    setZoom(Math.min(2, zoom + 0.25));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(0.25, zoom - 0.25));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
    if (!previewMode) {
      setTool('select'); // Always use select tool in preview mode
    }
  };

  const handleClearCanvas = () => {
    if (confirm('Are you sure you want to clear the canvas? This cannot be undone.')) {
      // In a real app, this would clear all elements
      alert('Canvas cleared! (This is a demo - in real app would clear elements)');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-gray-800 border-b border-gray-700 space-y-4 md:space-y-0">
      {/* Left Section - Logo & Tools */}
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <div className="hidden md:flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Designer
          </span>
        </div>

        {/* Tools */}
        <div className="flex items-center space-x-1 bg-gray-900 rounded-lg p-1">
          {tools.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`p-2 rounded-md transition-all ${tool === id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
              onClick={() => setTool(id)}
              title={`${label} Tool`}
            >
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>

      {/* Center Section - Zoom & Grid Controls */}
      <div className="flex items-center space-x-4">
        {/* Zoom Controls */}
        <div className="flex items-center space-x-2 bg-gray-900 rounded-lg p-1">
          <button
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            onClick={handleZoomOut}
            title="Zoom Out"
            disabled={zoom <= 0.25}
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          
          <div className="px-3 py-1">
            <span className="text-sm font-medium text-white">
              {Math.round(zoom * 100)}%
            </span>
          </div>
          
          <button
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            onClick={handleZoomIn}
            title="Zoom In"
            disabled={zoom >= 2}
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          
          <button
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            onClick={handleResetZoom}
            title="Reset Zoom"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>

        {/* Grid Toggle */}
        <button
          className={`p-2 rounded-lg ${showGrid ? 'bg-blue-600 text-white' : 'bg-gray-900 text-gray-400 hover:text-white'}`}
          onClick={() => setShowGrid(!showGrid)}
          title={showGrid ? 'Hide Grid' : 'Show Grid'}
        >
          <Grid className="w-5 h-5" />
        </button>

        {/* Preview Toggle */}
        <button
          className={`p-2 rounded-lg ${previewMode ? 'bg-yellow-600 text-white' : 'bg-gray-900 text-gray-400 hover:text-white'}`}
          onClick={togglePreviewMode}
          title={previewMode ? 'Exit Preview Mode' : 'Enter Preview Mode'}
        >
          {previewMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center space-x-2">
        {/* File Actions */}
        <div className="hidden md:flex items-center space-x-2 bg-gray-900 rounded-lg p-1">
          <button
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md flex items-center space-x-2"
            onClick={onLoad}
            title="Load Design"
          >
            <Upload className="w-5 h-5" />
            <span className="text-sm hidden lg:inline">Load</span>
          </button>
          
          <button
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md flex items-center space-x-2"
            onClick={onSave}
            title="Save Design"
          >
            <Save className="w-5 h-5" />
            <span className="text-sm hidden lg:inline">Save</span>
          </button>
          
          <button
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md flex items-center space-x-2"
            onClick={onExport}
            title="Export Design"
          >
            <Download className="w-5 h-5" />
            <span className="text-sm hidden lg:inline">Export</span>
          </button>
        </div>

        {/* Clear Canvas */}
        <button
          className="p-2 text-red-400 hover:text-white hover:bg-red-600 rounded-lg"
          onClick={handleClearCanvas}
          title="Clear Canvas"
        >
          <Trash2 className="w-5 h-5" />
        </button>

        {/* Settings */}
        <button
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Help */}
        <button
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg"
          title="Help"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Actions Bar */}
      <div className="md:hidden flex items-center justify-between w-full pt-2 border-t border-gray-700">
        <div className="flex space-x-2">
          <button
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            onClick={onSave}
            title="Save"
          >
            <Save className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            onClick={onExport}
            title="Export"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
        
        <div className="text-xs text-gray-500">
          {tool === 'select' ? 'Select Tool' : `Add ${tool.charAt(0).toUpperCase() + tool.slice(1)}`}
        </div>
      </div>
    </div>
  );
}