const TrackingPage = require('../../pageObjects/ASN/tracking.page');
const TestDataManager = require('../../utils/testDataManager');
const {
  clickButtonInContainer,
  enterText,
  scrollToText,
  waitForElementToBeVisible,
  FakeScan,
  assertElementVisibleAndExists,
  startVideoRecording,
  stopVideoRecordingAndSave
} = require('../../utils/uiHelpers');

const trackingData = TestDataManager.getTrackingData();

const _editTextSelector = 'android=new UiSelector().className("android.widget.EditText").instance(0)';
const _itemLabelSelector = 'android=new UiSelector().text("Item:")';
const _viewGroupSelector = 'android=new UiSelector().className("android.view.ViewGroup").instance(11)';
const _siguienteButtonSelector = 'android=new UiSelector().text("SIGUIENTE")';
const _regresarAlMenuSelector = 'android=new UiSelector().text("REGRESAR AL MENÚ")';
const _warningItemtSelector = 'android=new UiSelector().text("Ingresa un número de item válido")';

describe('📦 Tracking ventanilla', () => {

  for (const { trackingNumber, scanCode } of trackingData.validItem) {
    it(`✅ Flujo Tracking ventanilla para tracking #${trackingNumber}`, async () => {
      const videoName = `TrackingVentanilla_Valid_${trackingNumber}`;
      await startVideoRecording('ASN/tracking'); // ⬅️ INICIO VIDEO

      try {
        await scrollToText("Tracking de ventanilla");
        await browser.pause(1500);

        await TrackingPage.iniciarFlujoTracking(trackingNumber);

        await FakeScan(scanCode);
        await waitForElementToBeVisible(_itemLabelSelector, 10000);

        await FakeScan(scanCode);
        await assertElementVisibleAndExists(_viewGroupSelector, 10000);

        await waitForElementToBeVisible(_itemLabelSelector, 10000);
        await FakeScan(scanCode);

        await TrackingPage.continuarYSalir();

      } finally {
        await stopVideoRecordingAndSave(videoName); // ⬅️ FIN VIDEO
      }
    });
  }

  it('❌ Tracking item inválido', async () => {
    const videoName = `TrackingVentanilla_Invalido`;
    await startVideoRecording('ASN/tracking'); // ⬅️ INICIO VIDEO

    try {
      const { trackingNumber } = trackingData.invalidItem;

      await scrollToText("Tracking de ventanilla");
      await browser.pause(1500);

      await clickButtonInContainer("Tracking de ventanilla");
      await browser.pause(1500);
      await enterText(_editTextSelector, trackingNumber);
      await clickButtonInContainer("BUSCAR");

      await assertElementVisibleAndExists(_warningItemtSelector, 10000);

    } finally {
      await stopVideoRecordingAndSave(videoName); // ⬅️ FIN VIDEO
    }
  });

});
