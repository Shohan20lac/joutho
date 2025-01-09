import { StallConstants } from "@/const/stall.const";
import { createHash } from "crypto";


export type ItemType = "key" | "shield" | "compass";
export type PowerType = "wealth" | "gear" | "heart" | "health"; // Include all possible powers

export const getItemPowerDescription = (selectedItem: ItemType, selectedPower: PowerType): string => {
  // Check if the selectedItem exists in the StallConstants itemPowerDescription object
  const itemDescription = StallConstants.itemPowerDescription[selectedItem];
  
  if (itemDescription) {
    if (selectedPower in itemDescription)
      return itemDescription[selectedPower as keyof typeof itemDescription]
    else
      return "No description available for this power and item combination."
  } 
  else
    return "No description available for this item."
}

export const getItemPowerPath = (item: string, power: string) =>
  item ==="compass" ?
    power === "wealth" ? "/images/power/compass wealth.jpg" :
    power === "gear"   ? "/images/power/compass gear.jpg" : 
    "/images/power/compass heart.jpg" 
  :

  item === "key" ?
    power === "wealth" ? "/images/power/key wealth.jpg" :
    power === "gear"   ? "/images/power/key gear.jpg" : 
    "/images/power/key health.jpg"
  
  :
  item === "shield" ?
    power === "wealth" ? "/images/power/shield wealth.jpg" :
    power === "gear"   ? "/images/power/shield resistance.jpg" : 
    "/images/power/shield health.jpg"
  
  :
    ''

export function generateStallId(deviceName: string, adminId: string): string {
  const data = `${deviceName}-${adminId}`;
  return createHash("sha256").update(data).digest("hex");
}

export function generateBrowserDeviceId() {
  const userAgent = navigator.userAgent;  // Browser user agent string
  const platform = navigator.platform;   // OS platform
  const language = navigator.language;   // Browser language
  return `${userAgent}-${platform}-${language}`;
}

export function hashBrowserData (adminId: any) {
  const deviceInfo = generateBrowserDeviceId();
  const data = `${deviceInfo}-${adminId}`;
  return crypto.subtle.digest("SHA-256", new TextEncoder().encode(data))
    .then (hashBuffer => {
      return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    });
}
