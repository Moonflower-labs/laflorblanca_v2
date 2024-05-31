/* eslint-disable react-refresh/only-export-components */
import { ActionFunctionArgs, Form, useActionData, useNavigate, useNavigation } from "react-router-dom";
import { api } from "../api/axios";
import { useEffect } from "react";

export const subscriptionAction = async ({request}:ActionFunctionArgs) => {
  const formData = await request.formData()
  const priceId = formData.get('priceId')

   try {
      const response = await api.post("subscriptions/", { priceId });
      const { subscriptionId, clientSecret } = response.data;
      if (subscriptionId && clientSecret) {
        console.log(subscriptionId, clientSecret)
        return {subscriptionId, clientSecret};
      }
   } catch (error) {
    console.error(error)
    
   }

    return null
}


const SubscriptionPlans = () => {
 
  const  { subscriptionId, clientSecret }  = useActionData() as {subscriptionId: string, clientSecret: string} || {};
  const navigate = useNavigate()
  const navigation = useNavigation()

  const staticPrefix = import.meta.env.PROD ? "/static" : "";
  const personalityPlanImg = `${staticPrefix}/plan-personality.jpeg`;
  const soulPlanImg = `${staticPrefix}/plan-soul.jpeg`;
  const spiritPlanImg = `${staticPrefix}/plan-spirit.jpeg`;

  // const createSubscription = async (priceId: string) => {
  //   const response = await api.post("subscriptions/", { priceId });

  //    const { subscriptionId, clientSecret } = response.data;
  //    return  navigate("/subscribe", { state: {subscriptionId,clientSecret }});

  //   // setSubscriptionData({ subscriptionId, clientSecret });
  // };
 

  
useEffect(() => {
  if (subscriptionId && clientSecret) {
       navigate("/subscribe", { state: {subscriptionId,clientSecret  }});
 }

},[clientSecret, navigate, subscriptionId])



  return (
    <div className="text-center" id="plans">
      <p className="text-4xl py-16 text-primary font-bold">
        Planes de Suscripción
      </p>
      <div className="grid md:grid-cols-2 gap-4 mx-auto pb-3 justify-items-center">
        <div className="card glass w-[95%] md:w-[70%] shadow-xl">
          <figure className="px-10 pt-10">
            <img src={personalityPlanImg} alt="" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">PERSONALIDAD</h2>
            <hr className="border border-purple-600/40 mt-3  w-[80%] mx-auto" />
            <ul className="text-start p-3">
              <li>👁 Precio Gratis</li>
              <li>👁 Puedes cancelar o cambiar de Plan en cualquier momento</li>
              <li>👁 Renovación automática</li>
              <li>
                👁 Respuesta a tus Preguntas por escrito o audio sin incluir
                ningún dato personal
              </li>
              <li>
                👁 Acceso desde cualquier lugar, dispositivo y en todo momento
              </li>
            </ul>
            <div className="card-actions">
              <Form method="post">
                <button
                    type="submit"
                    id="plan1"
                    className="btn btn-primary"
                    value={"price_1Ng3CfAEZk4zaxmwMXEF9bfR"}
                    name={"priceId"}
                    disabled={navigation.state === "submitting"}
                  >
                  Comprar por £0
                 </button>
              </Form>
            </div>
          </div>
        </div>

        <div className="card glass w-[95%] md:w-[70%] shadow-xl">
          <figure className="px-10 pt-10">
            <img src={soulPlanImg} alt="" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">ALMA</h2>
            <hr className="border border-purple-600/40 mt-3  w-[80%] mx-auto" />
            <ul className="text-base text-start p-3">
              <li>👁 Precio £9.95</li>
              <li>👁 Puedes cancelar o cambiar de Plan en cualquier momento</li>
              <li>👁 Renovación automática</li>
              <li>
                👁 Respuesta a tus Preguntas por audio o video sin incluir ningún
                dato personal
              </li>
              <li>👁 Contenido sorpresa</li>
              <li>👁 Una pregunta al mes de tarot</li>

              <li>
                👁 Acceso a contenido especial por escrito, en audio o video
                desde cualquier lugar, dispositivo y en cualquier momento
              </li>
            </ul>
            <div className="card-actions">
            <Form method="post">
            <button
                type="submit"
                id="plan2"
                className="btn btn-primary"
                value={"price_1Ng3GzAEZk4zaxmwyZRkXBiW"}
                name={"priceId"}
                disabled={navigation.state === "submitting"}
              >
                Comprar por £9,95/mes
              </button>
            </Form>
            </div>
          </div>
        </div>

        <div className="card glass w-[95%] md:w-[70%] shadow-xl">
          <figure className="px-10 pt-10">
            <img src={spiritPlanImg} alt="" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">ESPÍRITU</h2>
            <hr className="border border-purple-600/40 mt-3  w-[80%] mx-auto" />
            <ul className="text-base text-start p-3">
              <li>👁 Precio £14.95</li>
              <li>👁 Puedes cancelar o cambiar de Plan en cualquier momento</li>
              <li>👁 Renovación automática</li>
              <li>
                👁 Respuesta a tus Preguntas por audio, video o en directo sin
                incluir ningún dato personal
              </li>

              <li>👁 Contenido sorpresa</li>
              <li>👁 Sesiones en directo</li>
              <li>
                👁 Acceso a contenido especial por escrito, en audio, video o en
                directo desde cualquier lugar, dispositivo y en cualquier
                momento
              </li>
            </ul>
            <div className="card-actions">
              <Form method="post">
                <button
                    type="submit"
                    id="plan3"
                    className="btn btn-primary"
                    value={"price_1Ng3KKAEZk4zaxmwLuapT9kg"}
                    name={"priceId"}
                    disabled={navigation.state === "submitting"}
                  >
                  Comprar por £14,95/mes
                 </button>
              </Form>
            </div>
          </div>
        </div>

        {/* <div className="card glass w-[95%] md:w-[70%] shadow-xl">
          <figure className="px-10 pt-10">
            <img src={logoImgUrl} alt="" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">ADMINISTRA TU SUSCRIPCIÓN</h2>
            <hr className="border border-sky-400/70 mt-3  w-[80%] mx-auto" />
            <p className="py-3">
              Accede al
              <span className="font-bold"> Portal del Cliente</span> para
              realizar cualquiera de las siguientes operaciones:
            </p>
            <ul className="text-base text-start p-3 mb-5 mx-auto">
              <li>Cancela tu suscripción</li>
              <li>Cambia tu plan de suscripción</li>
              <li>Modifica o actualiza el método de pago</li>
              <li>Modifica o actualiza tu dirección de correo</li>
              <li>Ver historial de facturas</li>
            </ul>
            <div className="card-actions">
              <Form action="" method="post">
                <input type="hidden" name="email" value="" />
                <button type="submit" className="btn btn-primary">
                  Portal del Cliente
                </button>
              </Form>
            </div>
          </div>
        </div> */}

      </div>
    </div>
  );
};

export default SubscriptionPlans;
