import {ready, redirectToTop} from './lib/global.js';
import {getUser, getSessionUser, logout} from './lib/session.js';
import {setValidityMessage} from './lib/validation.js';

const session = getSessionUser();

if (!session) {
  redirectToTop();
}

// load user data
const user = getUser(session);

if (user.preset) {
  redirectToTop();
}

ready(() => {
  // Collect input elements
  const iconForm = document.getElementById('icon-form');
  const iconInput = document.getElementById('icon');
  const zoomInput = document.getElementById('zoom');
  const colorInput = document.getElementById('color');

  // set file event
  iconInput.addEventListener('change', (event) => {
    event.target.setCustomValidity('');
    const file = event.target.files[0];
    colorInput.value = '#ffffff';
    zoomInput.value = 100;
    if (!file) {
      document.getElementById('icon-holder').innerHTML = '';
      zoomInput.disabled = true;
      colorInput.disabled = true;
      return;
    }
    if (file.size > (10 * 1024)) {
      document.getElementById('icon-holder').innerHTML = '';
      zoomInput.disabled = true;
      colorInput.disabled = true;
      event.target.setCustomValidity('ファイルサイズは10KB以下にしてください。');
      setValidityMessage(event.target);
      iconForm.classList.add('was-validated');
      return;
    } else if (!file.type.startsWith('image/')) {
      document.getElementById('icon-holder').innerHTML = '';
      zoomInput.disabled = true;
      colorInput.disabled = true;
      event.target.setCustomValidity('画像ファイルを選択してください。');
      setValidityMessage(event.target);
      iconForm.classList.add('was-validated');
      return;
    }
    const img = document.createElement('img');
    img.id = 'icon-img';
    img.classList.add('img-thumbnail');
    img.src = URL.createObjectURL(file);
    img.width = 100;
    img.height = 100;
    img.onload = function() {
      URL.revokeObjectURL(this.src);
    };
    const iconHolder = document.getElementById('icon-holder');
    iconHolder.innerHTML = '';
    iconHolder.appendChild(img);

    // set zoom input
    zoomInput.disabled = false;
    zoomInput.addEventListener('change', (event) => {
      const iconImg = document.getElementById('icon-img');
      iconImg.width = parseInt(event.target.value, 10);
      iconImg.height = parseInt(event.target.value, 10);
    });

    // set color input
    colorInput.disabled = false;
    colorInput.addEventListener('change', (event) => {
      document.getElementById('icon-img').style.backgroundColor = event.target.value;
    });
  });

  iconForm.addEventListener('submit', (event) => {
    if (iconForm.checkValidity()) {
      const file = iconInput.files[0];
      const reader = new FileReader();
      reader.onload = function(event) {
        const dataURL = event.target.result;
        const icon = {
          'image': dataURL,
          'width': parseInt(zoomInput.value, 10),
          'height': parseInt(zoomInput.value, 10),
          'color': colorInput.value,
        };
        user.icon = icon;
        localStorage.setItem(user.email, JSON.stringify(user));
      };
      reader.readAsDataURL(file);
    } else {
      event.preventDefault();
      event.stopPropagation();
      setValidityMessage(iconInput);
      iconForm.classList.add('was-validated');
    }
  });

  document.getElementById('logout-form').addEventListener('submit', () => {
    logout();
  });
});
