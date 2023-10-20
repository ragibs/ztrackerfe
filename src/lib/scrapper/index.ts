import axios from "axios";
import puppeteer from "puppeteer";

export async function scrappedZaraProduct(url: string) {
  if (!url) return;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36",
      "upgrade-insecure-requests": "1",
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9,en;q=0.8",
    });
    await page.goto(url);

    let all_p_elements = await page.$x(
      `//*[@id="main"]/article/div[2]/div[1]/div[2]/div/div[2]/div[1]/p`
    );

    console.log(all_p_elements);

    await browser.close();
  } catch (error: any) {
    console.log(error);
  }
}
