import { chromium } from 'playwright';
import { waitUntil } from './waitUntil.js';
import { subtractMsFromTime } from './subtractMsFromTime.js';

export async function runReservation({
  reservationUrl = 'https://pcmap.place.naver.com/place/1163403341/ticket',
  showName,
  targetDate,
  targetTime,
  startHour,
  startMinute
}) {
  try {
    if (!showName || !targetDate || !targetTime) {
      throw new Error('showName, targetDate, targetTime 값이 필요합니다.');
    }

    if (
      startHour === undefined ||
      startMinute === undefined ||
      Number.isNaN(Number(startHour)) ||
      Number.isNaN(Number(startMinute))
    ) {
      throw new Error('startHour, startMinute는 숫자로 입력해야 합니다.');
    }

    const startTime = {
      hour: Number(startHour),
      minute: Number(startMinute),
      second: 0,
      ms: 0
    };

    const waitTime = subtractMsFromTime(startTime, 500);

    console.log('예약 실행 시작');
    console.log('예약 정보:', {
      reservationUrl,
      showName,
      targetDate,
      targetTime,
      startTime,
      waitTime
    });

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    // 1. 예약 페이지 이동
    await page.goto(reservationUrl, { waitUntil: 'domcontentloaded' });

    // 2. 공연 선택
    const showBtn = page.locator('span.item_txt', { hasText: showName });
    await showBtn.waitFor({ state: 'visible' });
    await showBtn.click();

    // 3. 지정 시간까지 대기
    console.log('지정 시간까지 대기 중...');
    await waitUntil(waitTime);

    // 4. 새로고침
    console.log('새로고침 실행');
    await page.reload({ waitUntil: 'domcontentloaded' });

    // 5. 날짜 선택
    const dateBtn = page.locator('button.calendar_date', { hasText: targetDate });
    await dateBtn.waitFor({ state: 'visible' });
    await dateBtn.click();
    console.log('날짜 클릭 완료');

    // 6. 시간 선택
    const timeBtn = page.locator('button.btn_time', { hasText: targetTime });
    await timeBtn.waitFor({ state: 'visible' });
    await timeBtn.click();
    console.log('시간 클릭 완료');

    // 7. 다음 버튼
    const nextBtn = page.locator('button', { hasText: '다음' });
    await nextBtn.waitFor({ state: 'visible' });
    await nextBtn.click();
    console.log('다음 버튼 클릭 완료');

    return {
      success: true,
      message: '예약 프로세스 실행 완료'
    };
  } catch (error) {
    console.error('runReservation 오류:', error);

    return {
      success: false,
      message: error.message
    };
  }
}