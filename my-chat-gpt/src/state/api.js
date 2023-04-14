import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

//Configuracion de redux toolkit, creacion de porcion de API
//y endpoint que queremos llamar

export default api = createApi({ //Este objeto es el resultado de llamar a la función createApi() con un objeto de opciones.
  baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}), //Define la función de consulta base para el objeto api
  reducerPath: "main", //Define el nombre del segmento del estado de Redux donde se almacenarán los resultados de la consulta. 
  tagTypes: [], //Define una matriz vacía para los tipos de etiquetas que se utilizarán para etiquetar las solicitudes y respuestas de la API.
  endpoints: (build) => ({
    postAiText: build.mutation({
      query: (payload) => ({
        url: "openai/text",
        method: 'POST',
        body: payload,
      })
    })
  })
});

export const {usePostAiTextMutation} = api;