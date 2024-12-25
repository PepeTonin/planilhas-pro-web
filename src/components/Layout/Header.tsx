import { useRouter } from "next/navigation";
import Image from "next/image";

import logo from "@/assets/logo.png";
import headerMenu from "@/assets/imagens/menu-header.png";
import SearchBox from "../SearchBox";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setIsManagementSelected,
  setAccordionGroupOpened,
  setItemSubGroupSelected,
} from "@/store/features/sidebarSlice";

export default function Header() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  function handleLogoClick() {
    dispatch(setIsManagementSelected(false));
    dispatch(setAccordionGroupOpened(-1));
    dispatch(setItemSubGroupSelected({ parentId: -1, itemId: -1 }));
    router.push("/");
  }

  return (
    <header className="flex flex-row h-20 min-h-20 border-b border-gray-light">
      <div className="w-60 flex justify-center items-center border-r border-gray-light">
        <button className="cursor-pointer" onClick={handleLogoClick}>
          <Image src={logo} alt="App logo" width={186} height={35} />
        </button  >
      </div>
      <div className="flex-1 flex flex-row items-center px-6 justify-between gap-6">
        <SearchBox />
        <Image
          src={headerMenu}
          alt="header menu placeholder"
          width={288}
          height={39}
        />
      </div>
    </header>
  );
}
