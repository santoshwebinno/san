import Image from 'next/image';

export default function ChatBox({ config }: any) {
    return (
      <div
        className="w-[90%] h-[40%] rounded-lg p-4 relative shadow-lg"
        style={{ backgroundColor: config.colors.backgroundLight }}
      >
        {/* Chat Button */}
        <div
          className="absolute bottom-2 right-2 rounded-full p-2 bg-purple-600 cursor-pointer"
          style={{ backgroundColor: config.colors.buttoncolor }}
        >
          {/* Chat bubble icon */}
          <div
            className="h-6 w-6 rounded-full flex justify-center items-center"
            style={{ backgroundColor: config.colors.buttoncolor }}
          >
            <Image src={'/signup/chatpopup.svg'} alt="chatpopup" width={29} height={27}></Image>
          </div>
        </div>

        {/* Chat messages */}
        <div
          className="mb-4 mx-auto p-3 rounded-lg shadow-xl"
          style={{ backgroundColor: config.colors.backgroundLight }}
        >
          {/* First message */}
          <div className="flex items-center mb-2">
            <div className="rounded-full flex items-center justify-center text-white">
              <Image src="/signup/chaticon.svg" alt="Assistant Avatar" height={32} width={32} />
            </div>
            <div
              className="ml-2 p-2 bg-gray-200 rounded-lg"
              style={{ backgroundColor: config.colors.primary }}
            >
              Ready for the Generative AI revolution?
            </div>
          </div>

          {/* User response */}
          <div className="flex items-center mb-2">
            <div
              className="ml-auto p-2 rounded-lg text-white"
              style={{ backgroundColor: config.colors.secondary }}
            >
              Yes
            </div>
            <div className="rounded-full h-8 w-8 bg-gray-400 ml-2 flex items-center justify-center text-white">
              J
            </div>
          </div>

          {/* Assistant reply */}
          <div className="flex items-center">
            <div className="rounded-full flex items-center justify-center text-white">
              <Image src="/signup/chaticon.svg" alt="Assistant Avatar" height={32} width={32} />
            </div>
            <div
              className="ml-2 p-2 bg-gray-200 rounded-lg"
              style={{ backgroundColor: config.colors.primary }}
            >
              Here we go!
            </div>
          </div>

          {/* Input area */}
          <div className="flex items-center mt-4 border rounded-lg">
            <input
              className="w-full p-2 border-gray-300 rounded-lg focus:outline-none"
              type="text"
              placeholder="Ask a question..."
              style={{ borderColor: config.colors.primary }}
            />
            <button className="ml-2 p-2 rounded-lg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.34407 2.24507C2.49334 2.1154 2.6777 2.03289 2.87384 2.00797C3.06999 1.98306 3.26912 2.01684 3.44607 2.10507L21.4461 11.1051C21.6125 11.188 21.7525 11.3157 21.8503 11.4738C21.9482 11.6319 22 11.8141 22 12.0001C22 12.186 21.9482 12.3682 21.8503 12.5263C21.7525 12.6844 21.6125 12.8121 21.4461 12.8951L3.44607 21.8951C3.26914 21.9836 3.06991 22.0177 2.87362 21.9929C2.67732 21.9682 2.49277 21.8858 2.34332 21.7562C2.19386 21.6265 2.08623 21.4554 2.03403 21.2646C1.98183 21.0738 1.98741 20.8717 2.05007 20.6841L4.61207 13.0001H9.99907C10.2643 13.0001 10.5186 12.8947 10.7062 12.7072C10.8937 12.5196 10.9991 12.2653 10.9991 12.0001C10.9991 11.7348 10.8937 11.4805 10.7062 11.293C10.5186 11.1054 10.2643 11.0001 9.99907 11.0001H4.61207L2.04907 3.31607C1.98673 3.12848 1.98139 2.92662 2.03372 2.736C2.08605 2.54538 2.1947 2.37454 2.34407 2.24507Z"
                  fill={config.colors.buttoncolor}
                />
              </svg>
            </button>
          </div>
          <div className="items-center justify-center my-auto gap-1 flex text-xs text-gray-400 mt-2 text-center p-1">
            Powered by{' '}
            <Image
              src={'signup/chatnorglogo.svg'}
              width={53}
              height={14}
              alt={'Norg logo'}
              className="pt-2"
            />
          </div>
        </div>
      </div>
    );
}
