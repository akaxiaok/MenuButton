(function () {
  'use strict';

  function MenuButton(id, options) {
    options = options || {};
    this.style = {
      buttonColor: options.buttonColor || '#adb5bd',
      buttonHoverColor: options.buttonHoverColor || '#0099ff',
      menuWidth: options.menuWidth || '320px',
      menuHeight: options.menuHeight || '320px',
      menuBackground: options.menuBackground || '#f7f7f9',
      buttonWidth: options.buttonWidth || '32px',
      buttonHeight: options.buttonHeight || '32px',

    };
    this.hoverActive = options.hoverActive === true;
    this.menuItems = options.menuItems;
    this.element = document.querySelector('#' + id);
    this.init();
    this.bindEvent();

  }

  MenuButton.prototype.init = function () {
    this.button = document.createElement('div');
    this.button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/></svg>';
    this.updateButtonStyle({
      height: this.style.buttonHeight,
      width: this.style.buttonWidth,
      color: this.style.buttonColor,
      float: 'left',
    });
    this.menu = document.createElement('ul');
    if (this.menuItems) {
      var fragment = document.createDocumentFragment();
      this.menuItems.forEach(function (item) {
        var li = document.createElement('li');
        li.innerHTML = item.label;
        fragment.appendChild(li);
      });
      this.menu.appendChild(fragment);
    }


    this.updateMenuStyle({
      width: 0,
      height: 0,
      background: this.style.menuBackground,
      padding: 0,
      margin: 0,
      float: 'left',
      position: 'absolute',
      display: 'none',
      overflow: 'hidden',
      transition: 'width .8s ease, height .8s ease',
      'list-style': 'none',
    });
    this.element.appendChild(this.button);
    this.element.appendChild(this.menu);
  };

  MenuButton.prototype.bindEvent = function () {
    var menuButton = this;
    this.button.addEventListener('mouseenter', function () {
      if (menuButton.hoverActive) {
        menuButton.showMenu();
      } else {
        menuButton.onHover();
      }
    });

    this.button.addEventListener('mouseleave', function () {
      if (menuButton.hoverActive) {
        menuButton.hide();
      } else {
        menuButton.outHover();
      }
    });
    this.button.addEventListener('click', function () {
      if (!menuButton.hoverActive) {
        menuButton.hideButton();
        menuButton.showMenu();
      }
    });
    this.menu.addEventListener('mouseleave', function () {
      menuButton.hideMenu();
      menuButton.showButton();

    })
  };

  MenuButton.prototype.onHover = function () {
    this.updateButtonStyle({ color: this.style.buttonHoverColor });
  };

  MenuButton.prototype.outHover = function () {
    this.updateButtonStyle({ color: this.style.buttonColor });
  };

  MenuButton.prototype.updateButtonStyle = function (styleObj) {
    Object.assign(this.button.style, styleObj);
  };

  MenuButton.prototype.updateMenuStyle = function (styleObj) {
    Object.assign(this.menu.style, styleObj);
  };

  MenuButton.prototype.hideButton = function () {
    this.updateButtonStyle({ display: 'none' })
  };

  MenuButton.prototype.showButton = function () {
    this.updateButtonStyle({ display: 'block' })
  };

  MenuButton.prototype.hideMenu = function () {
    var menuButton = this;
    menuButton.updateMenuStyle({
      width: 0,
      height: 0,
    });
    setTimeout(function () {
      menuButton.updateMenuStyle({ display: 'none' });
    }, 800)
  };

  MenuButton.prototype.showMenu = function () {
    var menuButton = this;

    menuButton.updateMenuStyle({
      display: 'block',
    });

    setTimeout(function () {
      menuButton.updateMenuStyle({
        width: menuButton.style.menuWidth,
        height: menuButton.style.menuHeight,
      })
    }, 10)

  };
  window.MenuButton = MenuButton;
})();