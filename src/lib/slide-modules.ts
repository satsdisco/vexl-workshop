// Modular slide system - all available modules that can be added to slides

export interface SlideModule {
  id: string
  type: string
  name: string
  description: string
  icon: string
  category: 'content' | 'interactive' | 'visual' | 'data'
  defaultConfig: any
  editableFields: EditableField[]
}

export interface EditableField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'color' | 'image' | 'array'
  placeholder?: string
  options?: { value: string; label: string }[]
  arrayFields?: EditableField[] // For array types
}

export interface SlideConfig {
  id: string
  name: string
  layout: 'single' | 'split' | 'grid' | 'focus' | 'custom'
  modules: ModuleInstance[]
  background?: {
    type: 'color' | 'gradient' | 'image' | 'video'
    value: string
  }
  transitions?: {
    enter: string
    exit: string
    duration: number
  }
}

export interface ModuleInstance {
  id: string
  moduleId: string
  position: {
    x: number
    y: number
    width: number
    height: number
  }
  config: any
  content: any
}

// All available modules for building slides
export const availableModules: SlideModule[] = [
  // Content Modules
  {
    id: 'heading',
    type: 'heading',
    name: 'Heading',
    description: 'Large title text',
    icon: '📝',
    category: 'content',
    defaultConfig: {
      alignment: 'center',
      size: 'xl',
      animate: true
    },
    editableFields: [
      { key: 'text', label: 'Heading Text', type: 'text', placeholder: 'Enter heading...' },
      { key: 'subtext', label: 'Subtitle', type: 'text', placeholder: 'Optional subtitle...' },
      { key: 'highlightWord', label: 'Highlight Word', type: 'text', placeholder: 'Word to highlight in yellow' },
      { key: 'size', label: 'Size', type: 'select', options: [
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
        { value: 'xl', label: 'Extra Large' }
      ]},
      { key: 'alignment', label: 'Alignment', type: 'select', options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' }
      ]}
    ]
  },
  {
    id: 'paragraph',
    type: 'paragraph',
    name: 'Paragraph',
    description: 'Body text content',
    icon: '📄',
    category: 'content',
    defaultConfig: {
      columns: 1,
      fontSize: 'base'
    },
    editableFields: [
      { key: 'text', label: 'Content', type: 'textarea', placeholder: 'Enter paragraph text...' },
      { key: 'fontSize', label: 'Font Size', type: 'select', options: [
        { value: 'sm', label: 'Small' },
        { value: 'base', label: 'Normal' },
        { value: 'lg', label: 'Large' },
        { value: 'xl', label: 'Extra Large' }
      ]}
    ]
  },
  {
    id: 'bulletPoints',
    type: 'bulletPoints',
    name: 'Bullet Points',
    description: 'List of key points',
    icon: '📋',
    category: 'content',
    defaultConfig: {
      animated: true,
      bulletStyle: 'check'
    },
    editableFields: [
      { 
        key: 'points', 
        label: 'Points', 
        type: 'array',
        arrayFields: [
          { key: 'text', label: 'Point Text', type: 'text' },
          { key: 'subtext', label: 'Description', type: 'text' }
        ]
      },
      { key: 'bulletStyle', label: 'Style', type: 'select', options: [
        { value: 'bullet', label: 'Bullet' },
        { value: 'number', label: 'Numbered' },
        { value: 'check', label: 'Checkmark' },
        { value: 'arrow', label: 'Arrow' }
      ]}
    ]
  },
  {
    id: 'quote',
    type: 'quote',
    name: 'Quote',
    description: 'Highlighted quote or statement',
    icon: '💬',
    category: 'content',
    defaultConfig: {
      style: 'border',
      showAuthor: true
    },
    editableFields: [
      { key: 'text', label: 'Quote', type: 'textarea', placeholder: 'Enter quote...' },
      { key: 'author', label: 'Author', type: 'text', placeholder: 'Quote author...' },
      { key: 'style', label: 'Style', type: 'select', options: [
        { value: 'border', label: 'Border' },
        { value: 'quotes', label: 'Quote Marks' },
        { value: 'highlight', label: 'Highlighted' }
      ]}
    ]
  },
  {
    id: 'stats',
    type: 'stats',
    name: 'Statistics',
    description: 'Animated number displays',
    icon: '📊',
    category: 'content',
    defaultConfig: {
      layout: 'row',
      animate: true
    },
    editableFields: [
      {
        key: 'stats',
        label: 'Statistics',
        type: 'array',
        arrayFields: [
          { key: 'value', label: 'Value', type: 'text' },
          { key: 'label', label: 'Label', type: 'text' },
          { key: 'suffix', label: 'Suffix', type: 'text' }
        ]
      }
    ]
  },

  // Interactive Modules
  {
    id: 'webOfTrust',
    type: 'webOfTrust',
    name: 'Web of Trust',
    description: 'Interactive trust network visualization',
    icon: '🕸️',
    category: 'interactive',
    defaultConfig: {
      nodeCount: 12,
      animationSpeed: 'medium',
      showLabels: true,
      interactive: true
    },
    editableFields: [
      { key: 'nodeCount', label: 'Number of Nodes', type: 'number', placeholder: '12' },
      { key: 'centerLabel', label: 'Center Node Label', type: 'text', placeholder: 'You' },
      { key: 'connectionStrength', label: 'Connection Density', type: 'select', options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]},
      { key: 'interactive', label: 'Interactive', type: 'boolean' },
      { key: 'showLabels', label: 'Show Labels', type: 'boolean' }
    ]
  },
  {
    id: 'networkEffect',
    type: 'networkEffect',
    name: 'Network Effect Calculator',
    description: 'Shows exponential network growth',
    icon: '📈',
    category: 'interactive',
    defaultConfig: {
      initialContacts: 50,
      depth: 3,
      multiplier: 2
    },
    editableFields: [
      { key: 'initialContacts', label: 'Starting Contacts', type: 'number', placeholder: '50' },
      { key: 'depth', label: 'Network Depth', type: 'number', placeholder: '3' },
      { key: 'multiplier', label: 'Growth Multiplier', type: 'number', placeholder: '2' },
      { key: 'showCalculation', label: 'Show Calculation', type: 'boolean' }
    ]
  },
  {
    id: 'marketMap',
    type: 'marketMap',
    name: 'Market Map',
    description: 'P2P trader location visualization',
    icon: '🗺️',
    category: 'interactive',
    defaultConfig: {
      location: 'Prague',
      radius: 50,
      showHeatmap: true,
      traderCount: 25
    },
    editableFields: [
      { key: 'location', label: 'City/Location', type: 'text', placeholder: 'Prague' },
      { key: 'radius', label: 'Radius (km)', type: 'number', placeholder: '50' },
      { key: 'traderCount', label: 'Number of Traders', type: 'number', placeholder: '25' },
      { key: 'showHeatmap', label: 'Show Heatmap', type: 'boolean' },
      { key: 'animateMarkers', label: 'Animate Markers', type: 'boolean' }
    ]
  },
  {
    id: 'hashingViz',
    type: 'hashingViz',
    name: 'Hashing Visualization',
    description: 'Shows cryptographic hashing process',
    icon: '🔐',
    category: 'interactive',
    defaultConfig: {
      inputType: 'phone',
      showSteps: true,
      animateHashing: true
    },
    editableFields: [
      { key: 'inputPlaceholder', label: 'Input Placeholder', type: 'text', placeholder: '+420 xxx xxx xxx' },
      { key: 'inputType', label: 'Input Type', type: 'select', options: [
        { value: 'phone', label: 'Phone Number' },
        { value: 'email', label: 'Email' },
        { value: 'text', label: 'Custom Text' }
      ]},
      { key: 'showSteps', label: 'Show Process Steps', type: 'boolean' },
      { key: 'animateHashing', label: 'Animate Hashing', type: 'boolean' }
    ]
  },
  {
    id: 'qrScanner',
    type: 'qrScanner',
    name: 'QR Code Scanner',
    description: 'Simulated QR code scanning',
    icon: '📱',
    category: 'interactive',
    defaultConfig: {
      mockDelay: 2000,
      showInstructions: true
    },
    editableFields: [
      { key: 'instructions', label: 'Instructions', type: 'text', placeholder: 'Point your camera at the QR code' },
      { key: 'successMessage', label: 'Success Message', type: 'text', placeholder: 'Successfully scanned!' },
      { key: 'mockDelay', label: 'Mock Scan Delay (ms)', type: 'number', placeholder: '2000' }
    ]
  },
  {
    id: 'contactImporter',
    type: 'contactImporter',
    name: 'Contact Importer',
    description: 'Demonstrates contact import flow',
    icon: '👥',
    category: 'interactive',
    defaultConfig: {
      mockContacts: 10,
      showPrivacyInfo: true
    },
    editableFields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Import Your Contacts' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Your contacts are hashed locally...' },
      { key: 'mockContacts', label: 'Mock Contact Count', type: 'number', placeholder: '10' },
      { key: 'showPrivacyInfo', label: 'Show Privacy Info', type: 'boolean' }
    ]
  },

  // Visual Modules
  {
    id: 'image',
    type: 'image',
    name: 'Image',
    description: 'Single image or gallery',
    icon: '🖼️',
    category: 'visual',
    defaultConfig: {
      fit: 'contain',
      rounded: true
    },
    editableFields: [
      { key: 'src', label: 'Image URL', type: 'image', placeholder: 'https://...' },
      { key: 'alt', label: 'Alt Text', type: 'text', placeholder: 'Image description' },
      { key: 'caption', label: 'Caption', type: 'text', placeholder: 'Optional caption' },
      { key: 'fit', label: 'Fit', type: 'select', options: [
        { value: 'contain', label: 'Contain' },
        { value: 'cover', label: 'Cover' },
        { value: 'fill', label: 'Fill' }
      ]}
    ]
  },
  {
    id: 'video',
    type: 'video',
    name: 'Video',
    description: 'Embedded video player',
    icon: '🎬',
    category: 'visual',
    defaultConfig: {
      autoplay: false,
      controls: true,
      loop: false
    },
    editableFields: [
      { key: 'src', label: 'Video URL', type: 'text', placeholder: 'https://...' },
      { key: 'poster', label: 'Poster Image', type: 'image', placeholder: 'Thumbnail URL' },
      { key: 'autoplay', label: 'Autoplay', type: 'boolean' },
      { key: 'loop', label: 'Loop', type: 'boolean' },
      { key: 'muted', label: 'Muted', type: 'boolean' }
    ]
  },
  {
    id: 'icon',
    type: 'icon',
    name: 'Icon',
    description: 'Large decorative icon',
    icon: '✨',
    category: 'visual',
    defaultConfig: {
      size: 'large',
      animated: true
    },
    editableFields: [
      { key: 'icon', label: 'Icon/Emoji', type: 'text', placeholder: '🚀' },
      { key: 'size', label: 'Size', type: 'select', options: [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
        { value: 'huge', label: 'Huge' }
      ]},
      { key: 'animated', label: 'Animated', type: 'boolean' }
    ]
  },
  {
    id: 'comparison',
    type: 'comparison',
    name: 'Comparison',
    description: 'Side-by-side comparison',
    icon: '⚖️',
    category: 'visual',
    defaultConfig: {
      layout: 'vertical',
      showVs: true
    },
    editableFields: [
      { key: 'leftTitle', label: 'Left Title', type: 'text', placeholder: 'Traditional' },
      { key: 'rightTitle', label: 'Right Title', type: 'text', placeholder: 'Vexl' },
      { key: 'leftPoints', label: 'Left Points', type: 'array', arrayFields: [
        { key: 'text', label: 'Point', type: 'text' }
      ]},
      { key: 'rightPoints', label: 'Right Points', type: 'array', arrayFields: [
        { key: 'text', label: 'Point', type: 'text' }
      ]}
    ]
  },

  // Data Modules
  {
    id: 'chart',
    type: 'chart',
    name: 'Chart',
    description: 'Data visualization charts',
    icon: '📊',
    category: 'data',
    defaultConfig: {
      type: 'bar',
      animated: true
    },
    editableFields: [
      { key: 'title', label: 'Chart Title', type: 'text', placeholder: 'Chart Title' },
      { key: 'type', label: 'Chart Type', type: 'select', options: [
        { value: 'bar', label: 'Bar' },
        { value: 'line', label: 'Line' },
        { value: 'pie', label: 'Pie' },
        { value: 'donut', label: 'Donut' }
      ]},
      { key: 'data', label: 'Data Points', type: 'array', arrayFields: [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'value', label: 'Value', type: 'number' }
      ]}
    ]
  },
  {
    id: 'timeline',
    type: 'timeline',
    name: 'Timeline',
    description: 'Event timeline display',
    icon: '📅',
    category: 'data',
    defaultConfig: {
      orientation: 'horizontal',
      animated: true
    },
    editableFields: [
      { key: 'events', label: 'Timeline Events', type: 'array', arrayFields: [
        { key: 'date', label: 'Date', type: 'text' },
        { key: 'title', label: 'Event Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'text' }
      ]}
    ]
  },
  {
    id: 'codeBlock',
    type: 'codeBlock',
    name: 'Code Block',
    description: 'Syntax highlighted code',
    icon: '💻',
    category: 'data',
    defaultConfig: {
      language: 'javascript',
      showLineNumbers: true
    },
    editableFields: [
      { key: 'code', label: 'Code', type: 'textarea', placeholder: 'Enter code...' },
      { key: 'language', label: 'Language', type: 'select', options: [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'python', label: 'Python' },
        { value: 'bash', label: 'Bash' }
      ]},
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Optional title' }
    ]
  },
  {
    id: 'button',
    type: 'button',
    name: 'Call to Action',
    description: 'Interactive button',
    icon: '🔘',
    category: 'content',
    defaultConfig: {
      style: 'primary',
      size: 'large'
    },
    editableFields: [
      { key: 'text', label: 'Button Text', type: 'text', placeholder: 'Get Started' },
      { key: 'url', label: 'Link URL', type: 'text', placeholder: 'https://...' },
      { key: 'style', label: 'Style', type: 'select', options: [
        { value: 'primary', label: 'Primary (Yellow)' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'outline', label: 'Outline' }
      ]}
    ]
  }
]

// Predefined layouts for quick slide creation
export const slideLayouts = {
  single: {
    name: 'Single Focus',
    description: 'One main element centered',
    positions: [
      { x: 10, y: 10, width: 80, height: 80 }
    ]
  },
  split: {
    name: 'Split Screen',
    description: 'Two elements side by side',
    positions: [
      { x: 5, y: 10, width: 40, height: 80 },
      { x: 55, y: 10, width: 40, height: 80 }
    ]
  },
  grid: {
    name: 'Grid Layout',
    description: 'Four equal quadrants',
    positions: [
      { x: 5, y: 5, width: 40, height: 40 },
      { x: 55, y: 5, width: 40, height: 40 },
      { x: 5, y: 55, width: 40, height: 40 },
      { x: 55, y: 55, width: 40, height: 40 }
    ]
  },
  focus: {
    name: 'Focus with Support',
    description: 'Main element with supporting content',
    positions: [
      { x: 20, y: 10, width: 60, height: 50 },
      { x: 10, y: 70, width: 80, height: 20 }
    ]
  },
  custom: {
    name: 'Custom Layout',
    description: 'Drag and position elements freely',
    positions: []
  }
}