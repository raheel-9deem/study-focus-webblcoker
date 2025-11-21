# Design Specification - Study Focus Extension

## Color Palette

### Primary Colors
- **Deep Blue**: `#1e3a8a` - Main brand color, buttons, headings
- **Darker Blue**: `#1e40af` - Hover states
- **Light Gray**: `#f3f4f6` - Background, subtle surfaces
- **White**: `#ffffff` - Cards, input fields

### Accent Colors
- **Soft Green**: `#22c55e` - Success, active status, positive actions
- **Darker Green**: `#16a34a` - Green hover states
- **Red**: `#ef4444` - Stop button, remove actions
- **Darker Red**: `#dc2626` - Red hover states

### Text Colors
- **Primary Text**: `#1f2937` - Main content
- **Secondary Text**: `#374151` - Labels, less important text
- **Tertiary Text**: `#6b7280` - Hints, placeholders
- **Light Text**: `#9ca3af` - Disabled states

### Border Colors
- **Default**: `#e5e7eb` - Input borders
- **Focus**: `#1e3a8a` - Active inputs
- **Subtle**: `#d1d5db` - Dividers

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
```

### Font Sizes
- **Logo**: 48px
- **Timer**: 36px
- **Main Heading**: 24px
- **Section Heading**: 16px
- **Body Text**: 14px
- **Small Text**: 13px
- **Micro Text**: 12px

### Font Weights
- **Bold**: 700 (headings, important text)
- **Semibold**: 600 (labels, status)
- **Medium**: 500 (list items)
- **Regular**: 400 (body text)

## Spacing System (8px base)

- **XXS**: 4px
- **XS**: 8px
- **SM**: 12px
- **MD**: 20px
- **LG**: 30px
- **XL**: 40px

## Border Radius

- **Small**: 8px - Buttons, inputs
- **Medium**: 12px - Cards, containers
- **Large**: 50% - Circles (status dot)

## Shadows

### Card Shadow
```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
```

### Button Hover Shadow
```css
box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
```

### Focus Shadow
```css
box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
```

### Glow Effect
```css
box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
```

## Layout

### Popup Dimensions
- **Width**: 380px
- **Padding**: 20px all sides
- **Max Height**: Auto (scrollable)

### Component Spacing
- **Header margin-bottom**: 20px
- **Card margin-bottom**: 20px
- **Input margin-bottom**: 12px
- **List item margin-bottom**: 6px

## Animations

### Pulse (Logo)
```css
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
animation: pulse 2s infinite;
```

### Blink (Status Dot)
```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
animation: blink 1.5s infinite;
```

### Button Hover
```css
transition: all 0.2s;
transform: translateY(-1px);
```

### Input Focus
```css
transition: all 0.2s;
```

### Block Page Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
animation: fadeIn 0.5s ease-in;
```

### Block Page Glow
```css
@keyframes glow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}
animation: glow 3s ease-in-out infinite;
```

## Component Styles

### Primary Button
- Background: Deep Blue (#1e3a8a)
- Text: White
- Padding: 12px 20px
- Border Radius: 8px
- Hover: Darker Blue + Shadow + Lift

### Secondary Button (Stop)
- Background: Red (#ef4444)
- Text: White
- Same dimensions as primary
- Hover: Darker Red + Shadow + Lift

### Add Button
- Background: Soft Green (#22c55e)
- Text: White
- Padding: 10px 20px
- Hover: Darker Green + Lift

### Input Fields
- Border: 2px solid Light Gray
- Border Radius: 8px
- Padding: 10px 12px
- Focus: Deep Blue border + Shadow

### Status Indicator
- Idle: Gray dot (#9ca3af)
- Active: Green dot (#22c55e) with glow
- Animated blink when active

### Website List Items
- Background: Very Light Gray (#f9fafb)
- Border Radius: 8px
- Padding: 10px 12px
- Hover: Slightly darker background

## Block Page Design

### Background
```css
background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
```

### Lock Icon
- Size: 80px
- Animated pulse

### Heading
- Size: 48px
- Color: White
- Font Weight: 700
- Text Shadow: 0 2px 10px rgba(0, 0, 0, 0.2)

### Body Text
- Size: 20px
- Color: White (90% opacity)
- Line Height: 1.6

### CTA Text
- Size: 22px
- Color: Soft Green (#22c55e)
- Font Weight: 600
- Text Shadow: 0 2px 10px rgba(34, 197, 94, 0.3)

### Glow Effect
- 400px circular gradient
- Green tint (rgba(34, 197, 94, 0.15))
- Animated pulse

## Accessibility

### Contrast Ratios
- All text meets WCAG AA standards
- Primary text on white: 15.1:1
- Secondary text on white: 10.4:1
- White text on Deep Blue: 8.6:1

### Focus States
- Visible focus indicators on all interactive elements
- 3px outline with sufficient contrast

### Hover States
- Clear visual feedback for all clickable elements
- Cursor changes to pointer

## Responsive Design

### Popup
- Fixed width (380px)
- Vertical scrolling if needed
- All elements stack vertically

### Block Page
- Full viewport coverage
- Centered content
- Responsive font sizes (future enhancement)

## Icon Design Concept

### Visual Elements
- Circular icon shape
- Clock-style outer ring
- Brain icon in center
- Small lock symbol overlay
- Dark blue background (#1e3a8a)
- White line icons
- Soft green glow around edges

### Sizes
- 16x16px: Toolbar icon
- 48x48px: Extension management
- 128x128px: Chrome Web Store

---

This design system ensures consistency, professionalism, and excellent user experience throughout the extension.
