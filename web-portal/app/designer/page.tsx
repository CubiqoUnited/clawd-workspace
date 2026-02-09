'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Layout, 
  Type, 
  Image, 
  Video, 
  Code, 
  Palette, 
  Grid, 
  Columns,
  Box,
  Square,
  Circle,
  MousePointer,
  Move,
  Trash2,
  Copy,
  Save,
  Download,
  Eye,
  EyeOff,
  Layers,
  Settings,
  Maximize2,
  Minimize2
} from 'lucide-react';
import DesignerCanvas from '@/components/designer/DesignerCanvas';
import ComponentsPanel from '@/components/designer/ComponentsPanel';
import PropertiesPanel from '@/components/designer/PropertiesPanel';
import Toolbar from '@/components/designer/Toolbar';
import PreviewPanel from '@/components/designer/PreviewPanel';

export default function DesignerPage() {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [elements, setElements] = useState<any[]>([
    { id: '1', type: 'container', x: 100, y: 100, width: 800, height: 600, backgroundColor: '#ffffff', children: [] },
    { id: '2', type: 'text', x: 150, y: 150, width: 200, height: 40, content: 'Welcome to My Website', fontSize: 24, color: '#000000', parent: '1' },
    { id: '3', type: 'image', x: 150, y: 220, width: 300, height: 200, src: '/placeholder.jpg', alt: 'Sample image', parent: '1' },
    { id: '4', type: 'button', x: 150, y: 450, width: 120, height: 40, text: 'Learn More', backgroundColor: '#3b82f6', color: '#ffffff', parent: '1' },
  ]);
  
  const [tool, setTool] = useState<string>('select');
  const [zoom, setZoom] = useState<number>(1);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('components');

  const handleAddElement = (elementType: string) => {
    const newElement = {
      id: `element-${Date.now()}`,
      type: elementType,
      x: 100,
      y: 100,
      width: elementType === 'text' ? 200 : elementType === 'button' ? 120 : 300,
      height: elementType === 'text' ? 40 : elementType === 'button' ? 40 : 200,
      ...(elementType === 'text' && { content: 'New Text', fontSize: 16, color: '#000000' }),
      ...(elementType === 'button' && { text: 'Button', backgroundColor: '#3b82f6', color: '#ffffff' }),
      ...(elementType === 'image' && { src: '/placeholder.jpg', alt: 'Image' }),
      ...(elementType === 'container' && { backgroundColor: '#f3f4f6', children: [] }),
      parent: '1'
    };
    
    setElements([...elements, newElement]);
    setSelectedElement(newElement.id);
  };

  const handleUpdateElement = (elementId: string, updates: any) => {
    setElements(elements.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    ));
  };

  const handleDeleteElement = (elementId: string) => {
    setElements(elements.filter(el => el.id !== elementId));
    if (selectedElement === elementId) {
      setSelectedElement(null);
    }
  };

  const handleDuplicateElement = (elementId: string) => {
    const element = elements.find(el => el.id === elementId);
    if (element) {
      const duplicated = {
        ...element,
        id: `element-${Date.now()}`,
        x: element.x + 20,
        y: element.y + 20
      };
      setElements([...elements, duplicated]);
      setSelectedElement(duplicated.id);
    }
  };

  const handleExport = () => {
    const designData = {
      elements,
      metadata: {
        createdAt: new Date().toISOString(),
        version: '1.0',
        canvasWidth: 1200,
        canvasHeight: 800
      }
    };
    
    const dataStr = JSON.stringify(designData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `design-${Date.now()}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    localStorage.setItem('cubiqo-design', JSON.stringify(elements));
    alert('Design saved locally!');
  };

  const handleLoad = () => {
    const saved = localStorage.getItem('cubiqo-design');
    if (saved) {
      setElements(JSON.parse(saved));
      alert('Design loaded!');
    }
  };

  const selectedElementData = elements.find(el => el.id === selectedElement);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Top Toolbar */}
      <Toolbar 
        tool={tool}
        setTool={setTool}
        zoom={zoom}
        setZoom={setZoom}
        showGrid={showGrid}
        setShowGrid={setShowGrid}
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        onSave={handleSave}
        onExport={handleExport}
        onLoad={handleLoad}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Components */}
        <div className={`w-64 bg-gray-800 border-r border-gray-700 transition-all duration-300 ${activeTab === 'components' ? 'block' : 'hidden md:block'}`}>
          <ComponentsPanel 
            onAddElement={handleAddElement}
            elements={elements}
            selectedElement={selectedElement}
            onSelectElement={setSelectedElement}
          />
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 relative overflow-auto bg-gray-800">
            <DesignerCanvas
              elements={elements}
              selectedElement={selectedElement}
              onSelectElement={setSelectedElement}
              onUpdateElement={handleUpdateElement}
              tool={tool}
              zoom={zoom}
              showGrid={showGrid}
              previewMode={previewMode}
            />
          </div>
          
          {/* Bottom Tabs for Mobile */}
          <div className="md:hidden flex border-t border-gray-700">
            <button
              className={`flex-1 py-3 text-center ${activeTab === 'components' ? 'bg-blue-600' : 'bg-gray-800'}`}
              onClick={() => setActiveTab('components')}
            >
              <Layers className="w-5 h-5 mx-auto" />
              <span className="text-xs mt-1">Components</span>
            </button>
            <button
              className={`flex-1 py-3 text-center ${activeTab === 'properties' ? 'bg-blue-600' : 'bg-gray-800'}`}
              onClick={() => setActiveTab('properties')}
            >
              <Settings className="w-5 h-5 mx-auto" />
              <span className="text-xs mt-1">Properties</span>
            </button>
            <button
              className={`flex-1 py-3 text-center ${activeTab === 'preview' ? 'bg-blue-600' : 'bg-gray-800'}`}
              onClick={() => setActiveTab('preview')}
            >
              <Eye className="w-5 h-5 mx-auto" />
              <span className="text-xs mt-1">Preview</span>
            </button>
          </div>
        </div>

        {/* Right Panel - Properties & Preview */}
        <div className={`w-80 bg-gray-800 border-l border-gray-700 transition-all duration-300 ${activeTab === 'properties' || activeTab === 'preview' ? 'block' : 'hidden md:block'}`}>
          {selectedElement ? (
            <PropertiesPanel
              element={selectedElementData}
              onUpdate={handleUpdateElement}
              onDelete={handleDeleteElement}
              onDuplicate={handleDuplicateElement}
            />
          ) : (
            <div className="p-6">
              <div className="text-center text-gray-400">
                <MousePointer className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No Element Selected</h3>
                <p className="text-sm">Select an element to edit its properties</p>
              </div>
            </div>
          )}
          
          {/* Preview Panel */}
          <div className="mt-6 border-t border-gray-700 pt-6">
            <PreviewPanel elements={elements} />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-8 bg-gray-900 border-t border-gray-800 px-4 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center space-x-4">
          <span>Elements: {elements.length}</span>
          <span>Zoom: {(zoom * 100).toFixed(0)}%</span>
          <span>Canvas: 1200 × 800</span>
        </div>
        <div>
          {selectedElement && (
            <span>Selected: {selectedElementData?.type || 'Element'}</span>
          )}
        </div>
      </div>
    </div>
  );
}