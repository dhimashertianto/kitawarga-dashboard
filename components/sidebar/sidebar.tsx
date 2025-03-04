import { Avatar, Tooltip } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { CategoryListIcon } from "../icons/sidebar/category-list-icon";
import { EmployeeCardIcon } from "../icons/sidebar/employee-card-icon";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { Person2Icon } from "../icons/sidebar/person2";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { VerticalDotsIcon } from "../icons/sidebar/three-dots-vertical";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { useSidebarContext } from "../layout/layout-context";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { Sidebar } from "./sidebar.styles";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <div className="flex items-center justify-between">KITA WARGA</div>
          {/* <CompaniesDropdown /> */}
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Admin">
              <SidebarItem
                isActive={pathname === "/accounts"}
                title="Perumahan"
                icon={<AccountsIcon />}
                href="accounts"
              />
              <SidebarItem
                isActive={pathname === "/category"}
                title="Kategori Transaksi"
                icon={<CategoryListIcon />}
                href="category"
              />
              <SidebarItem
                isActive={pathname === "/rt"}
                title="RT"
                icon={<ViewIcon />}
                href="rt"
              />
              <SidebarItem
                isActive={pathname === "/rw"}
                title="RW"
                icon={<ViewIcon />}
                href="rw"
              />
            </SidebarMenu>
            <SidebarMenu title="Data">
              <SidebarItem
                isActive={pathname === "/data-warga"}
                title="Data Warga"
                icon={<Person2Icon />}
                href="data-warga"
              />
              <SidebarItem
                isActive={pathname === "/data-karyawan"}
                title="Data Karyawan"
                icon={<EmployeeCardIcon />}
                href="data-karyawan"
              />
            </SidebarMenu>
            <SidebarMenu title="Pemasukan">
              <SidebarItem
                isActive={pathname === "/revenue"}
                title="Kas Masuk"
                icon={<PaymentsIcon />}
                href="revenue"
              />
            </SidebarMenu>
            <SidebarMenu title="Pengeluaran">
              <SidebarItem
                isActive={pathname === "/paycheck"}
                title="Gaji"
                icon={<BalanceIcon />}
                href="/paycheck"
              />
              <SidebarItem
                isActive={pathname === "/loans"}
                title="Kas Bon"
                icon={<PaymentsIcon />}
                href="/loans"
              />
              <SidebarItem
                isActive={pathname === "/others"}
                title="Lain - Lain"
                icon={<VerticalDotsIcon />}
                href="/others"
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
