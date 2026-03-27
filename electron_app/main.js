ipcMain.handle('start-reservation', async (event, data) => {
  try {
    console.log('renderer에서 받은 값:', data);
    const result = await runReservation(data);
    return result;
  } catch (error) {
    console.error('main 오류:', error);
    return {
      success: false,
      message: error.message || String(error)
    };
  }
});