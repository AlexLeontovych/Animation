(async () => {
  const canvas = document.querySelector('.background__snow');
  
  const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#02054d',
    view: canvas,
    antialias: true,
    autoDensity: true,
    resolution: window.devicePixelRatio || 1
  };

  const app = new PIXI.Application();
  await app.init(config);

  const textures = [];
  const totalFlakes = 280;
  const flakes = [];

  const texture1 = await PIXI.Assets.load('./assets/flake1.png');
  textures.push(texture1);

  function createFlake() {
    const texture = textures[Math.floor(Math.random() * textures.length)];
    const snowflake = new PIXI.Sprite(texture);

    const scale = Math.random() * 0.3 + 0.1;
    snowflake.scale.set(scale);
    snowflake.x = Math.random() * app.screen.width;
    snowflake.y = Math.random() * app.screen.height;
    snowflake.alpha = Math.random() * 0.5 + 0.5;
    snowflake.speed = Math.random() * 4 + 1;
    snowflake.waweSpeed = Math.random() * 50 + 50;
    snowflake.waweSize = Math.random() * 0.5 + 0.25;

    app.stage.addChild(snowflake);
    flakes.push(snowflake);
  }

  for (let i = 0; i < totalFlakes; i++) {
    createFlake();
  }

  let resizeTimeout;
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const container = canvas.parentElement;
      const newWidth = container ? container.clientWidth : window.innerWidth;
      const newHeight = container ? container.clientHeight : window.innerHeight;
      
      app.renderer.resize(newWidth, newHeight);
      
      flakes.forEach((flake) => {
        if (flake.x > newWidth) {
          flake.x = Math.random() * newWidth;
        }
        if (flake.y > newHeight) {
          flake.y = Math.random() * newHeight;
        }
      });
    }, 100);
  }

  window.addEventListener('resize', handleResize);
  
  window.addEventListener('orientationchange', () => {
    setTimeout(handleResize, 200);
  });

  app.ticker.add(() => {
    const delta = app.ticker.deltaMS;

    flakes.forEach((flake) => {
      flake.y += flake.speed * delta / 20;
      flake.x += Math.sin(flake.y / flake.waweSpeed) * flake.waweSize * delta / 20;

      if (flake.y > app.screen.height) {
        flake.y = -flake.height;
        flake.x = Math.random() * app.screen.width;
      }

      if (flake.x > app.screen.width + flake.width) {
        flake.x = -flake.width;
      } else if (flake.x < -flake.width) {
        flake.x = app.screen.width + flake.width;
      }
    });
  });
})();
