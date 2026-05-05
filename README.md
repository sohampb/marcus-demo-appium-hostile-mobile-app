# Marcus Demo Appium-Hostile Mobile App

This repository is a standalone React Native / Expo sample built to reproduce a mobile automation scenario that is intentionally unfriendly to classic Appium element discovery.

## Purpose

The app demonstrates a realistic but minimal banking journey while introducing the constraints requested for feasibility checking:

- the full visible app is wrapped in a top-level `TouchableWithoutFeedback`
- controls do not expose `testID`, `accessibilityLabel`, `nativeID`, or custom automation hooks
- the flow remains human-usable and visually understandable

## Demo flow

1. Login with:
   - Username: `demouser`
   - Password: `password`
2. Land on `Banking Home`
3. Open a transfer scenario and submit a simple transfer

## Hostile traits included

- Top-level `TouchableWithoutFeedback` wrapping the application content
- Nested layout containers that reduce the value of naive hierarchy-based selectors
- Inputs and actions rely on visible text and position rather than automation-friendly metadata
- Important tappable containers are marked `accessible={false}` to make the accessibility tree less cooperative
- Inputs are wrapped in extra anonymous shells so the visual target and the direct input node are less neatly aligned

## Why this version is useful

This keeps the proof focused on the automation engine rather than backend stability, OTP handling, or network variability. It is appropriate for recordings and customer-facing feasibility evidence.

## Run locally

```bash
npm install
npm start
```

Then open in Expo Go, an emulator, or a simulator.
