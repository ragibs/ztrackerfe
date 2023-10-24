import puppeteer from "puppeteer";

type availableSizes = {
  size: string;
  stock: string;
};

//date function

const now = new Date();
const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
  timeZoneName: "short",
};

const formattedDate = now.toLocaleString("en-US", options);

export async function scrappedZaraProduct(url: string) {
  if (!url) return;

  try {
    const browser = await puppeteer.launch({ headless: false });
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

    //is there a product varient? if so which one is selected?
    const colors: string[] = [];

    await page
      .evaluate(() => {
        const colorVariants = document.querySelectorAll<HTMLElement>(
          ".product-detail-color-selector__color-area > span"
        );

        return Array.from(colorVariants).map((i: HTMLElement) => i.innerText);
      })
      .then((FindColorVariants) => {
        colors.push(...FindColorVariants);
      });
    //get sale price

    const salePrice = await page.evaluate(
      () =>
        document.querySelector<HTMLElement>(
          "span.price-current__amount > div > span"
        )?.innerText
    );

    // get retail price
    const retailPrice = await page.evaluate(
      () =>
        document.querySelector<HTMLElement>(
          " span.price__amount--old-price-wrapper > span > div > span"
        )?.innerText
    );

    //get product id
    const productId = await page.evaluate(() =>
      document
        .querySelector<HTMLElement>("div.product-detail-info__actions > p")
        ?.innerText.split("|")[1]
        .trim()
    );

    //get all type of sizes
    const sizes: availableSizes[] = [];

    await page
      .evaluate(() => {
        const sizeVariants = document.querySelectorAll<HTMLElement>(
          ".size-selector__size-list > li"
        );

        return Array.from(sizeVariants).map((size) => {
          if (
            size.classList.contains(
              "size-selector__size-list-item--is-disabled"
            )
          ) {
            return {
              size: size.innerText.split(`\n`)[0].trim(),
              stock: "outofstock",
            };
          } else {
            return {
              size: size.innerText.split(`\n`)[0].trim(),
              stock: "instock",
            };
          }
        });
      })
      .then((sizeVariants) => {
        sizes.push(...sizeVariants);
      });

    //get instock or out of stock

    console.log(
      retailPrice,
      salePrice,
      colors,
      productId,
      sizes,
      formattedDate
    );

    await browser.close();
  } catch (error: any) {
    console.log(error);
  }
}
