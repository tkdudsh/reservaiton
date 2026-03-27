import { chromium } from 'playwright';
import { waitUntil } from './waitUntil.js';
import { subtractMsFromTime } from './subtractMsFromTime.js';

export async function runReservation({
  reservationUrl = 'https://pcmap.place.naver.com/place/1163403341/ticket',
  showName,
  targetWeekIndex,
  targetDayIndex,
  targetTime,
  startHour,
  startMinute
}) {
  try {
    if (!showName || !targetTime) {
      throw new Error('showName, targetTime 값이 필요합니다.');
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

    const waitTime = subtractMsFromTime(startTime, 100);

    console.log('예약 실행 시작');
    console.log('예약 정보:', {
      reservationUrl,
      showName,
      targetTime,
      startTime,
      waitTime
    });

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

// await page.goto('https://nid.naver.com/nidlogin.login?mode=form&url=https://www.naver.com/');

//     console.log('직접 로그인하세요.');

//     // 2. 로그인 완료될 때까지 기다리기
//     // 네이버 메인으로 이동하거나, 로그인 상태 요소가 나타날 때까지 기다리는 방식
//     await page.waitForURL('https://www.naver.com/**', { timeout: 120000 });

//     console.log('로그인 완료됨');

    // 1. 예약 페이지 이동
    await page.goto(reservationUrl, { waitUntil: 'domcontentloaded' });

    // 2. 공연 선택
    const showBtn = page.locator('span.lsthu', { hasText: showName });
    await showBtn.waitFor({ state: 'visible' });
    await showBtn.click();
    
    // 3. 지정 시간까지 대기
    console.log('지정 시간까지 대기 중...');
    await waitUntil(waitTime);

    // 4. 새로고침
    console.log('새로고침 실행');
    await page.reload({ waitUntil: 'domcontentloaded' });

    // 5. 날짜 선택
    const targetBtn = page
  .locator('tbody.calendar_body > tr')
  .nth(Number(targetWeekIndex) - 1)   // 주차 선택
  .locator('td')
  .nth(Number(targetDayIndex) - 1)  // 왼쪽부터 일 선택
  .locator('button.calendar_date');
await targetBtn.waitFor({ state: 'visible' });
    await targetBtn.click();

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