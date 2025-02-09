document.addEventListener("DOMContentLoaded", () => {
    if ('ontouchstart' in document.documentElement) {
        document.body.classList.add('touch');
    }

    fetch('config/config.json')
        .then(response => response.json())
        .then(config => initializeConfig(config))
        .catch(error => console.error("Error fetching config:", error));

    document.getElementById("stationMineMode").addEventListener("change", toggleMineFields);

    document.addEventListener("submit", handleFormSubmit);

    showPage('timer');
});

document.addEventListener("DOMContentLoaded", () => {
    const explosionSlider = document.getElementById("explosionSlider");
    const explosionTimer = document.getElementById("explosionTimer");

    explosionTimer.textContent = explosionSlider.value;

    explosionSlider.addEventListener("input", function () {
        explosionTimer.textContent = this.value;
    });
});


function initializeConfig(config) {
    console.log("Config Loaded:", config);

    document.getElementById("name-logo").textContent = config['name-logo'];
    document.getElementById("img-logo").style.backgroundImage = `url(${config['img-logo']})`;

    updateInputValue("setupTimer", config['Налаштування, сек']);
    updateInputValue("explosionTimer", config['До взриву, сек']);
    updateInputValue("protectionTimer", config['Захист після включення, сек']);
    updateInputValue("restartTimer", config['Час перезапуску, сек']);

    const droneSettings = config['Поріг зчитання, G'];
    updateInputRange("readingThreshold", droneSettings);
    document.getElementById("thresholdValue").textContent = droneSettings.value;
    updateInputValue("overloadExplosionThreshold", config['Взрив при перегрузці, G']);
    document.getElementById("acDcModeToggle").checked = config['ac-dc-mode'] === 8;
    document.getElementById("autoExplosionToggle").checked = config['Автовибух по таймеру'] === 1;
    document.getElementById("serverDroneMode").checked = config['Режим сервера'] === true;
    updateHiddenField('serverDroneMode', 'serverDroneModeHidden');
    document.getElementById("logsDroneEnabled").checked = config['Логування даних'] === true;
    updateHiddenField('logsDroneEnabled', 'logsDroneEnabledHidden');

    document.getElementById("stationMineMode").checked = config['Режим міни'];
    updateInputValue("mineActivityThreshold", config['Поріг Активності, G']);
    updateInputValue("mineInactivityThreshold", config['Поріг Бездіяльності, G']);
    updateInputValue("mineInactivityTime", config['Час Бездіяльності, сек']);
    updateInputValue("mineTapThreshold", config['Загальний поріг дотику, G']);
    updateInputValue("mineTapDuration", config['Загальна тривалість дотику, мс']);
    updateInputValue("mineTapDelay", config['Загальна затримка дотику, мс']);

    updateSliderValue("explosionSlider", "explosionTimer");
    document.getElementById("explosionSlider").value = config['До взриву, сек'];
    document.getElementById("explosionTimer").textContent = config['До взриву, сек'];

    toggleMineFields();
}

function updateInputValue(id, value) {
    const element = document.getElementById(id);
    if (element) element.value = value;
}

function updateInputRange(id, settings) {
    const element = document.getElementById(id);
    const valueDisplay = document.getElementById('thresholdValue');

    if (element && settings) {
        element.value = settings.value;
        valueDisplay.textContent = settings.value;
    }
}

function updateSliderValue(sliderId, displayId) {
    const slider = document.getElementById(sliderId);
    const display = document.getElementById(displayId);
    if (slider && display) {
        display.textContent = slider.value;
        slider.addEventListener('input', () => {
            display.textContent = slider.value;
        });
    }
}

function toggleMineFields() {
    const isMineModeActive = document.getElementById("stationMineMode").checked;
    const mineFields = document.getElementById("mine-fields");
    mineFields.style.display = isMineModeActive ? "block" : "none";
}

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);
    const mappedData = mapFormDataToConfig(formData);

    fetch(form.action, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(mappedData)
    })
        .then(response => response.json())
        .then(data => handleFormResponse(data, form))
        .catch(error => {
            console.error("Error submitting form:", error);
            showToast("Помилка при надсиланні форми!");
        });
}

function mapFormDataToConfig(formData) {
    const fieldMapping = {
        'setupTimer': 'Налаштування, сек',
        'explosionTimer': 'До взриву, сек',
        'protectionTimer': 'Захист після включення, сек',
        'restartTimer': 'Час перезапуску, сек',
        'readingThreshold': 'Поріг зчитання, G',
        'overloadExplosionThreshold': 'Взрив при перегрузці, G',
        'stationMineModeHidden': 'Режим міни',
        'mineActivityThreshold': 'Поріг Активності, G',
        'mineInactivityThreshold': 'Поріг Бездіяльності, G',
        'mineInactivityTime': 'Час Бездіяльності, сек',
        'mineTapThreshold': 'Загальний поріг дотику, G',
        'mineTapDuration': 'Загальна тривалість дотику, мс',
        'mineTapDelay': 'Загальна затримка дотику, мс',
        'acDcModeHidden': 'ac-dc-mode',
        'autoExplosionHidden': 'Автовибух по таймеру',
        'logsDroneEnabledHidden': 'Логування даних',
        'serverDroneModeHidden': 'Режим сервера'
    };

    const mappedData = {};
    formData.forEach((value, key) => {
        if (fieldMapping[key]) {
            mappedData[fieldMapping[key]] = value;
        }
    });
    return mappedData;
}

