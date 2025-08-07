# e-Bantek Component Library

A comprehensive React component library built using **Atomic Design** principles for the e-Bantek platform.

## 🏗️ Architecture

### Atomic Design Structure

```
src/components/
├── atoms/           # Basic building blocks
├── molecules/       # Simple combinations of atoms
├── organisms/       # Complex UI sections
├── templates/       # Page-level layouts
├── placeholders/    # Placeholder components
└── examples/        # Component showcase
```

## 🔧 Components

### Atoms (Basic Building Blocks)

#### Button
Versatile button component with multiple variants and states.

```jsx
import { Button } from '@/components';

<Button variant="primary" size="medium" onClick={handleClick}>
  Click me
</Button>
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost' | 'link'`
- `size`: `'small' | 'medium' | 'large'`
- `disabled`: `boolean`
- `loading`: `boolean`
- `icon`: `ReactNode`
- `fullWidth`: `boolean`

#### Input
Styled input component with icons and validation states.

```jsx
import { Input } from '@/components';

<Input
  type="email"
  placeholder="Enter email"
  leftIcon={<Icon name="mail" />}
  error={!!errors.email}
  helperText={errors.email}
/>
```

**Props:**
- `type`: `'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'`
- `size`: `'small' | 'medium' | 'large'`
- `variant`: `'default' | 'filled' | 'outlined'`
- `leftIcon` / `rightIcon`: `ReactNode`
- `error` / `success`: `boolean`

#### Typography
Consistent text rendering with semantic variants.

```jsx
import { Typography } from '@/components';

<Typography variant="h1" color="primary" align="center">
  Main Heading
</Typography>
```

**Props:**
- `variant`: `'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline'`
- `color`: `'default' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'info'`
- `align`: `'left' | 'center' | 'right' | 'justify'`
- `weight`: `'light' | 'regular' | 'medium' | 'semibold' | 'bold'`

#### Icon
SVG icon component with built-in icon library.

```jsx
import { Icon } from '@/components';

<Icon name="search" size="medium" color="primary" />
```

**Available Icons:**
- **Navigation**: `menu`, `close`, `chevron-left`, `chevron-right`, `chevron-up`, `chevron-down`
- **Actions**: `plus`, `minus`, `edit`, `trash`, `search`, `filter`
- **Status**: `check`, `check-circle`, `x-circle`, `alert-circle`, `info`
- **Communication**: `mail`, `phone`, `bell`
- **Files**: `file`, `download`, `upload`
- **Settings**: `settings`, `user`, `users`
- **Business**: `building`, `chart`, `dollar`

#### Loading
Multiple loading animations for different use cases.

```jsx
import { Loading } from '@/components';

<Loading variant="spinner" size="medium" text="Loading..." />
```

**Props:**
- `variant`: `'spinner' | 'dots' | 'pulse' | 'bars' | 'skeleton'`
- `size`: `'small' | 'medium' | 'large'`
- `fullScreen`: `boolean`
- `overlay`: `boolean`

### Molecules (Component Combinations)

#### FormField
Input with integrated label and validation.

```jsx
import { FormField } from '@/components';

<FormField
  label="Email Address"
  required
  type="email"
  placeholder="Enter your email"
  error={errors.email}
  helperText="We'll never share your email"
/>
```

#### Card
Flexible container for content with header, body, and footer sections.

```jsx
import { Card } from '@/components';

<Card
  title="Card Title"
  subtitle="Optional subtitle"
  headerActions={<Button size="small">Edit</Button>}
  footer={<Button fullWidth>Action</Button>}
  hover
  clickable
>
  Card content goes here
</Card>
```

**Props:**
- `variant`: `'default' | 'outlined' | 'elevated' | 'flat'`
- `padding`: `'none' | 'small' | 'default' | 'large'`
- `hover`: `boolean`
- `clickable`: `boolean`

### Organisms (Complex Components)

#### Header
Main navigation header with responsive design.
- Responsive navigation with mobile menu
- User dropdown and notifications
- Service-based dropdown menus

#### Sidebar
Collapsible sidebar navigation.
- Expandable service sections
- Icon-based navigation when collapsed
- Mobile-friendly overlay

### Templates (Layout Components)

#### AppLayout
Main application layout combining Header and Sidebar.
- Responsive behavior
- Mobile sidebar overlay
- Toast notification container

