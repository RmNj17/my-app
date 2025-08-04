# Language Change Feature Documentation

## Overview

This document describes the internationalization (i18n) feature implemented in the Ghumante Nepal application, allowing users to switch between English and Nepali languages.

## Features Implemented

### 1. Core i18n Setup

- **react-i18next**: Main internationalization library
- **i18next-browser-languagedetector**: Automatic language detection
- **Language persistence**: User's language preference is saved in localStorage

### 2. Supported Languages

- **English (en)**: Default language with flag 🇺🇸
- **Nepali (ne)**: Full Nepali translation with flag 🇳🇵

### 3. Components Updated

- **Hero Component**: Main landing page hero section
- **Destinations Component**: Popular destinations section
- **Navigation Component**: Main navigation bar with language selector
- **Login Page**: Authentication page with language support
- **Language Selector**: Dedicated component for language switching

## File Structure

```
src/
├── i18n/
│   ├── index.ts                 # i18n configuration
│   └── locales/
│       ├── en.json              # English translations
│       └── ne.json              # Nepali translations
├── components/
│   ├── LanguageSelector.tsx     # Language switcher component
│   └── Navigation.tsx           # Updated navigation with language selector
├── contexts/
│   └── LanguageContext.tsx      # Language context provider
└── pages/
    ├── home/Homepage.tsx        # Updated homepage
    └── login/LoginPage.tsx      # Updated login page
```

## Usage

### Language Selector Component

```tsx
import LanguageSelector from './components/LanguageSelector';

// Basic usage
<LanguageSelector />

// With custom styling
<LanguageSelector
  size="small"
  className="custom-class"
  style={{ width: 120 }}
/>
```

### Using Translations in Components

```tsx
import { useTranslation } from "react-i18next";

const MyComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("hero.title")}</h1>
      <p>{t("hero.description")}</p>
    </div>
  );
};
```

## Translation Keys Structure

### Navigation

- `navigation.home` - Home
- `navigation.guides` - Guides
- `navigation.login` - Login
- `navigation.signup` - Sign Up
- `navigation.dashboard` - Dashboard
- `navigation.logout` - Logout

### Hero Section

- `hero.title` - Main title
- `hero.subtitle` - Subtitle (Nepal)
- `hero.description` - Hero description
- `hero.findGuide` - Find guide button
- `hero.exploreDestinations` - Explore destinations button

### Authentication

- `auth.login` - Login
- `auth.email` - Email
- `auth.password` - Password
- `auth.loginButton` - Login button
- `auth.signup` - Sign Up

### Destinations

- `destinations.title` - Popular Destinations
- `destinations.subtitle` - Section subtitle
- `destinations.kathmandu.name` - Kathmandu
- `destinations.kathmandu.description` - Kathmandu description
- (Similar structure for other destinations)

### Common Elements

- `common.loading` - Loading...
- `common.error` - Error
- `common.success` - Success
- `common.save` - Save
- `common.cancel` - Cancel

## Language Detection

The system automatically detects the user's preferred language in this order:

1. **localStorage**: Previously saved language preference
2. **Cookie**: Language saved in browser cookies
3. **HTML tag**: Browser's default language
4. **Fallback**: English (en) as default

## Adding New Languages

### 1. Create Translation File

Create a new JSON file in `src/i18n/locales/[language-code].json`

### 2. Update i18n Configuration

```typescript
// src/i18n/index.ts
import newLanguage from "./locales/[language-code].json";

const resources = {
  en: { translation: en },
  ne: { translation: ne },
  [languageCode]: { translation: newLanguage }, // Add new language
};
```

### 3. Update Language Selector

```tsx
// src/components/LanguageSelector.tsx
<Option value="[language-code]">
  <span className="flex items-center gap-2">
    [flag] {t("language.[languageName]")}
  </span>
</Option>
```

## Browser Support

- All modern browsers that support ES6+
- localStorage support required for language persistence
- No Internet Explorer support

## Performance Notes

- Translation files are loaded on initial app load
- Language switching is instant (no additional network requests)
- Minimal bundle size impact (~15KB for translation files)

## Best Practices

### 1. Translation Keys

- Use nested keys for organization: `section.subsection.key`
- Keep keys descriptive and consistent
- Avoid hardcoded strings in components

### 2. Pluralization

Use i18next pluralization for count-dependent strings:

```json
{
  "items": "{{count}} item",
  "items_plural": "{{count}} items"
}
```

### 3. Interpolation

Use interpolation for dynamic values:

```json
{
  "welcome": "Welcome, {{name}}!"
}
```

```tsx
t("welcome", { name: user.name });
```

## Testing

- Test language switching functionality
- Verify all translated strings display correctly
- Check language persistence across browser sessions
- Test with both LTR (English) and RTL-aware content

## Future Enhancements

- Add more languages (Hindi, Chinese, etc.)
- Implement date/time localization
- Add number formatting per locale
- Implement pluralization rules for Nepali
- Add right-to-left (RTL) language support
