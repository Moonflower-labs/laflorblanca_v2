import { toast } from "react-toastify";
import authProvider from "../utils/auth";

// Ask the server for permission status
const handleAccessRestriction = async (planName: string) => {
  const hasPermissions = await authProvider.checkPermissions(planName);
  if (!hasPermissions?.user_permissions) {
    toast.error(`Debes suscribirte al plan ${planName} para acceder.`, {
      // position: "top-center",
    });
    return false;
  }
  return true;
};

export default handleAccessRestriction;
