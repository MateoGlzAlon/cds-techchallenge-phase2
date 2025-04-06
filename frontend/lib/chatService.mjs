import OpenAI from "openai"
import axios from 'axios';
import dotenv from 'dotenv';
import { getAllRoutes, getAllHotels, getAllTrayectories } from "@/api/services"

dotenv.config();
//const API_KEY_OPENROUTER=process.env.API_KEY_OPENROUTER;
const API_KEY_OPENROUTER="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";


class Agent {
	constructor(context="Eres un asistente de viajes en GreenLake") {
		this.apiKey = API_KEY_OPENROUTER;
		this.model = "meta-llama/llama-3.3-70b-instruct:free";
		this.messages = [{ role: 'system', content: context }];
		this.context = context;
	}

	async receiveMessage(message, history = true) {
    	if (history) {
    		this.messages.push({ role: 'user', content: message });
		}

   		const messages = history
      			? this.messages
      			: [{ role: 'system', content: this.context }, { role: 'user', content: message }];

    	try {
    		const response = await axios.post(
    			'https://openrouter.ai/api/v1/chat/completions',
        		{
          			model: this.model,
        			messages: messages
    			},
        				
			 	{
          			headers: {
    					'Authorization': `Bearer ${this.apiKey}`,
            			'Content-Type': 'application/json'
          			}
        		}
      		);

      		const responseMessage = response.data.choices[0].message.content;

      		if (history) {
    			this.messages.push({ role: 'assistant', content: responseMessage });
  			}
      		return responseMessage;

    	} catch (error) {
    		console.error('Error al obtener la respuesta:', error);
  			return 'Lo siento, no puedo responderle.';
    	}
  	}
}


function filterHotels(hotels, filterParams) {
    return hotels.filter(hotel => {
        const name = filterParams.nombre || null;
        const location = filterParams.ubicacion || null;
        const priceMin = filterParams.precio_min || null;
        const priceMax = filterParams.precio_max || null;
        const ratingMin = filterParams.valoracion_min || null;
        const ratingMax = filterParams.valoracion_max || null;
        const minReviews = filterParams.numero_resenas || null;

        return (!name || hotel.nombre.includes(name)) &&
               (!location || hotel.ubicacion.includes(location)) &&
               (!priceMin || hotel.precio_noche >= priceMin) &&
               (!priceMax || hotel.precio_noche <= priceMax) &&
               (!ratingMin || hotel.valoracion_media >= ratingMin) &&
               (!ratingMax || hotel.valoracion_media <= ratingMax) &&
               (!minReviews || hotel.numero_resenas >= minReviews);
    }).sort((a, b) => b.valoracion_media - a.valoracion_media).slice(0, 5);
}


function filterRoutes(routes, filterParams) {
    const filteredRoutes = routes.filter(route => {
        const routeName = filterParams.routeName || null;
        const routeType = filterParams.routeType || null;
        const distanceKmMin = filterParams.distanceKm_min || null;
        const distanceKmMax = filterParams.distanceKm_max || null;
        const durationHoursMin = filterParams.durationHours_min || null;
        const durationHoursMax = filterParams.durationHours_max || null;
        const originName = filterParams.origin_name || null;

        return (!routeName || route.routeName.includes(routeName)) &&
               (!routeType || route.routeType === routeType) &&
               (!distanceKmMin || route.distanceKm >= distanceKmMin) &&
               (!distanceKmMax || route.distanceKm <= distanceKmMax) &&
               (!durationHoursMin || route.durationHours >= durationHoursMin) &&
               (!durationHoursMax || route.durationHours <= durationHoursMax) &&
               (!originName || route.origin.name.includes(originName));
    });

    return filteredRoutes.sort((a, b) => b.popularity - a.popularity).slice(0, 5);
}



