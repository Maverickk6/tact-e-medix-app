# e_medix

This is a React Native application built with Expo, React Navigation, NativeWind (TailwindCSS), and Zustand.

## Getting Started

1.  **Install dependencies**:

    ```bash
    npm install
    ```

2.  **Start the app**:
    ```bash
    npx expo start
    ```

## Project Structure

- `src/assets`: Images, fonts, and icons.
- `src/components`: Reusable UI components.
- `src/navigation`: Navigation configuration (TabNavigator, AppNavigator).
- `src/screens`: Screen components (Home, Patients, Schedule, Records, Profile).
- `src/store`: Zustand state management stores.
- `src/types`: TypeScript definitions.
- `src/utils`: Helper functions.

## Features

- **Navigation**: Bottom Tab Navigation with custom styling.
- **Styling**: TailwindCSS via NativeWind.
- **State Management**: Zustand.
- **Fonts**: Poppins (Regular, Medium, Bold).
- **Theme**: Primary color `#20beb8`, Secondary color `#94a3b8`.

## Development

- **Add a new screen**: Create a component in `src/screens` and add it to `src/navigation/TabNavigator.tsx` (or a stack navigator).
- **Add a new store**: Create a store in `src/store`.
- **Styling**: Use `className` prop with Tailwind classes.
