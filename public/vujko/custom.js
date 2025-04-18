document.addEventListener("DOMContentLoaded", function () {
    if ('ontouchstart' in document.documentElement) {
        document.body.classList.add('touch');
    }

    loadConfig("config/config.json");

    showPage('timer');

    checkProfiles().then(() => {
        loadDefaultProfile();
    });

    document.getElementById("stationMineMode").addEventListener("change", toggleMineFields);
    document.getElementById("accelMode").addEventListener("change", toggleDroneFields);
    document.addEventListener("submit", handleFormSubmit);

    const explosionSlider = document.getElementById("explosionSlider");
    const explosionTimer = document.getElementById("explosionTimer");

    explosionTimer.textContent = explosionSlider.value;

    explosionSlider.addEventListener("input", function () {
        explosionTimer.textContent = this.value;
    });

    syncValues();
    syncExplosionTimer();

    fetch("assets/tooltips.json")
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll(".tooltiptext[data-tooltip]").forEach(el => {
                let key = el.getAttribute("data-tooltip");
                if (data[key]) {
                    el.textContent = data[key];
                }
            });
        })
        .catch(error => console.error("Помилка завантаження tooltips.json:", error));

    document.getElementById("profileSelect").addEventListener("change", function () {
        const profileNumber = this.value;
        loadConfig(`assets/profile${profileNumber}.json`);
        updateProfile();
    });

    document.getElementsByClassName("btn").addEventListener("click", function () {
        const profileNumber = document.getElementById("profileSelect").value;
        saveParameters(profileNumber);
    });
});

function loadConfig(configPath) {
    fetch(configPath)
        .then(response => response.json())
        .then(config => {
            initializeConfig(config);
            toggleLogButton();
        })
        .catch(error => console.error(`Помилка завантаження ${configPath}:`, error));
}

function syncValues() {
    const slider = document.getElementById("readingThreshold");
    const numberInput = document.getElementById("readingThresholdInput");
    const valueDisplay = document.getElementById("thresholdValue");

    function syncValues(source, target) {
        target.value = source.value;
        valueDisplay.textContent = source.value;
    }

    syncValues(slider, numberInput);

    slider.addEventListener("input", function () {
        syncValues(slider, numberInput);
    });

    numberInput.addEventListener("input", function () {
        if (numberInput.value < slider.min) numberInput.value = slider.min;
        if (numberInput.value > slider.max) numberInput.value = slider.max;
        syncValues(numberInput, slider);
    });
}

function syncExplosionTimer() {
    const slider = document.getElementById("explosionSlider");
    const numberInput = document.getElementById("explosionTimerInput");
    const displayValue = document.getElementById("explosionTimer");

    function sync(source, target) {
        target.value = source.value;
        displayValue.textContent = source.value;
    }
    sync(slider, numberInput);

    slider.addEventListener("input", function () {
        sync(slider, numberInput);
    });

    numberInput.addEventListener("input", function () {
        if (numberInput.value < slider.min) numberInput.value = slider.min;
        if (numberInput.value > slider.max) numberInput.value = slider.max;
        sync(numberInput, slider);
    });
}

