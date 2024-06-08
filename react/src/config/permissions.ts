import { toast } from "react-toastify";
import authProvider from "../utils/auth";

// Ask the server for permission status
const handleAccessRestriction = async (planName: string) => {
  const hasPermissions = await authProvider.checkPermissions(planName);
  if (!hasPermissions?.user_permissions) {
    const plan = planName === "spirit" ? "Espíritu" : planName === "soul" ? "Alma" : "Personalidad"
    toast.error(`Debes suscribirte al plan ${plan} para acceder.`, {
      // position: "top-center",
    });
    return false;
  }
  return true;
};

export default handleAccessRestriction;
