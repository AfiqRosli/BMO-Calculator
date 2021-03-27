/*eslint no-console: off */
/*eslint-env browser*/
/*jslint devel: true */


window.onload = (function () {
  "use strict";
  
  var calculation = "",
    equalButtonPressed = false;
  
  function allClear(history, display) {
    history.innerHTML = "";
    display.innerHTML = "0";
    calculation = "";
  }
  
  function removeLastChar(display) {
    if (display.innerHTML.length === 1 &&
        display.innerHTML !== 0) {
      display.innerHTML = 0;
    } else {
      display.innerHTML = display.innerHTML.slice(0, -1);
    }
  }
  
  function clickedInput(button, calculation) {
    switch(button) {
    case "open-bracket":
      calculation = calculation + "(";
      break;
    case "close-bracket":
      calculation = calculation + ")";
      break;
    case "percentage":
      calculation = calculation + "/100";
      break;
    case "dot":
      calculation = calculation + ".";
      break;
    case "num0":
      calculation = calculation + "0";
      break;
    case "num1":
      calculation = calculation + "1";
      break;
    case "num2":
      calculation = calculation + "2";
      break;
    case "num3":
      calculation = calculation + "3";
      break;
    case "num4":
      calculation = calculation + "4";
      break;
    case "num5":
      calculation = calculation + "5";
      break;
    case "num6":
      calculation = calculation + "6";
      break;
    case "num7":
      calculation = calculation + "7";
      break;
    case "num8":
      calculation = calculation + "8";
      break;
    case "num9":
      calculation = calculation + "9";
      break;
    case "divide":
      calculation = calculation + "/";
      break;
    case "times":
      calculation = calculation + "*";
      break;
    case "minus":
      calculation = calculation + "-";
      break;
    case "plus":
      calculation = calculation + "+";
      break;
    }
    
    return calculation;
  }
  
  function checkIfDecimal(num) {
    var i;
    
    num = String(num);
    
    for (i = 0; i < num.length; i = i + 1) {
      if (num[i] === ".") {
        return true;
      }
    }
    return false;
  }
  
  function checkForOperator(equ){
    var i;
    
    equ = String(equ);
    
    for (i = 0; i < equ.length; i = i + 1) {
      switch (equ[i]) {
      case "+":
      case "-":
      case "*":
      case "/":
        return true;
      }
    }
    
    return false;
  }
  
  function checkLastChar(input, display) {
    var lastChar = display.innerHTML.slice(-1),
      divide = "\u00F7",
      times = "\u00D7",
      minus = "\u2212",
      plus = "\u002B",
      dot = "\u002E",
      percentage = "\u0025";
    
    switch (lastChar) {
    case divide:
    case times:
    case minus:
    case plus:
    case dot:
    case percentage:
      input[2].disabled = true;
      input[8].disabled = true;
      input[12].disabled = true;
      input[16].disabled = true;
      input[18].disabled = true;
      input[20].disabled = true;
      break;
    default:
      input[2].disabled = false;
      input[8].disabled = false;
      input[12].disabled = false;
      input[16].disabled = false;
      input[18].disabled = false;
      input[20].disabled = false;
      break;
    }
  }
  
  function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }
  
  document.onclick = function (e) {
    var clicked = e.target,
      history = document.getElementById("history"),
      display = document.getElementById("ans"),
      input = document.getElementsByTagName("input"),
      ac = document.getElementById("AC").parentElement,
      ce = document.getElementById("CE").parentElement,
      arrowLeft = document.getElementById("arrowLeft"),
      arrowRight = document.getElementById("arrowRight"),
      ans;
    
    if (display.classList.contains("errorS") ||
        display.classList.contains("errorL")) {
      display.innerHTML = "0";
      calculation = "";
    }
    
    display.classList.remove("errorS");
    display.classList.remove("errorL");
    
    window.onerror = function (){
      display.innerHTML = "Syntax Error";
      calculation = "";
      
      if (display.clientWidth > 300) {
        display.classList.add("errorL");
      } else {
        display.classList.add("errorS");
      }
    }
    
    if (equalButtonPressed) {
      equalButtonPressed = false;
      switch(clicked.id) {
        case "num0":
        case "num1":
        case "num2":
        case "num3":
        case "num4":
        case "num5":
        case "num6":
        case "num7":
        case "num8":
        case "num9":
          calculation = "";
          display.innerHTML = "";
          break;
        case "dot":
          calculation = "0";
          display.innerHTML = "0";
          break;
        default:
          break;
      }
    }
    
    if (clicked.tagName === "INPUT" &&
        clicked.id !== "AC" &&
        clicked.id !== "CE" &&
        clicked.id !== "equals") {
      
      if (display.innerHTML === "0" &&
          clicked.id === "divide" ||
          clicked.id === "times" ||
          clicked.id === "minus" ||
          clicked.id === "plus" ||
          clicked.id === "dot") {
        /* do nothing */
      } else if (display.innerHTML === "0") {
        display.innerHTML = "";
      }
      
      display.innerHTML += clicked.value;
      calculation = clickedInput(clicked.id, calculation);
      
      ce.removeAttribute("class");
      ac.setAttribute("class", "none");
      
    } else if (clicked.tagName === "INPUT" &&
               clicked.id === "AC") {
      equalButtonPressed = 0;
      allClear(history, display);
    } else if (clicked.tagName === "INPUT" &&
               clicked.id === "CE") {
      calculation = calculation.slice(0,-1);
      removeLastChar(display);
    } else if (clicked.tagName === "INPUT" &&
               clicked.id === "equals") {
      equalButtonPressed = true;
      ac.removeAttribute("class");
      ce.setAttribute("class", "none");
      
      ans = math.eval(calculation);
      
      history.innerHTML = display.innerHTML + "=";

      if ( checkIfDecimal(calculation) &&
           checkForOperator(calculation) ) {
        calculation = ans;
        calculation = Number(calculation).toFixed(6);
      } else if (checkIfDecimal(calculation) &&
                 !checkForOperator(calculation)) {
        calculation = Number(calculation).toFixed(6);
      } else if (checkIfDecimal(String(ans))) {
        calculation = Number(ans).toFixed(6);
      } else {
        calculation = ans;
      }
      calculation = parseFloat(calculation);
      display.innerHTML = calculation;
    }
    
    if (clicked.id === "arrowLeft") {
      display.scrollLeft -= 20;
    } else if (clicked.id === "arrowRight") {
      display.scrollLeft += 20;
    } else if (clicked.id !== "screen" &&
               clicked.id !== "ans") {
      /* auto-scroll horizonal */
      display.scrollLeft = display.scrollWidth - display.clientWidth;
      history.scrollLeft = history.scrollWidth - history.clientWidth;      
    }
    
    if (display.scrollWidth === display.clientWidth) {
      arrowLeft.style.display = "none";
      arrowRight.style.display = "none";
    } else if (display.scrollLeft === 0) {
      arrowLeft.style.display = "none";
      arrowRight.style.display = "block";
    } else if (Math.floor(display.scrollLeft) +
               display.clientWidth + 2 > display.scrollWidth) {
      arrowLeft.style.display = "block";
      arrowRight.style.display = "none";
    } else {
      arrowLeft.style.display = "block";
      arrowRight.style.display = "block";
    }
        
    checkLastChar(input, display);
  };

}());