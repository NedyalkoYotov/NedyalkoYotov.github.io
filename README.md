# Medicine Dosage Calculator 💊

A simple, user-friendly web application for calculating liquid medication dosages based on suspension concentration and patient weight.

## Features

- **Easy-to-use interface** with clear input fields
- **Real-time validation** to prevent calculation errors
- **Responsive design** that works on desktop and mobile
- **Medical-themed UI** with professional styling

## How to Use

1. **Open `index.html`** in your web browser
2. **Enter the medication concentration** (e.g., 100mg per 5ml)
3. **Enter the patient's weight** in kilograms
4. **Enter the prescribed dosage** per kg of body weight
5. **Click "Calculate Dosage"** to get the volume to administer

## Example Calculation

- **Medication**: 100mg per 5ml
- **Patient weight**: 20kg
- **Prescribed dose**: 10mg/kg
- **Result**: 10ml to administer

## Formula

```
Total Dose (mg) = Patient Weight (kg) × Dosage per kg (mg/kg)
Volume to Administer (ml) = Total Dose (mg) ÷ Concentration (mg/ml)
```

Where:
- Concentration (mg/ml) = Suspension Concentration (mg) ÷ Volume per dose (ml)

## Files

- `index.html` - Main HTML structure
- `style.css` - CSS styling and responsive design
- `script.js` - JavaScript calculation logic and validation

## Safety Notice

⚠️ **This calculator is for educational purposes only. Always consult with a healthcare professional for medical decisions.**

## Browser Compatibility

Works in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Development

To modify or extend the calculator:

1. Edit `index.html` for structure changes
2. Modify `style.css` for styling updates
3. Update `script.js` for calculation logic changes

The application uses vanilla JavaScript with no external dependencies.
