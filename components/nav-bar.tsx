"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "@/components/theme-toggle"

export function NavBar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-8">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/">Message String Table</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/emoticon">Emoticon Table</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
