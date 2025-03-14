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
import { AdminConst, SuperAdminConst } from "@/constants/constants";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  const [role, setRole] = useState<string | string>("warga");

  useEffect(() => {
    const role = Cookies.get("role");
    setRole(role || "warga");
    
  }, []);

  const isAdminOrSuperAdmin = (role: string): role is typeof AdminConst | typeof SuperAdminConst => {
    return role === AdminConst || role === SuperAdminConst;
  };

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
              isActive={pathname === "/home"}
              href="/home"
            />
            <SidebarMenu title="Pembayaran">
              <SidebarItem
                isActive={pathname === "/payment"}
                title="Bayar Iuran"
                icon={<PaymentsIcon />}
                href="payment"
              />
             </SidebarMenu>
             <SidebarMenu title="Admin" isHide={role !== SuperAdminConst}>
              <SidebarItem
                isActive={pathname === "/accounts"}
                title="Perumahan"
                icon={<AccountsIcon />}
                href="accounts"
                isHide={role !== SuperAdminConst}
              /> 
              <SidebarItem
                isActive={pathname === "/category"}
                title="Kategori Transaksi"
                icon={<CategoryListIcon />}
                href="category"
                isHide={role !== SuperAdminConst}
              />
              <SidebarItem
                isActive={pathname === "/rt"}
                title="RT"
                icon={<ViewIcon />}
                href="rt"
                isHide={role !== SuperAdminConst}
              />
              <SidebarItem
                isActive={pathname === "/rw"}
                title="RW"
                icon={<ViewIcon />}
                href="rw"
                isHide={role !== SuperAdminConst}
              />
            </SidebarMenu>
            <SidebarMenu title="Data" isHide={!isAdminOrSuperAdmin(role)}>
              <SidebarItem
                isActive={pathname === "/data-warga"}
                title="Data Warga"
                icon={<Person2Icon />}
                href="data-warga"
                isHide={!isAdminOrSuperAdmin(role)}
              />
              <SidebarItem
                isActive={pathname === "/data-karyawan"}
                title="Data Karyawan"
                icon={<EmployeeCardIcon />}
                href="data-karyawan"
                isHide={!isAdminOrSuperAdmin(role)}
              />
            </SidebarMenu>
            <SidebarMenu title="Pemasukan" isHide={!isAdminOrSuperAdmin(role)}>
              <SidebarItem
                isActive={pathname === "/revenue"}
                title="Kas Masuk"
                icon={<PaymentsIcon />}
                href="revenue"
                isHide={!isAdminOrSuperAdmin(role)}
              />
            </SidebarMenu>
            <SidebarMenu title="Pengeluaran" isHide={!isAdminOrSuperAdmin(role)}>
              <SidebarItem
                isActive={pathname === "/paycheck"}
                title="Gaji"
                icon={<BalanceIcon />}
                href="/paycheck"
                isHide={!isAdminOrSuperAdmin(role)}
              />
              <SidebarItem
                isActive={pathname === "/loans"}
                title="Kas Bon"
                icon={<PaymentsIcon />}
                href="/loans"
                isHide={!isAdminOrSuperAdmin(role)}
              />
              <SidebarItem
                isActive={pathname === "/others"}
                title="Lain - Lain"
                icon={<VerticalDotsIcon />}
                href="/others"
                isHide={!isAdminOrSuperAdmin(role)}
              />
            </SidebarMenu>
          </div>
          {/* <div className={Sidebar.Footer()}>
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
          </div> */}
        </div>
      </div>
    </aside>
  );
};
