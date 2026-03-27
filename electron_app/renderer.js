const startBtn = document.getElementById('startBtn');
const resultEl = document.getElementById('result');

startBtn.addEventListener('click', async () => {
  const data = {
    showName: document.getElementById('showName').value,
    targetWeekIndex: Number(document.getElementById('targetWeekIndex').value),
    targetDayIndex: Number(document.getElementById('targetDayIndex').value),
    targetTime: document.getElementById('targetTime').value,
    startHour: Number(document.getElementById('startHour').value),
    startMinute: Number(document.getElementById('startMinute').value),
  };

  console.log('입력값:', data);
  resultEl.innerText = '실행 중...';

  try {
    const result = await window.api.startReservation(data);

    if (result.success) {
      resultEl.innerText = '✅ 성공: ' + result.message;
    } else {
      resultEl.innerText = '❌ 실패: ' + result.message;
    }
  } catch (err) {
    console.error('renderer 오류:', err);
    resultEl.innerText = '❌ 오류 발생: ' + (err?.message || String(err));
  }
});