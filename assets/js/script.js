var modelViewer = document.querySelector('#ARViewer');
var progressBar = modelViewer ? modelViewer.querySelector('.progress-bar') : null;
var updatingBar = modelViewer ? modelViewer.querySelector('.update-bar') : null;
var updatingText = modelViewer ? modelViewer.querySelector('.update-text') : null;
var percentage = 0;
var touchStartX = 0;
var touchEndX = 0;

document.addEventListener('DOMContentLoaded', () => {
  const correctPassword = '12345'; // Set your desired password here
  const passwordOverlay = document.getElementById('password-overlay');
  const modelContent = document.getElementById('model-content');
  const errorText = document.getElementById('password-error');

  // Check if the password has already been entered during this session
  if (sessionStorage.getItem('passwordEntered') === 'true') {
      passwordOverlay.style.display = 'none';
      modelContent.style.display = 'block';
  } else {
      passwordOverlay.style.display = 'flex';
      modelContent.style.display = 'none';
  }

  document.getElementById('submit-password').addEventListener('click', () => {
      const enteredPassword = document.getElementById('password-input').value;

      if (enteredPassword === correctPassword) {
          // Hide the password overlay
          passwordOverlay.style.display = 'none';
          
          // Show the model-viewer and controls
          modelContent.style.display = 'block';

          // Store in session storage that the password has been entered
          sessionStorage.setItem('passwordEntered', 'true');
      } else {
          // Show an error message
          errorText.style.display = 'block';
      }
  });

  // Optionally prevent form submission on Enter keypress to avoid unintended behavior
  document.getElementById('password-input').addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
          e.preventDefault();
          document.getElementById('submit-password').click();
      }
  });
});


const onProgress = (event) => {
  const progress = event.detail.totalProgress;
  const percentage = Math.round(progress * 100);

  updatingBar.style.width = `${percentage}%`;
  updatingText.innerHTML = `Loading Asset ${percentage}%`;

  if (progress === 1) {
      progressBar.classList.add('hide');
      modelViewer.removeEventListener('progress', onProgress);
  } else {
      progressBar.classList.remove('hide');
  }
};

modelViewer.addEventListener('progress', onProgress);


if(modelViewer){

  // List all of your 3D model in the folder 'assets/models'
  const modelsList = [
      'assets/models/a_letter.glb', 
      'assets/models/b_letter.glb', 
      'assets/models/c_letter.glb',
      
  ];

  let currentModelIndex = 0;

  const modelViewer = document.getElementById('ARViewer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  modelViewer.setAttribute('src', modelsList[currentModelIndex]);

  function updateModel() {
      modelViewer.src = modelsList[currentModelIndex];
      progressBar.classList.remove('hide');
      updatingBar.style.width = '0%';
      updatingText.innerHTML = 'Loading Asset 0%';

      modelViewer.addEventListener('progress', onProgress);
  }

  prevBtn.addEventListener('click', () => {
      if (currentModelIndex > 0) {
          currentModelIndex--;
          updateModel();
      }
  });

  nextBtn.addEventListener('click', () => {
      if (currentModelIndex < modelsList.length - 1) {
          currentModelIndex++;
          updateModel();
      }
  });
}

function isMobile() {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIpad = /iPad/i.test(navigator.userAgent);

  const isTabletWidth = screenWidth > 600 && screenWidth < 1024;
  const isMobileWidth = screenWidth <= 600;

  return (isAndroid && !isIpad && isTabletWidth) || (isMobileWidth);
}

function isTabletPortrait() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  return isTablet && window.matchMedia("(orientation: portrait)").matches;
}

const handleContextMenu = (e) => {
  e.preventDefault();
};

document.onkeydown = (e) => {
  const forbiddenKeys = ['F12', 'C', 'I', 'J', 'U'];
  if (forbiddenKeys.includes(e.code) || (e.ctrlKey && e.shiftKey)) {
    e.preventDefault();
  }
};
