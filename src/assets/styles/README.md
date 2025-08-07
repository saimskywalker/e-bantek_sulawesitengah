# e-Bantek Design System

## Overview

This design system provides a comprehensive set of CSS variables and utility classes for consistent styling across the e-Bantek platform.

## File Structure

```
src/assets/styles/
├── variables.css       # Core CSS variables (colors, typography, spacing, etc.)
├── globals.css         # Global styles, reset, and utility classes
├── themes/
│   └── default.css     # Default theme configuration
└── README.md          # This documentation
```

## Usage

The design system is automatically imported through `src/index.css`:

```css
@import './assets/styles/globals.css';
@import './assets/styles/themes/default.css';
```

## CSS Variables

### Colors

- **Primary**: `--color-primary-50` through `--color-primary-950`
- **Secondary**: `--color-secondary-50` through `--color-secondary-950`
- **Neutral**: `--color-neutral-0` through `--color-neutral-950`
- **Semantic**: Success, Warning, Error, Info variants

### Typography

- **Font Families**: `--font-sans`, `--font-mono`
- **Font Sizes**: `--text-xs` through `--text-6xl`
- **Font Weights**: `--font-light` through `--font-bold`
- **Line Heights**: `--leading-none` through `--leading-loose`

### Spacing

Based on 8px grid system:
- `--space-1` (4px) through `--space-32` (128px)

### Layout

- **Containers**: `--max-w-xs` through `--max-w-7xl`
- **Border Radius**: `--radius-none` through `--radius-full`
- **Shadows**: `--shadow-sm` through `--shadow-2xl`
- **Z-Index**: `--z-0` through `--z-toast`

## Semantic Variables

Theme-aware variables that adapt to different themes:

```css
--text-primary      /* Primary text color */
--text-secondary    /* Secondary text color */
--bg-primary        /* Primary background */
--bg-secondary      /* Secondary background */
--border-primary    /* Primary border color */
```

## Service Module Themes

Each service module has dedicated theme variables:

```css
.service-assessment  { --service-color: blue; }
.service-financing   { --service-color: cyan; }
.service-technical   { --service-color: green; }
.service-research    { --service-color: orange; }
.service-management  { --service-color: red; }
```

## Utility Classes

### Layout
- `.container` - Responsive container with max-width
- `.flex`, `.flex-col`, `.grid` - Display utilities
- `.items-center`, `.justify-center` - Flexbox alignment

### Typography
- `.text-center`, `.text-left`, `.text-right` - Text alignment
- `.font-medium`, `.font-semibold`, `.font-bold` - Font weights

### Spacing
- `.mt-1`, `.mt-2`, `.mt-4`, `.mt-8` - Margin top
- `.mb-1`, `.mb-2`, `.mb-4`, `.mb-8` - Margin bottom
- `.p-2`, `.p-4`, `.p-6`, `.p-8` - Padding

### Colors
- `.text-primary`, `.text-secondary` - Text colors
- `.text-success`, `.text-warning`, `.text-error` - Status colors
- `.bg-primary`, `.bg-secondary` - Background colors

### Borders
- `.border`, `.border-t`, `.border-b` - Border utilities
- `.rounded`, `.rounded-md`, `.rounded-lg` - Border radius

### Shadows
- `.shadow`, `.shadow-md`, `.shadow-lg` - Box shadow utilities

## Component Themes

### Navigation
```css
.nav-theme {
  background-color: var(--nav-bg);
  color: var(--nav-text);
}
```

### Sidebar
```css
.sidebar-theme {
  background-color: var(--sidebar-bg);
  color: var(--sidebar-text);
}
```

### Cards
```css
.card-theme {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
}
```

## Dark Mode

The design system includes dark mode support through CSS media queries:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: var(--color-neutral-900);
    --text-primary: var(--color-neutral-0);
    /* ... other dark mode overrides */
  }
}
```

## Responsive Design

The system uses mobile-first responsive design with breakpoints:

- Mobile: `< 640px`
- Tablet: `640px - 1023px`
- Desktop: `≥ 1024px`

## Usage Examples

### Using CSS Variables
```css
.my-component {
  background-color: var(--bg-primary);
  color: var(--text-secondary);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-base);
}
```

### Using Utility Classes
```jsx
<div className="container p-6">
  <h1 className="text-center font-bold text-primary">Title</h1>
  <div className="card-theme rounded-lg shadow-md p-4 mt-4">
    <p className="text-secondary">Content</p>
  </div>
</div>
```

### Service Module Styling
```jsx
<div className="service-assessment">
  <span className="service-badge">Assessment Service</span>
</div>
```

## Best Practices

1. **Use CSS Variables**: Always prefer CSS variables over hardcoded values
2. **Semantic Colors**: Use semantic variables (`--text-primary`) over specific colors (`--color-neutral-900`)
3. **Consistent Spacing**: Use the 8px grid system (`--space-*` variables)
4. **Utility Classes**: Use utility classes for common patterns
5. **Component Themes**: Apply theme classes to components for consistency
6. **Responsive Design**: Use mobile-first approach with media queries

## Adding New Themes

To add a new theme, create a new file in `themes/` and override the theme-specific variables:

```css
/* themes/dark.css */
:root {
  --nav-bg: var(--color-neutral-800);
  --nav-text: var(--color-neutral-200);
  /* ... other theme overrides */
}
```

Then import it in your component or conditionally in `index.css`.