import { getImage } from "@/assets/images";

export function OxyLogo() {
  return <img src={getImage("logo").src} alt="Logotipo Oxy" height={32} />;
}
