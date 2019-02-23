var Select = function (selector) {

    var theSelect = document.querySelector(selector);
    var optionsDiv;
    var filteredOptions;
    var shouldHide;
    var dropdown;
    var defaultTitle;
    var button;
    var filterInput;

    function init() {
        shouldHide = false;
        defaultTitle = "Select Country";
        resetOptions();
        buildSelect();
    }

    function getOptionsFromSelect(select) {
        var options = [];
        for (var i = 0 ; i < select.options.length; i++) {
            options.push(select.options.item(i).value);
        }
        return options;
    }

    function resetOptions(){
        filteredOptions = [];
        filteredOptions = getOptionsFromSelect(theSelect);
    }

    function toggleDropDown(){
        if (shouldHide) {
            filterInput.value = "";
            resetOptions();
            renderOptions(filteredOptions, optionsDiv);
            dropdown.classList.add("closed");
        } else {
            dropdown.classList.remove("closed");
        }
        shouldHide = !shouldHide;
    }

    function buildButton() {
        button = document.createElement('button');
        button.innerText = defaultTitle;
        button.setAttribute("class", "title-button");
        
        button.addEventListener("click", function () {
            toggleDropDown();
            filterInput.focus();
        });
        return button;
    }

    function buildOptions(options) {
        var i;
        optionsDiv = document.createElement('div');
        optionsDiv.setAttribute("class", "options-div");
        renderOptions(options, optionsDiv);
        return optionsDiv;
    }

    function renderOptions(options , container) {
        while(container.firstChild){
            container.removeChild(container.firstChild);
        }
        for (i = 0; i < options.length; i++) {
            var item = document.createElement("div");
            item.setAttribute("class", "option");
            item.innerText = options[i];
            item.addEventListener("click", function () {
                button.innerText = this.innerText;
                toggleDropDown();
            });
            container.appendChild(item);
        }

    }

    function buildFilter() {
        
        filterInput = document.createElement('input');
        filterInput.setAttribute('class', 'filter-input');
        filterInput.addEventListener("input" , function(){
            var options = [];
            var newValue = this.value;
            newValue = newValue.toLowerCase();
            var selectOptions = theSelect.options;
            for (var i = 0 ; i < selectOptions.length ; i++){
                options.push(selectOptions.item(i).value);
            }

            options = options.filter( option => option.toLowerCase().includes(newValue));
            renderOptions(options, document.querySelector('.options-div'));
        });
        return filterInput;
    }

    function buildDropDown(){
        dropdown = document.createElement("div");
        dropdown.setAttribute("class" , "dropdown");
        dropdown.classList.add('closed');

        var filter = buildFilter();
        var options = buildOptions(getOptionsFromSelect(theSelect));
        dropdown.appendChild(filter);
        dropdown.appendChild(options);
        return dropdown;
    }

    function buildSelect() {
        var wrapperDiv = document.createElement("div");

        var button = buildButton();
        var dropdown = buildDropDown();
        
        

        theSelect.setAttribute('hidden', 'true');
        wrapperDiv.setAttribute("class", "select-container");
        theSelect.parentElement.replaceChild(wrapperDiv, theSelect);
        wrapperDiv.appendChild(button);
        wrapperDiv.appendChild(dropdown);
        wrapperDiv.appendChild(theSelect);

    }


    init();
};

