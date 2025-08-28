const { exec } = require('child_process');

console.log('Iniciando emulador...');
exec(`${process.env.ANDROID_SDK_ROOT}\\emulator\\emulator.exe @Pixel_3a`, (err) => {
  if (err) {
    console.error('Error al iniciar el emulador:', err);
    return;
  }
});

function waitForBoot() {
  exec('adb -s emulator-5554 shell getprop sys.boot_completed', (err, stdout) => {
    if (stdout && stdout.trim() === '1') {
      console.log('Emulador listo, puedes iniciar las pruebas.');
    } else {
      console.log('Esperando a que el emulador arranque...');
      setTimeout(waitForBoot, 5000);
    }
  });
}

waitForBoot();
