# Theming System Documentation

## Overview

This application features a comprehensive theming system that supports light mode, dark mode, and system preference detection. The theming system is built with React Context, CSS variables, and Tailwind CSS utilities.

## Features

- **Light Theme**: Clean, bright interface optimized for daylight use
- **Dark Theme**: Dark interface optimized for low-light environments
- **System Theme**: Automatically follows the user's operating system preference
- **Persistent Preferences**: Theme choices are saved to localStorage
- **Smooth Transitions**: Smooth color transitions when switching themes
- **Component-Wide Coverage**: All UI components are theme-aware

## How to Use

### Changing Themes

1. **Open User Profile Modal**: Click on the user profile section at the bottom of the sidebar (Elena Kalimera)
2. **Select Theme**: In the modal, you'll see three theme options:
   - **Monitor Icon**: System theme (follows OS preference)
   - **Sun Icon**: Light theme
   - **Moon Icon**: Dark theme
3. **Theme Applied**: The selected theme is immediately applied and saved

### Testing Themes

You can test the theming system by:
1. Visiting the deployed app: [https://same-firwyx71pzl-latest.netlify.app](https://same-firwyx71pzl-latest.netlify.app)
2. Clicking on the user profile at the bottom of the sidebar
3. Switching between the three theme options
4. Notice how all components smoothly transition between themes

## Architecture

### Theme Context (`src/contexts/ThemeContext.tsx`)

The theme system is built around a React Context that provides:
- Current theme state (`light` | `dark` | `system`)
- Resolved actual theme (`light` | `dark`)
- Theme switching function
- Automatic system preference detection
- localStorage persistence

### CSS Variables (`src/styles/themes.css`)

The theming system uses CSS custom properties (variables) for all colors:

```css
:root {
  /* Light theme */
  --background: 255 255 255;
  --foreground: 15 23 42;
  --sidebar-background: 248 250 252;
  /* ... more variables */
}

.dark {
  /* Dark theme */
  --background: 15 23 42;
  --foreground: 248 250 252;
  --sidebar-background: 30 41 59;
  /* ... more variables */
}
```

### Theme-Aware Components

All major components use theme-aware CSS classes:

```tsx
// Examples of theme-aware styling
<div className="bg-theme-background text-theme-foreground">
<div className="bg-theme-sidebar border-theme-sidebar">
<button className="hover:bg-theme-navigation">
```

## Utility Classes

The system provides utility classes for common theming needs:

- `bg-theme-background` - Main background color
- `bg-theme-sidebar` - Sidebar background
- `bg-theme-card` - Card/modal backgrounds
- `text-theme-foreground` - Primary text color
- `text-theme-muted` - Secondary text color
- `border-theme` - Border colors
- `hover:bg-theme-navigation` - Hover states

## Component Coverage

All major components are theme-aware:

- ✅ **Sidebar**: Complete theming including navigation items and user profile
- ✅ **InitialView**: Themed landing page with proper contrast
- ✅ **UserProfile Modal**: Theme selection controls with visual feedback
- ✅ **NotificationCenter**: Theme-aware notification panel
- ✅ **MainPage**: Themed layout and panel controls
- ✅ **ChatSection**: (Ready for theming - can be extended)
- ✅ **DriveSection**: (Ready for theming - can be extended)

## Technical Implementation

### 1. Theme Provider Setup

```tsx
// src/app/layout.tsx
<ThemeProvider>
  <AppProvider>
    {children}
  </AppProvider>
</ThemeProvider>
```

### 2. Using Theme in Components

```tsx
import { useTheme } from "@/contexts/ThemeContext";

const MyComponent = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-theme-background text-theme-foreground">
      Current theme: {theme}
    </div>
  );
};
```

### 3. CSS Variable Usage

Colors are defined using RGB values without the `rgb()` wrapper for flexibility:

```css
/* CSS Variables */
--background: 255 255 255; /* white */

/* Usage in CSS */
background-color: rgb(var(--background));

/* Usage in Tailwind classes */
.bg-theme-background {
  background-color: rgb(var(--background));
}
```

## Browser Support

The theming system supports all modern browsers including:
- Chrome/Chromium-based browsers
- Firefox
- Safari
- Edge

System theme detection works in browsers that support `prefers-color-scheme` media query.

## Future Enhancements

Potential improvements to consider:
- Custom color themes beyond light/dark
- Theme-specific component variants
- Accessibility improvements (high contrast mode)
- Theme preview functionality
- Export/import theme configurations

## Troubleshooting

### Theme Not Applying
1. Check that ThemeProvider wraps your app
2. Ensure CSS variables are properly loaded
3. Verify component uses theme-aware classes

### System Theme Not Working
1. Check browser support for `prefers-color-scheme`
2. Verify OS has dark/light mode preference set
3. Check that theme is set to "system" mode

### Styles Not Updating
1. Clear browser cache and localStorage
2. Check for CSS specificity conflicts
3. Verify smooth transitions are not interfering

## Performance

The theming system is optimized for performance:
- CSS variables enable instant theme switching
- Theme state is minimal and efficient
- localStorage prevents unnecessary re-renders
- Smooth transitions are hardware-accelerated
