/*
	Ross Hall
	ross_hall@student.uml.edu
	UMass Lowell Computer Science Student
	COMP 4610 GUI Programming 1
	Assignment No.8: Using the jQuery UI Slider and Tab Widget
    12/4/2018
    
    Description: This is the javascript file for the dynamic
    multiplication table website. This version uses jQuery 
    tabs and sliders from ui.js, allowing the user to store 
    up to five multiplication tables in tabs and adjust the
    domains dynamically using sliders.  
*/
const CELL_LIMIT = 99999;
const NUMBER_LIMIT = 100
const TAB_LIMIT = 5
let tab_count = 0
let tab_idNum = 0;

/* indexes for arrays*/
const X_LO = 0;
const X_HI = 1;
const Y_LO = 2;
const Y_HI = 3;

// enable validation on focusout
$.validator.setDefaults({
    onfocusout: function (element) {
        $(element).valid();
    }
});

$().ready(function(){
    /* Form validation */
    $("#inputForm").validate({
        submitHandler: function() {
            createTable(true);
        },
        errorElement: "div",
        rules: {
            field1: {
                required: true,
                number: true,
                step: 1,
                max: NUMBER_LIMIT,
                min: -NUMBER_LIMIT
            },
            field2: {
                required: true,
                number: true,
                step: 1,
                max: NUMBER_LIMIT,
                min: -NUMBER_LIMIT
            },
            field3: {
                required: true,
                number: true,
                step: 1,
                max: NUMBER_LIMIT,
                min: -NUMBER_LIMIT
            },
            field4: {
                required: true,
                number: true,
                step: 1,
                max: NUMBER_LIMIT,
                min: -NUMBER_LIMIT
            }
        },
        messages: {
            field1: {
               required: "An integer must be specfied for every bound.",
                number: "Please specify a valid integer. Ex: -100",
                step: "Please specify a valid integer. Ex: -100",
                max: "Please enter an integer less than " + NUMBER_LIMIT + ".",
                min: "Please enter an integer greater than " + -NUMBER_LIMIT + "."
            },
            field2: {
                required: "An integer must be specified for every bound.",
                number: "Please specify a valid integer. Ex: -100",
                step: "Please specify a valid integer. Ex: -100",
                max: "Please enter an integer less than " + NUMBER_LIMIT + ".",
                min: "Please enter an integer greater than " + -NUMBER_LIMIT + "."
            },
            field3: {
                required: "An integer must be specified for every bound.",
                number: "Please specify a valid integer. Ex: -100",
                step: "Please specify a valid integer. Ex: -100",
                max: "Please enter an integer less than " + NUMBER_LIMIT + ".",
                min: "Please enter an integer greater than " + -NUMBER_LIMIT + "."
            },
            field4: {
                required: "An integer must be specified for every bound.",
                number: "Please specify a valid integer. Ex: -100",
                step: "Please specify a valid integer. Ex: -100",
                max: "Please enter an integer less than " + NUMBER_LIMIT + ".",
                min: "Please enter an integer greater than " + NUMBER_LIMIT + "."
            }
        }
    });
    (function($){
        $("#myTabs").tabs();
    })(jQuery);

    /* define properties of sliders, and link to input values */
    (function($){
        $("#loXSlide").slider({
            max: 100,
            min: -100,
            step: 1,
            value: 1,
            slide: function(event, ui) {
                $('#lowerX').val(ui.value);
                createTable(false);
            }
        });
        $("#hiXSlide").slider({
            max: 100,
            min: -100,
            step: 1,
            value: 1,
            slide: function(event, ui) {
                $('#upperX').val(ui.value);
                createTable(false);
            }
        });
        $("#loYSlide").slider({
            max: 100,
            min: -100,
            step: 1,
            value: 1,
            slide: function(event, ui) {
                $('#lowerY').val(ui.value);
                createTable(false);
            }
        });
        $("#hiYSlide").slider({
            max: 100,
            min: -100,
            step: 1,
            value: 1,
            slide: function(event, ui) {
                $('#upperY').val(ui.value);
                createTable(false);
            }
        });
        $("#lowerX").on('propertychange input', function() {
            $('#loXSlide').slider('value', this.value);
            createTable(false);
        });
        $("#upperX").on('propertychange input', function() {
            $('#hiXSlide').slider('value', this.value);
            createTable(false);
        });
        $("#lowerY").on('propertychange input', function() {
            $('#loYSlide').slider('value', this.value);
            createTable(false);
        });
        $("#upperY").on('propertychange input', function() {
            $('#loYSlide').slider('value', this.value);
            createTable(false);
        });
    })(jQuery);
    createTable(true);
});

