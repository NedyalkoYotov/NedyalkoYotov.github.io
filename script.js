// Medicine Dosage Calculator JavaScript

// Language data
const translations = {
    en: {
        title: "💊 Medicine Dosage Calculator",
        subtitle: "Calculate the correct dosage for liquid medications",
        concentration_label: "Medicine Concentration",
        weight_label: "Patient Weight",
        dosage_label: "Prescribed Dosage",
        calculate_btn: "Calculate Dosage",
        error_message: "Please check your inputs. All fields must be filled with positive numbers.",
        results_title: "Calculation Results",
        strength_label: "Strength per ml:",
        total_mg_label: "Total mg needed:",
        required_ml_label: "Required ml per dose:",
        final_result: "The patient needs {ml} ml per day."
    },
    bg: {
        title: "💊 Калкулатор за Дозировка на Лекарства",
        subtitle: "Изчислете правилната дозировка за течни лекарства",
        concentration_label: "Концентрация на Лекарството",
        weight_label: "Тегло на Пациента",
        dosage_label: "Предписана Дозировка",
        calculate_btn: "Изчисли Дозировка",
        error_message: "Моля проверете въведените данни. Всички полета трябва да бъдат попълнени с положителни числа.",
        results_title: "Резултати от Изчислението",
        strength_label: "Сила на мл:",
        total_mg_label: "Общо необходими мг:",
        required_ml_label: "Необходими мл на доза:",
        final_result: "Пациентът се нуждае от {ml} мл на ден."
    }
};

// Current language
let currentLang = 'bg';

// Initialize language functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    setupLanguageButtons();
});

function initializeLanguage() {
    // Set initial language
    updateLanguage('bg');
}

function setupLanguageButtons() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            updateLanguage(lang);
            
            // Update active button
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function updateLanguage(lang) {
    currentLang = lang;
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (key === 'final_result') {
                // Keep the final result template for dynamic updates
                element.setAttribute('data-template', translations[lang][key]);
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

document.getElementById('dosageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Hide previous results and errors
    document.getElementById('results').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    
    // Get input values
    const concentration = parseFloat(document.getElementById('concentration').value);
    const volume = parseFloat(document.getElementById('volume').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const dosage = parseFloat(document.getElementById('dosage').value);
    
    // Validate inputs
    if (!validateInputs(concentration, volume, weight, dosage)) {
        document.getElementById('error').style.display = 'block';
        return;
    }
    
    // Calculate dosage
    const results = calculateDosage(concentration, volume, weight, dosage);
    
    // Display results
    displayResults(results);
});

function validateInputs(concentration, volume, weight, dosage) {
    // Check if all values are valid numbers
    if (isNaN(concentration) || isNaN(volume) || isNaN(weight) || isNaN(dosage)) {
        return false;
    }
    
    // Check if all values are positive
    if (concentration <= 0 || volume <= 0 || weight <= 0 || dosage <= 0) {
        return false;
    }
    
    return true;
}

function calculateDosage(concentration, volume, weight, dosagePerKg) {
    // Step 1: Convert suspension to mg per 1 ml
    const strengthPerMl = concentration / volume;
    
    // Step 2: Calculate total required mg
    const totalMg = weight * dosagePerKg;
    
    // Step 3: Calculate how many ml the patient needs
    const requiredMl = totalMg / strengthPerMl;
    
    return {
        strengthPerMl: strengthPerMl,
        totalMg: totalMg,
        requiredMl: requiredMl
    };
}

function displayResults(results) {
    // Round to appropriate decimal places
    const strengthPerMl = Math.round(results.strengthPerMl * 100) / 100;
    const totalMg = Math.round(results.totalMg * 10) / 10;
    const requiredMl = Math.round(results.requiredMl * 100) / 100;
    
    // Update result elements
    document.getElementById('strengthPerMl').textContent = strengthPerMl + ' mg/ml';
    document.getElementById('totalMg').textContent = totalMg + ' mg';
    document.getElementById('requiredMl').textContent = requiredMl + ' ml';
    
    // Update final result with translation
    const finalResultElement = document.getElementById('finalResult');
    const template = finalResultElement.getAttribute('data-template') || translations[currentLang].final_result;
    finalResultElement.textContent = template.replace('{ml}', requiredMl);
    
    // Show results
    document.getElementById('results').style.display = 'block';
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}


// Real-time input validation
const inputs = document.querySelectorAll('input[type="number"]');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        // Remove any non-numeric characters except decimal point
        this.value = this.value.replace(/[^0-9.]/g, '');
        
        // Ensure only one decimal point
        const parts = this.value.split('.');
        if (parts.length > 2) {
            this.value = parts[0] + '.' + parts.slice(1).join('');
        }
        
        // Clear error when user starts typing
        document.getElementById('error').style.display = 'none';
    });
});

// Console message for developers
console.log('💊 Medicine Dosage Calculator loaded successfully!');