class Chat{
	constructor(){
		this.agent_get_topic = new Agent("Tu tarea es analizar el mensaje del usuario y clasificarlo en una de las siguientes categorías: 'hotel', 'ruta', 'transporte' o 'conversación'. Devuelve solo la categoría más relevante sin agregar explicaciones. Puedes devolver ninguna o más de una seguida de comas.");
		this.agent_extract_json = new Agent(`El usuario ha solicitado información sobre una categoria. Extrae los valores relevantes y devuélvelos en formato JSON con las siguientes claves según la categoría:
Hotel: nombre, ubicacion, precio_min, precio_max, valoracion_min, valoracion_max, numero_resenas.
Ruta: routeName, routeType(Aventura, Cultural, Gastronómica, Histórica, Ecológica), distanceKm_min, distanceKm_max, durationHours_min, durationHours_max, durationHours_min (numero del 0 al 50), durationHours_max (numero del 0 al 50), origin_name.
Transporte: tipo(Autobús, Tranvía, Coche Compartido, Taxi, Bicicleta, Metro), tiempo_min, tiempo_max, salida, llegada.
Si el usuario no proporciona un dato, deja su valor como null. Si para unos valores con max y min el usuario da un valor que no es maximo ni minimo, pon un rango entre esos valores, pero no pongas lo mismo en maximo y en minimo. No agregues explicaciones, solo devuelve el JSON."`);
		this.agent_generate_chat = new Agent("Eres un asistente de viajes, genera una respuesta amigable y útil basada en los datos de la base de datos. Si no hay información, ofrece una alternativa o pide más detalles.");
	
			
		this.hotels = [];
		this.routes = [];
		this.transport = [];

	}

	
	async init() {
		try {
			//this.hotels = await getAllHotels();
			this.routes = await getAllRoutes();
			//this.transport = await getAllTrayectories();

			console.log("Datos precargados para el chatbot");
		} catch (err) {
			console.error("Error cargando datos iniciales para el chatbot", err);
		}
	}

	async getJsonInfo(topic, message){
		let json_info = await this.agent_extract_json.receiveMessage("topic: '"+topic+"' user message: '"+message+"'");
		console.log("JSON info: " + json_info);
		json_info = json_info.match(/```json([\s\S]*?)```/);
		console.log("JSON info: " + json_info);
		json_info = json_info[1];
		console.log("JSON info: ");
		console.log(json_info);
		json_info = JSON.parse(json_info);
		console.log("JSON info: ");
		console.log(json_info);
		return json_info;
	}

	async receiveMessage(message){
		await this.init();

		let topic = await this.agent_get_topic.receiveMessage(message);
		let response = "Lo siento, ha ocurrido un error.";
		console.log("Topic: " + topic);
		if (!(topic.includes('hotel') || topic.includes('ruta') || topic.includes('transporte'))){
			response = await this.agent_generate_chat.receiveMessage(message,true);
		}else{
			let db_information = "";
			if(topic.includes('hotel')){
				let json_info = await this.getJsonInfo('hotel', message);
				console.log("JSON info: ");
				console.log(json_info);
				//db_information += filterHotels(this.hotels, json_info).map(hotel => `${hotel.nombre} ${hotel.descripcion} ${hotel.ubicacion} ${hotel.precio_noche}€ ${hotel.valoracion_media} ${hotel.numero_resenas}`).join(", ");	
			}
			if(topic.includes('ruta')){
				console.log(this.routes)
				let json_info = await this.getJsonInfo('ruta', message);
				console.log("JSON info: ");
				console.log(json_info);
				db_information += filterRoutes(this.routes, json_info).map(route => `${route.routeName} ${route.routeType} ${route.distanceKm}km ${route.durationHours}h ${route.popularity}`).join(", ");
			}
			if(topic.includes('transporte')){
				let json_info = await this.getJsonInfo('transporte', message);
				console.log("JSON info: ");
				console.log(json_info);
				db_information += "";
  
			}
			console.log("DB information: " + db_information);	
			response = await this.agent_generate_chat.receiveMessage("Responde a este mensaje: '"+message+"' sabiendo:'"+db_information+"'");
			response = response.replace(/\*/g, '').trim();
			console.log("Response: " + response);
		}
		return response
	}
}

export default Chat;