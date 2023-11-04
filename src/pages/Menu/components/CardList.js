import * as React from "react";

export default function CardList(props) {
  return (
    <div className="px-5">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch w-3/12 max-md:w-full max-md:ml-0">
          <div className="rounded shadow-sm bg-white flex w-full max-w-[278px] grow flex-col mx-auto pb-6 max-md:mt-2.5">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/4aa0c1c6-df65-4654-af26-cd32faceebe3?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/4aa0c1c6-df65-4654-af26-cd32faceebe3?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4aa0c1c6-df65-4654-af26-cd32faceebe3?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/4aa0c1c6-df65-4654-af26-cd32faceebe3?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/4aa0c1c6-df65-4654-af26-cd32faceebe3?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4aa0c1c6-df65-4654-af26-cd32faceebe3?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/4aa0c1c6-df65-4654-af26-cd32faceebe3?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/4aa0c1c6-df65-4654-af26-cd32faceebe3?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&"
              className="aspect-[0.9] object-contain object-center w-full overflow-hidden self-stretch"
            />
            <div className="bg-white self-stretch flex w-full flex-col px-6 py-8 max-md:px-5">
              <div className="text-gray-700 text-2xl leading-9 tracking-wide self-stretch whitespace-nowrap">
                Get Waves
              </div>
              <div className="text-gray-700 text-base leading-6 tracking-normal self-stretch whitespace-nowrap mt-2">
                Make SVG waves
              </div>
              <div className="self-stretch flex w-full items-start justify-between gap-5 mt-36 max-md:mt-10">
                <div className="text-gray-700 text-sm leading-6 tracking-normal self-start">
                  website
                </div>
                <div className="text-gray-700 text-right text-sm leading-6 tracking-normal whitespace-nowrap self-start">
                  https://getwaves.io/
                </div>
              </div>
            </div>
            <div className="text-white text-center text-sm leading-6 tracking-normal self-center whitespace-nowrap rounded bg-fuchsia-700 w-[230px] max-w-full mt-8 pl-20 pr-20 py-3.5 max-md:px-5">
              Add to Cart
            </div>
          </div>
        </div>
        <div className="flex flex-col items-stretch w-3/12 ml-5 max-md:w-full max-md:ml-0">
          <div className="rounded shadow-sm bg-white flex w-full max-w-[278px] grow flex-col mx-auto pb-6 max-md:mt-2.5">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/fdb29464-15b1-492d-af9b-e92cb5d78c8c?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/fdb29464-15b1-492d-af9b-e92cb5d78c8c?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/fdb29464-15b1-492d-af9b-e92cb5d78c8c?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/fdb29464-15b1-492d-af9b-e92cb5d78c8c?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/fdb29464-15b1-492d-af9b-e92cb5d78c8c?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/fdb29464-15b1-492d-af9b-e92cb5d78c8c?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/fdb29464-15b1-492d-af9b-e92cb5d78c8c?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/fdb29464-15b1-492d-af9b-e92cb5d78c8c?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&"
              className="aspect-[0.9] object-contain object-center w-full overflow-hidden self-stretch"
            />
            <div className="bg-white self-stretch flex w-full flex-col pl-6 pr-6 py-8 max-md:px-5">
              <div className="text-gray-700 text-2xl leading-9 tracking-wide self-stretch whitespace-nowrap">
                unDraw
              </div>
              <div className="text-gray-700 text-sm leading-6 tracking-normal self-stretch mt-2.5">
                A constantly updated design project with beautiful SVG
                images that you can use completely free and without
                attribution.
              </div>
              <div className="self-stretch flex w-full items-start justify-between gap-5 mt-16 max-md:mt-10">
                <div className="text-gray-700 text-sm leading-6 tracking-normal self-start">
                  website
                </div>
                <div className="text-gray-700 text-right text-sm leading-6 tracking-normal whitespace-nowrap self-start">
                  https://undraw.co/
                </div>
              </div>
            </div>
            <div className="text-white text-center text-sm leading-6 tracking-normal self-center whitespace-nowrap rounded bg-fuchsia-700 w-[230px] max-w-full mt-8 pl-20 pr-20 py-3.5 max-md:px-5">
              Add to Cart
            </div>
          </div>
        </div>
        <div className="flex flex-col items-stretch w-3/12 ml-5 max-md:w-full max-md:ml-0">
          <div className="rounded shadow-sm bg-white flex w-full max-w-[278px] grow flex-col mx-auto pb-6 max-md:mt-2.5">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/9f56bcb1-475c-4693-b805-2fd0e197aa2b?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/9f56bcb1-475c-4693-b805-2fd0e197aa2b?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9f56bcb1-475c-4693-b805-2fd0e197aa2b?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/9f56bcb1-475c-4693-b805-2fd0e197aa2b?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/9f56bcb1-475c-4693-b805-2fd0e197aa2b?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9f56bcb1-475c-4693-b805-2fd0e197aa2b?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/9f56bcb1-475c-4693-b805-2fd0e197aa2b?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/9f56bcb1-475c-4693-b805-2fd0e197aa2b?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&"
              className="aspect-[0.9] object-contain object-center w-full overflow-hidden self-stretch"
            />
            <div className="bg-white self-stretch flex w-full flex-col px-6 py-8 max-md:px-5">
              <div className="text-gray-700 text-2xl leading-9 tracking-wide self-stretch whitespace-nowrap">
                Icons8
              </div>
              <div className="text-gray-700 text-base leading-6 tracking-normal self-stretch mt-2.5">
                Free icons, photos,vectors, music, and tools
              </div>
              <div className="self-stretch flex w-full items-start justify-between gap-5 mt-28 max-md:mt-10">
                <div className="text-gray-700 text-sm leading-6 tracking-normal self-start">
                  website
                </div>
                <div className="text-gray-700 text-right text-sm leading-6 tracking-normal whitespace-nowrap self-start">
                  https://icons8.com/
                </div>
              </div>
            </div>
            <div className="text-white text-center text-sm leading-6 tracking-normal self-center whitespace-nowrap rounded bg-fuchsia-700 w-[230px] max-w-full mt-8 pl-20 pr-20 py-3.5 max-md:px-5">
              Add to Cart
            </div>
          </div>
        </div>
        <div className="flex flex-col items-stretch w-3/12 ml-5 max-md:w-full max-md:ml-0">
          <div className="rounded shadow-sm bg-white flex w-full max-w-[278px] grow flex-col mx-auto pb-6 max-md:mt-2.5">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/45fd33d1-2578-44e7-af37-15b0b29974ae?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/45fd33d1-2578-44e7-af37-15b0b29974ae?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/45fd33d1-2578-44e7-af37-15b0b29974ae?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/45fd33d1-2578-44e7-af37-15b0b29974ae?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/45fd33d1-2578-44e7-af37-15b0b29974ae?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/45fd33d1-2578-44e7-af37-15b0b29974ae?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/45fd33d1-2578-44e7-af37-15b0b29974ae?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/45fd33d1-2578-44e7-af37-15b0b29974ae?apiKey=a5dae22cf52e4d4cb9170c6381cc86b6&"
              className="aspect-[0.9] object-contain object-center w-full overflow-hidden self-stretch"
            />
            <div className="bg-white self-stretch flex w-full flex-col pl-6 pr-6 py-8 max-md:px-5">
              <div className="text-gray-700 text-2xl leading-9 tracking-wide self-stretch whitespace-nowrap">
                looka
              </div>
              <div className="text-gray-700 text-base leading-6 tracking-normal self-stretch mt-2.5">
                Looka Logo Maker combines your logo design preferences
                with Artificial Intelligence to help you create a
                custom logo you'll love. All it takes is a few clicks
                and five minutes.
              </div>{" "}
              <div className="self-stretch flex w-full items-start justify-between gap-5 mt-4">
                <div className="text-gray-700 text-sm leading-6 tracking-normal self-start">
                  website
                </div>{" "}
                <div className="text-gray-700 text-right text-sm leading-6 tracking-normal whitespace-nowrap self-start">
                  https://looka.com/
                </div>
              </div>
            </div>{" "}
            <div className="text-white text-center text-sm leading-6 tracking-normal self-center whitespace-nowrap rounded bg-fuchsia-700 w-[230px] max-w-full mt-8 pl-20 pr-20 py-3.5 max-md:px-5">
              Add to Cart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
