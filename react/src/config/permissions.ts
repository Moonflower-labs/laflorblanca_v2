import { toast } from "react-toastify";
import AuthProvider from "../utils/auth";

// Ask the server for permission status
const handleAccessRestriction = async (planName: string) => {
  const hasPermissions = await AuthProvider.checkPermissions(planName);
  console.log(hasPermissions);
  if (!hasPermissions?.user_permissions) {
    toast.error(`Debes suscribirte al plan ${planName} para acceder.`, {
      // position: "top-center",
    });
    return false;
  }
  return true;
};

export default handleAccessRestriction;