function handleFormResponse(data, form) {
    console.log("Server Response:", data);
    const resultElement = document.getElementById(form.dataset.result);
    if (resultElement) {
        resultElement.innerHTML = JSON.stringify(data, null, 2);
    }
    showToast("Форма успішно надіслана!");
    form.reset();
}

function showPage(pageId) {
    event.preventDefault();

    const pages = document.querySelectorAll('.content-page');
    pages.forEach(page => page.classList.add('hide'));

    const activePage = document.getElementById(pageId);
    if (activePage) activePage.classList.remove('hide');

    const navLinks = document.querySelectorAll('.topnav a');
    navLinks.forEach(link => link.classList.remove('active'));

    const activeLink = document.querySelector(`.topnav a[href='#${pageId}']`);
    if (activeLink) activeLink.classList.add('active');
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}


function saveParameters() {
    const configData = {
        "param-box3": "Відлік часу",
        "Налаштування, сек": parseInt(document.getElementById('setupTimer').value),
        "До взриву, сек": parseInt(document.getElementById('explosionTimer').value),
        "Захист після включення, сек": parseInt(document.getElementById('protectionTimer').value),
        "Час перезапуску, сек": parseInt(document.getElementById('restartTimer').value),
        "param-box8": "Дрон",
        "ac-dc-mode": document.getElementById('acDcModeToggle').checked ? 8 : 0,
        "Поріг зчитання, G": {
            value: parseFloat(document.getElementById('readingThreshold').value),
            min: 1,
            max: 16,
            step: 0.1
        },
        "Взрив при перегрузці, G": parseFloat(document.getElementById('overloadExplosionThreshold').value),
        "Автовибух по таймеру": parseInt(document.getElementById('autoExplosionHidden').value),
        "Логування даних": document.getElementById('logsDroneEnabledHidden').value === "1",
        "Режим сервера": document.getElementById('serverDroneModeHidden').value === "1",
        "param-box15": "Міна",
        "Режим міни": document.getElementById('stationMineModeHidden').value === "1",
        "Поріг Активності, G": parseFloat(document.getElementById('mineActivityThreshold').value),
        "Поріг Бездіяльності, G": parseFloat(document.getElementById('mineInactivityThreshold').value),
        "Час Бездіяльності, сек": parseInt(document.getElementById('mineInactivityTime').value),
        "Загальний поріг дотику, G": parseFloat(document.getElementById('mineTapThreshold').value),
        "Загальна тривалість дотику, мс": parseInt(document.getElementById('mineTapDuration').value),
        "Загальна затримка дотику, мс": parseInt(document.getElementById('mineTapDelay').value),
        "name-logo": "Vujko WebServer",
        "img-logo": "/config/img-logo-128_128.txt"
    };

    const configJSON = JSON.stringify(configData, null, 2);
    const configBlob = new Blob([configJSON], { type: "application/json" });
    const formData = new FormData();
    formData.append("data", configBlob, '/config/config.json');

    fetch('/edit', {
        method: 'POST',
        body: formData

    })
        .then(response => response.text())
        .then((responseText) => {
            showToast(`Файл успішно збережено: ${responseText}`);
        })
        .catch((error) => {
            showToast("Помилка при збереженні конфігурації!");
        });
}

function updateHiddenField(checkboxId, hiddenFieldId) {
    const checkbox = document.getElementById(checkboxId);
    const hiddenField = document.getElementById(hiddenFieldId);
    if (hiddenField) {
        hiddenField.value = checkbox.checked ? "1" : "0";
    }
}

document.getElementById("reset-defaults").addEventListener("click", () => {
    const defaultConfig = {
        "param-box3": "Відлік часу",
        "Налаштування, сек": 120,
        "До взриву, сек": 1200,
        "Захист після включення, сек": 10,
        "Час перезапуску, сек": 30,
        "param-box8": "Дрон",
        "ac-dc-mode": 0,
        "Поріг зчитання, G": {
            "value": 10,
            "min": 1,
            "max": 16,
            "step": 0.1
        },
        "Взрив при перегрузці, G": 15,
        "Автовибух по таймеру": false,
        "Логування даних": true,
        "Режим сервера": false,
        "param-box15": "Міна",
        "Режим міни": false,
        "Поріг Активності, G": 4,
        "Поріг Бездіяльності, G": 2,
        "Час Бездіяльності, сек": 5,
        "Загальний поріг дотику, G": 3.5,
        "Загальна тривалість дотику, мс": 30,
        "Загальна затримка дотику, мс": 100,
        "name-logo": "Vujko WebServer",
        "img-logo": "/config/img-logo-128_128.txt"
    };

    initializeConfig(defaultConfig);
    showToast("Параметри скинуті до значень за замовчуванням!");
});