## 🎨 Design System Integration

All components are built using the design system variables:

```css
/* Colors */
--color-primary-600
--color-secondary-600
--text-primary
--bg-primary

/* Typography */
--font-sans
--text-base
--font-medium

/* Spacing */
--space-4
--space-6

/* Borders & Effects */
--radius-lg
--shadow-md
--transition-colors
```

## 📱 Responsive Design

Components follow mobile-first responsive design:

- **Mobile**: `< 640px`
- **Tablet**: `640px - 1023px`  
- **Desktop**: `≥ 1024px`

## ♿ Accessibility

All components include accessibility features:

- **Keyboard Navigation**: Tab, Enter, Space, Arrow keys
- **Screen Readers**: ARIA labels, roles, and descriptions
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG 2.1 AA compliant
- **Motion**: Respects `prefers-reduced-motion`

## 🌗 Dark Mode

Components support automatic dark mode via CSS media queries:

```css
@media (prefers-color-scheme: dark) {
  /* Dark mode styles */
}
```

## 🚀 Usage Examples

### Basic Form
```jsx
import { FormField, Button, Card } from '@/components';

const LoginForm = () => (
  <Card title="Login" padding="large">
    <form>
      <FormField
        label="Email"
        type="email"
        required
        leftIcon={<Icon name="mail" />}
      />
      <FormField
        label="Password"
        type="password"
        required
        leftIcon={<Icon name="lock" />}
      />
      <Button type="submit" fullWidth>
        Login
      </Button>
    </form>
  </Card>
);
```

### Loading States
```jsx
import { Loading, Button } from '@/components';

const DataTable = ({ loading, data }) => (
  <Card title="Data">
    {loading ? (
      <Loading variant="skeleton" />
    ) : (
      <div>{/* data content */}</div>
    )}
  </Card>
);
```

### Status Messages
```jsx
import { Typography, Icon } from '@/components';

const StatusMessage = ({ type, message }) => (
  <div className={`status-${type}`}>
    <Icon 
      name={type === 'success' ? 'check-circle' : 'alert-circle'} 
      color={type} 
    />
    <Typography variant="body2" color={type}>
      {message}
    </Typography>
  </div>
);
```

## 📊 Component Showcase

Visit `/app/components` to see all components in action with interactive examples.

## 🔧 Development

### Adding New Components

1. **Create component folder**: `src/components/atoms/NewComponent/`
2. **Add component files**:
   - `NewComponent.jsx` - Main component
   - `NewComponent.css` - Styles using design system
   - `index.js` - Export
3. **Export in category index**: `src/components/atoms/index.js`
4. **Export in main index**: `src/components/index.js`
5. **Add to showcase**: `src/components/examples/ComponentShowcase.jsx`

### Component Checklist

- ✅ Uses design system variables
- ✅ PropTypes validation
- ✅ Responsive design (mobile-first)
- ✅ Accessibility features
- ✅ Dark mode support
- ✅ Loading and error states
- ✅ Keyboard navigation
- ✅ Focus management

## 🎯 Best Practices

1. **Composition over Configuration**: Use smaller components to build larger ones
2. **Design System First**: Always use CSS variables over hardcoded values  
3. **Accessibility by Default**: Include ARIA attributes and keyboard support
4. **Mobile First**: Design for mobile, enhance for desktop
5. **Performance**: Use React.memo() for expensive components
6. **Testing**: Add unit tests for complex logic
7. **Documentation**: Update this README when adding components

## 📦 Build Output

Current bundle sizes:
- **CSS**: 80KB (13KB gzipped)
- **JS**: 318KB (97KB gzipped)

## 🎉 Usage in Service Modules

Components are designed to be used throughout the 7 service modules:

```jsx
// Service module example
import { Card, Button, FormField, Loading, Typography } from '@/components';

const ServiceModule = () => (
  <div className="service-module">
    <Typography variant="h3">Perhitungan Nilai Sisa</Typography>
    
    <Card title="Input Data">
      <FormField label="Asset Value" type="number" required />
      <FormField label="Depreciation Rate" type="number" />
      <Button type="submit" fullWidth loading={isCalculating}>
        Calculate
      </Button>
    </Card>
    
    {isLoading && <Loading variant="skeleton" />}
  </div>
);
```

This component library provides everything needed to build consistent, accessible, and performant user interfaces across the entire e-Bantek platform! 🚀