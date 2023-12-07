import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  QueueListIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

export default function InstructionModal({ open, setOpen, isMobile }) {
  const navigate = useNavigate();
  const handleDontShowAgain = () => {
    setOpen(false);
    localStorage.setItem("isUserNew", true);
  };
  const cancelButtonRef = useRef(null);
  const handleReadInstructionsClick = () => {
    setOpen(false);
    navigate("/instructions");
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[999]"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-orange-100 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10 my-auto">
                      {isMobile ? (
                        <ComputerDesktopIcon
                          className="h-6 w-6 text-[#DAB830]"
                          aria-hidden="true"
                        />
                      ) : (
                        <QueueListIcon
                          className="h-6 w-6 text-[#DAB830]"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      ></Dialog.Title>
                      <div className="mt-2">
                        {isMobile ? (
                          <p className="text-sm text-gray-500">
                            For best experience please open this page on a
                            desktop
                          </p>
                        ) : (
                          <p className="text-sm text-gray-500">
                            It is recommended to read instructions before usage.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {!isMobile && (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-[#DAB830] px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto"
                      onClick={handleReadInstructionsClick}
                    >
                      Read Instuctions
                    </button>
                  )}
                  <button
                    type="button"
                    className=" inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleDontShowAgain}
                    ref={cancelButtonRef}
                  >
                    {isMobile ? "Continue" : "Don't show again"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
