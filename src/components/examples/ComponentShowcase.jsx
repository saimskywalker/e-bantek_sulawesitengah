import { useState } from 'react';
import {
  Button,
  Input,
  Typography,
  Icon,
  Loading,
  FormField,
  Card
} from '../index';
import './ComponentShowcase.css';

const ComponentShowcase = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div className="component-showcase">
      <div className="showcase-header">
        <Typography variant="h1" align="center">
          e-Bantek Component Library
        </Typography>
        <Typography variant="subtitle1" color="secondary" align="center">
          Atomic Design System Components
        </Typography>
      </div>

      {/* Typography Examples */}
      <Card title="Typography" className="showcase-section">
        <div className="typography-examples">
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="h4">Heading 4</Typography>
          <Typography variant="h5">Heading 5</Typography>
          <Typography variant="h6">Heading 6</Typography>
          <Typography variant="subtitle1">Subtitle 1</Typography>
          <Typography variant="subtitle2">Subtitle 2</Typography>
          <Typography variant="body1">Body 1 - Regular text content</Typography>
          <Typography variant="body2">Body 2 - Smaller text content</Typography>
          <Typography variant="caption">Caption text</Typography>
          <Typography variant="overline">Overline text</Typography>
        </div>
      </Card>

      {/* Button Examples */}
      <Card title="Buttons" className="showcase-section">
        <div className="button-grid">
          <div className="button-group">
            <Typography variant="subtitle2" weight="semibold">Variants</Typography>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="error">Error</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link Button</Button>
          </div>
          
          <div className="button-group">
            <Typography variant="subtitle2" weight="semibold">Sizes</Typography>
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </div>
          
          <div className="button-group">
            <Typography variant="subtitle2" weight="semibold">With Icons</Typography>
            <Button icon={<Icon name="plus" size="small" />}>Add Item</Button>
            <Button 
              icon={<Icon name="download" size="small" />}
              iconPosition="right"
              variant="secondary"
            >
              Download
            </Button>
          </div>
          
          <div className="button-group">
            <Typography variant="subtitle2" weight="semibold">States</Typography>
            <Button disabled>Disabled</Button>
            <Button loading onClick={handleLoadingDemo}>
              {isLoading ? 'Loading...' : 'Click for Loading'}
            </Button>
            <Button fullWidth variant="secondary">Full Width</Button>
          </div>
        </div>
      </Card>

      {/* Input Examples */}
      <Card title="Inputs" className="showcase-section">
        <div className="input-examples">
          <div className="input-row">
            <Input 
              placeholder="Basic input" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input 
              placeholder="With left icon" 
              leftIcon={<Icon name="search" size="small" />}
            />
            <Input 
              placeholder="With right icon" 
              rightIcon={<Icon name="mail" size="small" />}
            />
          </div>
          
          <div className="input-row">
            <Input 
              placeholder="Small size" 
              size="small"
            />
            <Input 
              placeholder="Medium size (default)" 
              size="medium"
            />
            <Input 
              placeholder="Large size" 
              size="large"
            />
          </div>
          
          <div className="input-row">
            <Input 
              placeholder="Error state" 
              error
              helperText="This field has an error"
            />
            <Input 
              placeholder="Success state" 
              success
              helperText="This field is valid"
            />
            <Input 
              placeholder="Disabled state" 
              disabled
            />
          </div>
        </div>
      </Card>

      {/* FormField Examples */}
      <Card title="Form Fields" className="showcase-section">
        <div className="form-examples">
          <FormField
            label="Email Address"
            required
            type="email"
            placeholder="Enter your email"
          />
          
          <FormField
            label="Password"
            required
            type="password"
            placeholder="Enter your password"
            helperText="Must be at least 8 characters"
          />
          
          <FormField
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone"
            leftIcon={<Icon name="phone" size="small" />}
          />
          
          <FormField
            label="Search"
            type="search"
            placeholder="Search..."
            leftIcon={<Icon name="search" size="small" />}
            error="No results found"
          />
        </div>
      </Card>

      {/* Icon Examples */}
      <Card title="Icons" className="showcase-section">
        <div className="icon-examples">
          <div className="icon-group">
            <Typography variant="subtitle2" weight="semibold">Navigation</Typography>
            <div className="icon-row">
              <Icon name="menu" />
              <Icon name="close" />
              <Icon name="chevron-left" />
              <Icon name="chevron-right" />
              <Icon name="chevron-up" />
              <Icon name="chevron-down" />
            </div>
          </div>
          
          <div className="icon-group">
            <Typography variant="subtitle2" weight="semibold">Actions</Typography>
            <div className="icon-row">
              <Icon name="plus" />
              <Icon name="minus" />
              <Icon name="edit" />
              <Icon name="trash" />
              <Icon name="search" />
              <Icon name="filter" />
            </div>
          </div>
          
          <div className="icon-group">
            <Typography variant="subtitle2" weight="semibold">Status</Typography>
            <div className="icon-row">
              <Icon name="check" color="success" />
              <Icon name="check-circle" color="success" />
              <Icon name="x-circle" color="error" />
              <Icon name="alert-circle" color="warning" />
              <Icon name="info" color="info" />
            </div>
          </div>
          
          <div className="icon-group">
            <Typography variant="subtitle2" weight="semibold">Sizes</Typography>
            <div className="icon-row">
              <Icon name="settings" size="small" />
              <Icon name="settings" size="medium" />
              <Icon name="settings" size="large" />
              <Icon name="settings" size="xl" />
            </div>
          </div>
        </div>
      </Card>

      {/* Loading Examples */}
      <Card title="Loading States" className="showcase-section">
        <div className="loading-examples">
          <div className="loading-row">
            <div className="loading-demo">
              <Typography variant="caption">Spinner</Typography>
              <Loading variant="spinner" />
            </div>
            <div className="loading-demo">
              <Typography variant="caption">Dots</Typography>
              <Loading variant="dots" />
            </div>
            <div className="loading-demo">
              <Typography variant="caption">Pulse</Typography>
              <Loading variant="pulse" />
            </div>
            <div className="loading-demo">
              <Typography variant="caption">Bars</Typography>
              <Loading variant="bars" />
            </div>
          </div>
          
          <div className="loading-demo">
            <Typography variant="caption">Skeleton</Typography>
            <Loading variant="skeleton" />
          </div>
          
          <div className="loading-row">
            <div className="loading-demo">
              <Typography variant="caption">Small</Typography>
              <Loading size="small" />
            </div>
            <div className="loading-demo">
              <Typography variant="caption">Medium</Typography>
              <Loading size="medium" />
            </div>
            <div className="loading-demo">
              <Typography variant="caption">Large</Typography>
              <Loading size="large" />
            </div>
          </div>
        </div>
      </Card>

      {/* Card Examples */}
      <Card title="Cards" className="showcase-section">
        <div className="card-examples">
          <Card
            title="Basic Card"
            subtitle="This is a subtitle"
            padding="default"
          >
            <Typography variant="body1">
              This is the card content area. It can contain any type of content.
            </Typography>
          </Card>
          
          <Card
            title="Card with Actions"
            headerActions={
              <Button size="small" variant="ghost" icon={<Icon name="settings" size="small" />} />
            }
            footer={
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button size="small" variant="secondary">Cancel</Button>
                <Button size="small">Save</Button>
              </div>
            }
          >
            <Typography variant="body2">
              This card has header actions and a footer.
            </Typography>
          </Card>
          
          <Card
            title="Clickable Card"
            subtitle="Hover me!"
            clickable
            hover
            onClick={() => alert('Card clicked!')}
          >
            <Typography variant="body2">
              This card is clickable and has hover effects.
            </Typography>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default ComponentShowcase;