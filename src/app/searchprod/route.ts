import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

type availableSizes = {
  size: string;
  stock: string;
};

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

export async function POST(request: Request) {
  const { searchPrompt: userSearch } = await request.json();

  if (!userSearch) {
    return NextResponse.json(
      { error: "Search parameter not provided" },
      { status: 400 }
    );
  }

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: "new",
    });
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
    await page.goto(userSearch);

    //find the cover photo

    const productImg = await page.evaluate(() =>
      document
        .querySelector<HTMLElement>(
          "div.product-detail-images__frame > ul > li:nth-child(1) > button > div > div > picture > img"
        )
        ?.getAttribute("src")
    );

    //get sale price

    const title = await page.evaluate(
      () =>
        document.querySelector<HTMLElement>(
          "div.product-detail-info__header > h1"
        )?.innerText
    );

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
    const productId = await page.evaluate(() => {
      const product = document
        .querySelector<HTMLElement>("div.product-detail-info__actions > p")
        ?.innerText.split("|")[1]
        .trim();

      return product;
    });

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
    let product = [];
    console.log(productId);
    product.push({
      link: userSearch,
      title: title,
      img: productImg,
      retailPrice: retailPrice,
      salesPrice: salePrice,
      colors: colors,
      productId: productId,
      sizes: sizes,
      dateAdded: formattedDate,
    });
    return NextResponse.json({ product });
  } catch (error: any) {
    return NextResponse.json(
      { error: `An error occurred: ${error.message}` },
      { status: 200 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
