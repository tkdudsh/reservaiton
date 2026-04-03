import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://m.booking.naver.com/booking/12/bizes/1060776/items/5585584?area=bmp&lang=ko&service-target=map-pc&startDateTime=2026-04-03T00%3A00%3A00%2B09%3A00&theme=place');

  const start = Date.now();
  await page.reload({ waitUntil: 'domcontentloaded' });
  const end = Date.now();

  console.log(`새로고침 완료까지 ${end - start}ms`);

  // 바로 닫히는 거 막고 싶으면 잠깐 대기
  await page.waitForTimeout(5000);

  await browser.close();
})();