function initializeConfig(config) {
    console.log("Config Loaded:", config);

    document.getElementById("name-logo").textContent = config['name-logo'];
    document.getElementById("img-logo").style.backgroundImage = `url(${config['img-logo']})`;

    updateInputValue("setupTimer", config['Час очікування, сек']);
    updateInputValue("explosionTimer", config['До взриву, сек']);
    updateInputValue("protectionTimer", config['Захист після включення, сек']);
    updateInputValue("restartTimer", config['Час перезапуску, сек']);

    document.getElementById("accelMode").checked = config['Акселерометр'] === true;
    updateHiddenField('accelMode', 'accelModeHidden');

    const droneSettings = config['Поріг зчитання, G'];
    updateInputRange("readingThreshold", droneSettings);
    document.getElementById("readingThresholdInput").value = droneSettings.value;
    document.getElementById("thresholdValue").textContent = droneSettings.value;

    updateInputValue("overloadExplosionThreshold", config['Взрив при перегрузці, G']);

    updateInputValue("pt1", config['pt1']);
    updateInputValue("pt2", config['pt2']);
    updateInputValue("filterRate", config['filterRate']);
    updateInputValue("refreshRate", config['refreshRate']);

    // document.getElementById("acDcModeToggle").checked = config['ac-dc-mode'] === 8;
    document.getElementById("autoExplosionToggle").checked = config['Автовибух по таймеру'] === 1;
    document.getElementById("logsDroneEnabled").checked = config['Логування даних'] === true;
    updateHiddenField('logsDroneEnabled', 'logsDroneEnabledHidden');

    document.getElementById("stationMineMode").checked = config['Режим міни'];
    updateInputValue("mineActivityThreshold", config['Поріг Активності, G']);
    updateInputValue("mineInactivityThreshold", config['Поріг Бездіяльності, G']);
    updateInputValue("mineInactivityTime", config['Час Бездіяльності, сек']);
    updateInputValue("mineTapThreshold", config['Загальний поріг дотику, G']);
    updateInputValue("mineTapDuration", config['Загальна тривалість дотику, мс']);
    updateInputValue("mineTapDelay", config['Загальна затримка дотику, мс']);

    const explosion = config['До взриву, сек'];
    updateInputValue("explosionTimerInput", explosion);
    updateInputRangeExplosion("explosionSlider", explosion);
    document.getElementById("explosionTimer").textContent = explosion;

    toggleMineFields();
    toggleDroneFields();
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

function updateInputRangeExplosion(id, value) {
    const element = document.getElementById(id);
    const valueDisplay = document.getElementById('explosionTimer');

    if (element && value) {
        element.value = value;
        valueDisplay.textContent = value;
    }
}

function toggleMineFields() {
    const isMineModeActive = document.getElementById("stationMineMode").checked;
    const mineFields = document.getElementById("mine-fields");
    mineFields.style.display = isMineModeActive ? "block" : "none";
}

function toggleDroneFields() {
    const isDroneModeActive = document.getElementById("accelMode").checked;
    const droneFields = document.getElementById("drone-fields");
    droneFields.style.display = isDroneModeActive ? "block" : "none";
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
        'setupTimer': 'Час очікування, сек',
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
        'accelModeHidden': 'Акселерометр',
        'acDcModeHidden': 'ac-dc-mode',
        'autoExplosionHidden': 'Автовибух по таймеру',
        'logsDroneEnabledHidden': 'Логування даних',
        'pt1': 'pt1',
        'pt2': 'pt2',
        'filterRate': 'filterRate',
        'refreshRate': 'refreshRate'
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

function reloadOptions() {
    fetch('http://192.168.4.1/reload')
        .then(response => response.text())
        .then(data => showToast(data === "Options loaded" ? "Опції успішно завантажено!" : "Помилка при завантаженні опцій"))
        .catch(error => {
            console.error("Error:", error);
            showToast("Помилка при завантаженні опцій");
        });
}

function saveParameters(profileNumber) {
    const configData = {
        "name-logo": "Vujko WebServer",
        "img-logo": "/config/logo.txt",
        "param-box3": "Відлік часу",
        "Час очікування, сек": parseInt(document.getElementById('setupTimer').value),
        "До взриву, сек": parseInt(document.getElementById('explosionSlider').value),
        "Захист після включення, сек": parseInt(document.getElementById('protectionTimer').value),
        "Час перезапуску, сек": parseInt(document.getElementById('restartTimer').value),
        "param-box8": "Дрон",
        "Акселерометр": document.getElementById('accelModeHidden').value === "1",
        "ac-dc-mode": 0,
        "Поріг зчитання, G": {
            value: parseFloat(document.getElementById('readingThreshold').value),
            min: 1,
            max: 16,
            step: 0.1
        },
        "Взрив при перегрузці, G": parseFloat(document.getElementById('overloadExplosionThreshold').value),
        "Автовибух по таймеру": parseInt(document.getElementById('autoExplosionHidden').value),
        "pt1": parseFloat(document.getElementById('pt1').value),
        "pt2": parseFloat(document.getElementById('pt2').value),
        "filterRate": parseFloat(document.getElementById('filterRate').value),
        "refreshRate": parseFloat(document.getElementById('refreshRate').value),
        "Логування даних": document.getElementById('logsDroneEnabledHidden').value === "1",
        "param-box19": "Міна",
        "Режим міни": document.getElementById('stationMineModeHidden').value === "1",
        "Поріг Активності, G": parseFloat(document.getElementById('mineActivityThreshold').value),
        "Поріг Бездіяльності, G": parseFloat(document.getElementById('mineInactivityThreshold').value),
        "Час Бездіяльності, сек": parseInt(document.getElementById('mineInactivityTime').value),
        "Загальний поріг дотику, G": parseFloat(document.getElementById('mineTapThreshold').value),
        "Загальна тривалість дотику, мс": parseInt(document.getElementById('mineTapDuration').value),
        "Загальна затримка дотику, мс": parseInt(document.getElementById('mineTapDelay').value),
    };

    const configJSON = JSON.stringify(configData, null, 2);
    const configBlob = new Blob([configJSON], { type: "application/json" });
    const sendConfig = (filePath) => {
        const formData = new FormData();
        formData.append("data", configBlob, filePath);

        return fetch('/edit', {
            method: 'POST',
            body: formData
        });
    };

    Promise.all([
        sendConfig(`assets/profile${profileNumber}.json`),
        sendConfig(`config/config.json`)
    ])
        .then(() => {
            showToast("Файли успішно збережені!");
        })
        .catch(() => {
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
    fetch("assets/defaultConfig.json")
        .then(response => response.json())
        .then(config => {
            initializeConfig(config);
            const configBlob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
            const profileIndex = document.getElementById("profileSelect").value;
            const formData = new FormData();
            formData.append("data", configBlob, `assets/profile${profileIndex}.json`);

            fetch('/edit', {
                method: 'POST',
                body: formData

            })
                .then(response => response.text())
                .then((responseText) => {
                    showToast(`Параметри скинуті до значень за замовчуванням!`);
                    loadConfig(`assets/profile${profileIndex}.json`);
                })
                .catch((error) => {
                    showToast("Помилка при збереженні конфігурації!");
                });
        })
        .catch(error => {
            showToast("Помилка при завантаженні конфігурації!");
        });
});

var port = location.port || (window.location.protocol === 'https:' ? '443' : '80');
var esp = `${window.location.protocol}//${window.location.hostname}:${port}/`;

function restartESP() {
    fetch(esp + "reset")
        .then(response => response.text())
        .then(data => {
            console.log("done")
        });
}

function toggleLogButton() {
    let checkbox = document.getElementById('logsDroneEnabled');
    let button = document.getElementById('logButton');
    let hiddenInput = document.getElementById('logsDroneEnabledHidden');

    if (checkbox.checked) {
        button.style.display = 'inline-block';
        hiddenInput.value = '1';
    } else {
        button.style.display = 'none';
        hiddenInput.value = '0';
    }
}

function updateProfile() {
    document.getElementById('profile-version').textContent =
        "Профіль: " + document.getElementById('profileSelect').value;
}

function checkProfiles() {
    const profileSelect = document.getElementById("profileSelect");
    profileSelect.innerHTML = "";

    let profileFound = false;

    for (let i = 1; i <= 5; i++) {
        const xhr = new XMLHttpRequest();
        xhr.open("HEAD", `assets/profile${i}.json`, false);
        xhr.send();

        if (xhr.status === 200) {
            const option = document.createElement("option");
            option.value = i;
            option.text = `Профіль ${i}`;
            profileSelect.appendChild(option);

            if (i === 1) profileFound = true;
        }
    }

    if (profileFound) {
        profileSelect.value = "1";
        updateProfile();
        loadConfig(`assets/profile1.json`);
    } else if (profileSelect.options.length > 0) {
        profileSelect.selectedIndex = 0;
        updateProfile();
        loadConfig(`assets/profile${profileSelect.value}.json`);
    } else {
        console.warn("Жодного профілю не знайдено.");
    }
}

function loadDefaultProfile() {
    const profileSelect = document.getElementById("profileSelect");
    if (profileSelect.options.length > 0) {
        profileSelect.selectedIndex = 0;
        updateProfile();
        loadConfig(`assets/profile${profileSelect.value}.json`);
    }
}

function toggleFilters() {
    const filters = document.getElementById('filters');
    const filtersToggle = document.getElementById('filters-toggle');

    if (filters.style.display === 'none' || filters.style.display === '') {
        filters.style.display = 'block';
        filtersToggle.innerText = 'Сховати фільтри';
    } else {
        filters.style.display = 'none';
        filtersToggle.innerText = 'Показати фільтри';
    }
}