$(function (){
/* This function is run when a new tab is selected, it
    adjusts the slider and input values to match the 
    new active tab */
    $("#myTabs").tabs({
        activate: function(event, ui) {
            $('#messageSpan').text('Click on a cell to display the equation.');
            let domainStr = $('#theTabs > li.ui-tabs-active > a').text()
            let domains = domainStr.split(' X ');
            for (let i = 0; i < domains.length; i++) {
                domains[i] = domains[i].replace('(', '');
                domains[i] = domains[i].replace(')', '');
            }
            let Xbounds = domains[0].split(':')
            let Ybounds = domains[1].split(':');

            $('#loXSlide').slider('value', parseInt(Xbounds[0]));
            $('#hiXSlide').slider('value', parseInt(Xbounds[1]));
            $('#loYSlide').slider('value', parseInt(Ybounds[0]));
            $('#loYSlide').slider('value', parseInt(Ybounds[1]));

            $('#lowerX').val(parseInt(Xbounds[0]));
            $('#upperX').val(parseInt(Xbounds[1]));
            $('#lowerY').val(parseInt(Ybounds[0]));
            $('#upperY').val(parseInt(Ybounds[1]));
        }
    });
});

function createTab() {
/* Creates new tab with all inputs initialized to 1 */
    if(tab_count < TAB_LIMIT) {
        tab_count++;
        tab_idNum++;
        let theId = 'tab' + tab_idNum;
        let theTabs = document.getElementById('theTabs')
        let li = document.createElement('li');
        li.setAttribute('id', theId)
        li.innerHTML = '<a href="#pan' + theId + '">(' + 1 + ':' + 1 + ') X (' + 1 + ':' + 1 + ')</a>'; 
        theTabs.appendChild(li);
        let myTabs = document.getElementById('myTabs');
        let tabDiv = document.createElement('div');   
        tabDiv.setAttribute('id', 'pan' + theId);
        myTabs.append(tabDiv);
        $("#myTabs").tabs("refresh");
        $("#myTabs").tabs("option", "active", $('#pan' + theId + "Selector").index());

        $('#loXSlide').slider('value', 1);
        $('#hiXSlide').slider('value', 1);
        $('#loYSlide').slider('value', 1);
        $('#loYSlide').slider('value', 1);
        
        $('#lowerX').val(1);
        $('#upperX').val(1);
        $('#lowerY').val(1);
        $('#upperY').val(1);
    } else {
        $('#messageSpan').text('There is a limit of five tables. Please delete a table before creating a new one.');
    }
}

