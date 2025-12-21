"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { XMark } from "@medusajs/icons"
import { Fragment } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SideMenuItems = {
  HOME: "/",
  STORE: "/store",
  ACCOUNT: "/account",
  BAG: "/cart",
}

const SideMenu = () => {
  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none active:outline-none active:ring-0 select-none tap-highlight-none hover:text-ui-fg-muted"
                >
                  MENU
                </Popover.Button>
              </div>
              {open && (
                <div
                  className="fixed inset-0 z-[50] bg-black/20 pointer-events-auto"
                  onClick={close}
                  data-testid="side-menu-backdrop"
                />
              )}

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in duration-150"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <PopoverPanel className="fixed right-0 top-0 h-screen w-full sm:w-[400px] z-[51] bg-white text-black shadow-none border-l border-ui-border-base">

                  <div className="flex flex-col h-full p-6 justify-between">

                    <div className="flex justify-end mb-8">
                      <button
                        data-testid="close-menu-button"
                        onClick={close}
                        className="focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none active:outline-none active:ring-0 select-none hover:text-ui-fg-muted transition-colors"
                      >
                        <XMark />
                      </button>
                    </div>

                    <ul className="flex flex-col gap-4 items-start justify-start flex-grow">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name} className="w-full">
                            <LocalizedClientLink
                              href={href}
                              className="custom-link block w-full text-4xl uppercase tracking-tighter"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul>

                    <div className="flex flex-col gap-y-2 border-t border-ui-border-base pt-4">
                      <p className="text-xs uppercase tracking-widest text-gray-500">
                        Items Shipped From Maui, Hawai'i
                      </p>
                    </div>

                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
