# Xbox Game Interface - App Hub

A modern, Xbox-inspired interface for managing and registering digital services, built with Next.js and Tailwind CSS.

## Features

### 🎮 Xbox-Style Design
- **Gaming Aesthetics**: Inspired by Xbox dashboard with smooth animations and visual effects
- **Card-Based Layout**: App cards with hover effects, scaling, and glow animations
- **Responsive Grid**: Adapts to different screen sizes (mobile, tablet, desktop)

### 🎯 Service Management
- **App Cards**: Each card represents a different digital service (Netflix, Spotify, Adobe, etc.)
- **Service Plans**: Multiple subscription tiers for each app
- **Registration Modal**: Interactive modal for service registration with form validation

### ✨ Interactive Elements
- **Hover Effects**: Cards scale, glow, and show additional information on hover
- **Smooth Animations**: CSS transitions and custom keyframe animations
- **Visual Feedback**: Loading states, success messages, and interactive elements

## Components

### XboxGameInterface
Main container component that manages the overall layout and state.

### AppCard
Individual app cards with:
- App icon and name
- Description
- Hover animations
- Click handlers for opening service modals

### ServiceRegistrationModal
Modal component for:
- Displaying available service plans
- Service selection
- Registration form
- Success confirmation

### UserProfile
User information display with:
- Profile picture
- Name and email
- Online status indicator

## Usage

### Main Page
Navigate to `/` to see the main interface (requires authentication)

### Demo Page
Navigate to `/demo` to see the interface without authentication (for testing)

### Adding New Apps
To add new apps, modify the `mockApps` array in `XboxGameInterface.tsx`:

```typescript
{
  id: "7",
  name: "New App",
  description: "App description",
  icon: "🚀",
  color: "from-yellow-500 to-orange-700",
  services: [
    { id: "1", name: "Basic", description: "Basic plan", price: "$9.99", duration: "month" }
  ]
}
```

### Customizing Colors
Each app uses Tailwind CSS color classes for gradients:
- `from-red-500 to-red-700` (Netflix)
- `from-green-500 to-green-700` (Spotify)
- `from-purple-500 to-purple-700` (Adobe)
- `from-blue-500 to-blue-700` (Microsoft 365)
- `from-indigo-500 to-indigo-700` (Dropbox)
- `from-teal-500 to-teal-700` (Zoom)

## Styling

### Tailwind CSS Classes
- **Gradients**: `bg-gradient-to-br`, `from-{color}-500 to-{color}-700`
- **Animations**: `transition-all`, `duration-300`, `ease-out`
- **Hover Effects**: `group-hover:`, `hover:`
- **Responsive**: `md:`, `lg:` breakpoints

### Custom CSS Animations
- `animate-fade-in-up`: Cards fade in from bottom
- `animate-glow-pulse`: Glowing effect for selected elements
- `animate-float`: Floating animation for interactive elements
- `animate-sparkle`: Sparkle effect for hover states

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- CSS custom properties (CSS variables)
- CSS backdrop-filter (for backdrop blur effects)

## Performance

- Lazy loading of components
- Optimized animations with `transform` and `opacity`
- Efficient state management with React hooks
- Minimal re-renders with proper dependency arrays

## Development

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Next.js 15+

### Installation
```bash
cd frontends/nextjs
npm install
```

### Running Development Server
```bash
npm run dev
```

The interface will be available at `http://localhost:3001`

### Building for Production
```bash
npm run build
npm start
```

## Customization

### Adding New Animations
Add new keyframes to `tailwind.css`:

```css
@keyframes custom-animation {
  from { /* start state */ }
  to { /* end state */ }
}

.animate-custom {
  animation: custom-animation 1s ease-in-out infinite;
}
```

### Modifying Card Layout
Update the grid classes in `XboxGameInterface.tsx`:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {/* Cards */}
</div>
```

### Changing Modal Behavior
Modify the `ServiceRegistrationModal` component to:
- Add new form fields
- Change validation logic
- Modify success behavior
- Add payment processing

## License

This project is part of the App Hub application suite.
