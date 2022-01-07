import './style.css';
import { gsap } from 'gsap';
import $ from 'jquery';

let button = document.getElementById('start');
let tool = document.getElementById('tool');
let amount = document.getElementById('amount');
let property = document.getElementById('property');
let wrapper = document.getElementById('wrapper');

$('#start').on('click', handleButton);

// tool.value etc.
let running = false;
let startTime = Date.now();
let frame = 0;
let rafId = undefined;

function handleButton() {
  if (running) {
    stopTest();
  } else {
    startTest();
  }
  running = !running;
}

function startTest() {
  button.innerText = 'STOP';
  button.style['background-color'] = 'hsl(6, 82%, 63%)';

  tool.disabled = true;
  amount.disabled = true;
  property.disabled = true;

  let chosenTool = tool.value;
  let chosenAmount = amount.value;
  let chosenProperty = property.value;

  populate(chosenTool, parseInt(chosenAmount), chosenProperty);

  if (chosenTool == 'gsap') {
    let tl = gsap.timeline({ repeat: -1, defaults: { ease: 'linear' } });
    tl.yoyo(true);
    let objects = document.getElementsByClassName('square');

    switch (chosenProperty) {
      case 'opacity':
        tl.to(objects, { duration: 2, opacity: 0 });
        break;
      case 'rotate':
        tl.to(objects, { duration: 2, rotate: 180 });
        break;
      case 'translate':
        tl.to(objects, { duration: 2, y: 30, x: 30 });
        break;
      case 'color':
        tl.to(objects, { duration: 2, color: 'white' });
        break;
      default:
        tl.to(objects, { duration: 2, borderWidth: 8 });
    }
  }
  updateFps();
}

function populate(tool, amount, property) {
  for (let i = 0; i < amount; i++) {
    let square = document.createElement('div');
    square.className = 'square';
    if (property == 'color') {
      square.innerText = 'A';
    }
    if (tool == 'cssa') {
      square.classList.add(property);
    }
    wrapper.appendChild(square);
  }
}

function stopTest() {
  cancelAnimationFrame(rafId);
  button.innerText = 'START';
  button.style['background-color'] = 'hsl(133, 82%, 63%)';

  tool.disabled = false;
  amount.disabled = false;
  property.disabled = false;

  wrapper.textContent = '';
  fps.innerText = '';
}

function updateFps() {
  let time = Date.now();
  frame++;
  if (time - startTime > 1000) {
    fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(2);
    startTime = time;
    frame = 0;
  }
  rafId = window.requestAnimationFrame(updateFps);
}