function createTable(newTab) {
/* This function is called everytime a table needs to be made
    or redrawn because domains have changed. It takes a boolean
    parameter indicating whether the table should be drawn in a
    new tab or not*/
    if (newTab) {
        createTab();
    }
    if (tab_count > 0) {
        $('#messageSpan').text('Click on a cell to display the equation.');
    }
    formNodes = [];  // array to hold entire input nodes
    formNodes.push($("#lowerX"));
    formNodes.push($("#upperX"));
    formNodes.push($("#lowerY"));
    formNodes.push($("#upperY"));
    
    formValues = [];  // array to hold values in input fields
    let tempValue; 
    for (let i = 0; i < 4; i++) {
        tempValue = Number(formNodes[i].val())
        formValues.push(tempValue);
    }
    let temp_node;
    if (formValues[0] > formValues[1]) {
        /* Order x bounds by size */
        tempValue = formValues[0];
        formValues[0] = formValues[1];
        formValues[1] = tempValue;
        
        temp_node = formNodes[0];
        formNodes[0] = formNodes[1];
        formNodes[1] = temp_node;
    }
    if (formValues[2] > formValues[3]) {
        /* Order y bounds by size */
        tempValue = formValues[2];
        formValues[2] = formValues[3];
        formValues[3] = tempValue;
        
        temp_node = formNodes[2];
        formNodes[2] = formNodes[3];
        formNodes[3] = temp_node;
    }
    let curLab = $('#theTabs > li.ui-tabs-active');
    $('#theTabs > li.ui-tabs-active > a').text('(' + formValues[X_LO] + ':' + formValues[X_HI] + ') X (' + formValues[Y_LO] + ':' + formValues[Y_HI] + ')');
    let panelId = 'pan' + curLab.attr('id');
    let scroller = $('#' + panelId + ' > .scroller');
    if (scroller) {
        scroller.remove(); // remove previous table before drawing new one
    }
    
    scroller = document.createElement('div');
    scroller.setAttribute('class', 'scroller');
    let theTable = document.createElement("table");
    let t_top_row = document.createElement('tr');
    for (let i = formValues[X_LO] - 1; i <= formValues[X_HI]; i++) {
        /* Create the first row (X-axis table headers)*/
        let t_heading = document.createElement('th');
        if (i < formValues[X_LO]) {
            t_heading.innerText = '-';
        } else {
            t_heading.innerText = i;
        }
        t_top_row.appendChild(t_heading);
    }
    theTable.appendChild(t_top_row);
    for (let i = formValues[Y_LO]; i <= formValues[Y_HI]; i++) {
    /* Create subsequent rows */
        let t_row = document.createElement('tr');
        let t_heading = document.createElement('th');
        t_heading.innerText = i;  // (Y-axis table heading)
        t_row.appendChild(t_heading);
        for (let j = formValues[X_LO]; j <= formValues[X_HI]; j++) {
            /* table data creation */
            let t_data = document.createElement('td');
            t_data.innerText = i * j;  // calculate product
            let id_string = i + ' X ' + j;  // id_string is the equation that generated cell value
            t_data.setAttribute('id', id_string);
            t_data.onclick = selectTableCell;
            t_row.appendChild(t_data);
        }
        theTable.appendChild(t_row);
    }
    scroller.appendChild(theTable);
    curLab = $('#theTabs > li.ui-tabs-active');
    panelId = 'pan' + curLab.attr('id');
    let curTab = $('#' + panelId)
    curTab.append(scroller);
}

function removeTabs() {
/* Sets up the tab removal section allowing the user
    to indicate which tables to delete */

// inspired by: https://stackoverflow.com/questions/9729329/get-each-childid-into-array-or-string
    let tabIdList = []
    $('li', '#theTabs').each(function(){
        tabIdList.push($(this).attr('id'));
    });
    if(tabIdList.length){
        let selectHolder = document.createElement('div');
        $('#banner').addClass('hide');
        let remover = $('#tabRemover')
        remover.removeClass("hide");
        selectHolder.setAttribute('id', 'selectors');
        for(let i = 0; i < tabIdList.length; i++) {
            let div = document.createElement('div');
            let btn = document.createElement('input');
            btn.setAttribute('type',  'checkbox')
            btn.setAttribute('id',  'btn' + tabIdList[i]);
            btn.setAttribute('value', tabIdList[i]);
            let lbl = document.createElement('label');
            lbl.setAttribute('for', 'btn' + tabIdList[i]);
            lbl.innerText = $('#' + tabIdList[i] + ' a').text();
            div.append(btn);
            div.append(lbl);
            selectHolder.append(div);
        }
        let submit = document.createElement('button');
        submit.setAttribute('onclick', 'deleter()');
        submit.innerText = 'Delete Selected Tables';
        selectHolder.append(submit);
        remover.append(selectHolder)
    } else {
        $('#messageSpan').text('There are no tables to delete, please Create a new table.');
    }
}
function deleter() {
/* Deletes tabs corresponding to the input boxes checked
    by the user. */

// inspired by: https://stackoverflow.com/questions/9729329/get-each-childid-into-array-or-string
    $('input:checked', '#selectors').each(function(){
        $('#pan' + this.value).remove();
        $('#' + this.value).remove();
        tab_count--;
    });
    $('#selectors').remove();
    $('#tabRemover').addClass('hide');
    $('#banner').removeClass('hide');
    if (tab_count === 0) {
        $('#messageSpan').text('All tables have been deleted, please create a new table.');
    }
}

/***********************************************************************
 * Helper Functions
 **********************************************************************/
let selectTableCell = function () {
    td_selected = $('.selected');
    /* unselect any selected cells */
    td_selected.removeClass('selected');
    
    /* displays cell equation in messageSpan*/
    this.classList.add('selected');
    let calc_string = this.getAttribute('id') + ' = ' + this.innerText;
    $('#messageSpan').text(calc_string);
}
