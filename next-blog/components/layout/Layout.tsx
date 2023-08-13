import {PropsWithChildren} from "react";
import MainNavigation from "@/components/layout/MainNavigation";

function Layout(props: PropsWithChildren) {
  return (
    <>
      <MainNavigation />
      <main>
        {props.children}
      </main>
    </>
  )
}

export default Layout;
