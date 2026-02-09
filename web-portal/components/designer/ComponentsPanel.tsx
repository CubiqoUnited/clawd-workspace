'use client';

import { 
  Type, 
  Image, 
  Square, 
  Move, 
  Video, 
  Code, 
  Layout, 
  FormInput,
  Share2,
  Calendar,
  MapPin,
  Star,
  Heart,
  MessageSquare,
  ShoppingCart,
  Layers,
  Search,
  Filter,
  ChevronRight
} from 'lucide-react';

interface ComponentsPanelProps {
  onAddElement: (type: string) => void;
  elements: any[];
  selectedElement: string | null;
  onSelectElement: (id: string | null) => void;
}

export default function ComponentsPanel({
  onAddElement,
  elements,
  selectedElement,
  onSelectElement
}: ComponentsPanelProps) {
  const componentCategories = [
    {
      id: 'basic',
      name: 'Basic Elements',
      icon: Layout,
      components: [
        { id: 'container', name: 'Container', icon: Move, color: 'text-blue-500', description: 'Group elements together' },
        { id: 'text', name: 'Text', icon: Type, color: 'text-green-500', description: 'Add headings, paragraphs, labels' },
        { id: 'image', name: 'Image', icon: Image, color: 'text-purple-500', description: 'Add images with custom sources' },
        { id: 'button', name: 'Button', icon: Square, color: 'text-red-500', description: 'Interactive buttons with actions' },
      ]
    },
    {
      id: 'media',
      name: 'Media',
      icon: Video,
      components: [
        { id: 'video', name: 'Video', icon: Video, color: 'text-yellow-500', description: 'Embed video players' },
        { id: 'audio', name: 'Audio', icon: MessageSquare, color: 'text-pink-500', description: 'Audio players and controls' },
        { id: 'carousel', name: 'Carousel', icon: Layers, color: 'text-indigo-500', description: 'Image or content sliders' },
      ]
    },
    {
      id: 'forms',
      name: 'Forms & Inputs',
      icon: FormInput,
      components: [
        { id: 'input', name: 'Input Field', icon: FormInput, color: 'text-teal-500', description: 'Text input fields' },
        { id: 'textarea', name: 'Text Area', icon: FormInput, color: 'text-cyan-500', description: 'Multi-line text inputs' },
        { id: 'select', name: 'Dropdown', icon: ChevronRight, color: 'text-orange-500', description: 'Select dropdown menus' },
        { id: 'checkbox', name: 'Checkbox', icon: Square, color: 'text-lime-500', description: 'Checkbox inputs' },
        { id: 'radio', name: 'Radio Button', icon: CircleIcon, color: 'text-emerald-500', description: 'Radio button groups' },
      ]
    },
    {
      id: 'social',
      name: 'Social & Interactive',
      icon: Share2,
      components: [
        { id: 'social-share', name: 'Share Buttons', icon: Share2, color: 'text-blue-400', description: 'Social media sharing' },
        { id: 'like', name: 'Like Button', icon: Heart, color: 'text-red-400', description: 'Like/heart buttons' },
        { id: 'comment', name: 'Comments', icon: MessageSquare, color: 'text-green-400', description: 'Comment sections' },
        { id: 'rating', name: 'Star Rating', icon: Star, color: 'text-yellow-400', description: 'Star rating widgets' },
      ]
    },
    {
      id: 'commerce',
      name: 'E-commerce',
      icon: ShoppingCart,
      components: [
        { id: 'product-card', name: 'Product Card', icon: ShoppingCart, color: 'text-purple-400', description: 'Product display cards' },
        { id: 'add-to-cart', name: 'Add to Cart', icon: ShoppingCart, color: 'text-pink-400', description: 'Shopping cart buttons' },
        { id: 'price', name: 'Price Display', icon: DollarSign, color: 'text-green-400', description: 'Price formatting' },
      ]
    },
    {
      id: 'advanced',
      name: 'Advanced',
      icon: Code,
      components: [
        { id: 'map', name: 'Map', icon: MapPin, color: 'text-blue-300', description: 'Interactive maps' },
        { id: 'calendar', name: 'Calendar', icon: Calendar, color: 'text-red-300', description: 'Date pickers and calendars' },
        { id: 'search', name: 'Search Bar', icon: Search, color: 'text-gray-300', description: 'Search functionality' },
        { id: 'filter', name: 'Filters', icon: Filter, color: 'text-indigo-300', description: 'Filter and sort controls' },
      ]
    }
  ];

  // Mock CircleIcon for radio button
  function CircleIcon(props: any) {
    return (
      <svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  }

  // Mock DollarSign for price display
  function DollarSign(props: any) {
    return (
      <svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    );
  }

  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData('component-type', componentType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleComponentClick = (componentType: string) => {
    onAddElement(componentType);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Components</h2>
          <div className="text-xs text-gray-400">
            {elements.length} elements
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          Drag or click to add elements to canvas
        </p>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search components..."
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Components List */}
      <div className="flex-1 overflow-y-auto">
        {componentCategories.map((category) => (
          <div key={category.id} className="border-b border-gray-800 last:border-b-0">
            <div className="sticky top-0 bg-gray-800 z-10 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <category.icon className="w-4 h-4 text-gray-400" />
                <h3 className="text-sm font-medium text-white">{category.name}</h3>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
            
            <div className="p-2 grid grid-cols-2 gap-2">
              {category.components.map((component) => (
                <div
                  key={component.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, component.id)}
                  onClick={() => handleComponentClick(component.id)}
                  className="group relative p-3 bg-gray-900 rounded-lg border border-gray-800 hover:border-blue-500 hover:bg-gray-800 cursor-pointer transition-all"
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`p-2 rounded-lg bg-gray-800 group-hover:bg-gray-700 ${component.color}`}>
                      <component.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white">{component.name}</div>
                      <div className="text-[10px] text-gray-500 mt-1 line-clamp-2">
                        {component.description}
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                    {component.description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Elements Tree */}
      <div className="border-t border-gray-700">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-white">Elements Tree</h3>
            <span className="text-xs text-gray-400">{elements.length} items</span>
          </div>
          
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {elements.map((element) => (
              <div
                key={element.id}
                className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
                  selectedElement === element.id 
                    ? 'bg-blue-600/20 border border-blue-500/30' 
                    : 'hover:bg-gray-800'
                }`}
                onClick={() => onSelectElement(element.id)}
              >
                <div className={`p-1 rounded ${
                  element.type === 'text' ? 'bg-green-500/20 text-green-400' :
                  element.type === 'image' ? 'bg-purple-500/20 text-purple-400' :
                  element.type === 'button' ? 'bg-red-500/20 text-red-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {element.type === 'text' && <Type className="w-3 h-3" />}
                  {element.type === 'image' && <Image className="w-3 h-3" />}
                  {element.type === 'button' && <Square className="w-3 h-3" />}
                  {element.type === 'container' && <Move className="w-3 h-3" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-white truncate">
                    {element.type === 'text' ? element.content?.substring(0, 20) || 'Text' :
                     element.type === 'button' ? element.text || 'Button' :
                     element.type === 'image' ? 'Image' :
                     element.type === 'container' ? 'Container' : element.type}
                  </div>
                  <div className="text-[10px] text-gray-500">
                    {element.type} • {Math.round(element.x)}×{Math.round(element.y)}
                  </div>
                </div>
                {selectedElement === element.id && (
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                )}
              </div>
            ))}
            
            {elements.length === 0 && (
              <div className="text-center py-4 text-gray-500 text-sm">
                No elements added yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 bg-gray-900">
        <div className="text-xs text-gray-400">
          <div className="flex items-center justify-between mb-1">
            <span>Tips:</span>
            <span className="text-blue-400">Drag & Drop</span>
          </div>
          <ul className="space-y-1">
            <li className="flex items-center">
              <div className="w-1 h-1 rounded-full bg-gray-600 mr-2"></div>
              <span>Click to add, drag to position</span>
            </li>
            <li className="flex items-center">
              <div className="w-1 h-1 rounded-full bg-gray-600 mr-2"></div>
              <span>Use Select tool to move elements</span>
            </li>
            <li className="flex items-center">
              <div className="w-1 h-1 rounded-full bg-gray-600 mr-2"></div>
              <span>Right-click for more options</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}