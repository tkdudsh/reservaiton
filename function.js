// const { chromium } = require('playwright');
import { chromium } from 'playwright';
import { waitUntil } from './waitUntil.js';
import { subtractMsFromTime } from './subtractMsFromTime.js';

(async () => {
  try {
    const browser = await chromium.launch({headless:false});
    const page= await browser.newPage();
    const RESERVATION_URL = 'https://pcmap.place.naver.com/place/1163403341/ticket';
    const SHOW_NAME = '빛을 구해줘';
    const TARGET_DATE = '25';
    const TARGET_TIME = '오후 3:00';
    const startTime = {
        hour: 18,
            minute: 13,
            second: 0,
            ms:0
        };
    const waitTime = subtractMsFromTime(startTime, 500);
    // const idSelector = '#input_item_id #id';
    // const idInput = 'syn_1234';
    // const pwSelector = '#input_item_pw #pw';
    // const pwInput = ;

    
    //await page.goto('https://nid.naver.com/nidlogin.login?mode=form&url=https://www.naver.com/');

    // await page.fill(idSelector, idInput);
    // await page.waitForTimeout(100);
    // await page.fill(pwSelector, pwInput);
    // await page.waitForTimeout(100);
    // await page.keyboard.press('Enter');
    // // await log.addLog("로그인 성공");
    // await page.waitForTimeout(100);


    // console.log('직접 로그인하세요.');

    // // 2. 로그인 완료될 때까지 기다리기
    // // 네이버 메인으로 이동하거나, 로그인 상태 요소가 나타날 때까지 기다리는 방식
    // await page.waitForURL('https://www.naver.com/**', { timeout: 120000 });

    // console.log('로그인 완료됨');
    
    await page.goto(RESERVATION_URL);

    // await page.locator('span.lsthu', { hasText: SHOW_NAME }).click();
    // await page.waitForTimeout(300);

    const showBtn = page.locator('span.lsthu', { hasText: SHOW_NAME });
    await showBtn.waitFor({ state: 'visible' });
    await showBtn.click();

    console.log('지정 시간까지 대기 중...');
    await waitUntil(waitTime);

    await page.reload({ waitUntil: 'domcontentloaded' }); //새로고침.탭
    // await page.waitForTimeout(400);


    // await page.locator('button.calendar_date', { hasText: TARGET_DATE }).click();
    // await page.waitForTimeout(500);
    const dateBtn = page.locator('button.calendar_date', { hasText: TARGET_DATE });
    await dateBtn.waitFor({ state: 'visible' });
    await dateBtn.click();
    
    

    // await page.locator('button.btn_time', { hasText: TARGET_TIME }).click();
    // await page.waitForTimeout(500);
    const timeBtn = page.locator('button.btn_time', { hasText: TARGET_TIME });
    await timeBtn.waitFor({ state: 'visible' });
    await timeBtn.click();
    

    // await page.locator('button', { hasText: '다음' }).click();
    // await page.waitForSelector('button');
    const next1Btn = page.locator('button', { hasText: '다음' });
    await next1Btn.waitFor({ state: 'visible' });
    await next1Btn.click();


     // await page.locator('button', { hasText: '동의하고 예약하기' }).click();
    // await page.waitForTimeout(300);
    // const fianlBtn = page.locator('button', { hasText: '동의하고 예약하기' });
    // await fianlBtn.waitFor({ state: 'visible' });
    // await fianlBtn.click();

    
  } catch (error) {
    console.error(error);
  }
})();